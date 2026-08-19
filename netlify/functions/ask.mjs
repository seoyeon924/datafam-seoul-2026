// 질문 → Tableau Public 실시간 조회 + 워크북 구조 → LLM 답변
const BASE = 'https://public.tableau.com';
const USER = '.83057946';

// Sales Funnel Dashboard | VOTD · 워크북 XML 사전 파싱 결과
const WORKBOOK = `
[Sales Funnel Dashboard | VOTD] 구조
- 시트 16개: B_# of Open Oppty, B_Avg. Age of Oppty, B_Avg.Deal Size, B_Total Expected Amount,
  Conversion Rate, Number of Open Oppty, T_# of Open Oppty, T_Avg.Age of Oppty, T_Avg.Deal Size,
  T_Conversion Rate, T_Total Expected Amount, T_Won Rate, Top 10 Opp., Won Rate, conversion, focus
- 대시보드 1개: Sales Pipeline Dashboard
- 명명 규칙: T_ 접두 = 툴팁 전용 7개, B_ 접두 = 하단 KPI 카드 4개
- 파라미터 2개: Top N Accounts(기본 10), padding
- 계산 필드 27개 중 주요 항목:
  Sort = CASE [Stage] WHEN "Prospecting" THEN 1 WHEN "Qualification" THEN 2 WHEN "Value Proposition" THEN 3 ...
  Won Rate = [# of Won Opp.] / [# of Closed Opp.]
  # of Won Opp. = COUNTD(IF [Stage] = "Closed Won" THEN [Opportunity ID] END)
  # of Closed Opp. = COUNTD(IF CONTAINS([Stage],"Closed") THEN [Opportunity ID] END)
  Age of Oppty = {FIXED [Opportunity ID]: MAX(DATEDIFF("day", [CreatedDate (Opportunities)], #2018-10-01#))}
  Avg.Deal Size = SUM({FIXED [Opportunity ID]: MAX([Expected Amount])}) / COUNTD([Opportunity ID])
  Total Expected Amount = FLOAT({FIXED [Opportunity ID]: MAX([Expected Amount])})
  Sales Cycle = DATEDIFF('day',[Close Date],[CreatedDate (Opportunities)])
  Closed Volume $ = SUM(IF CONTAINS([Stage],"Closed") THEN [Amount] END)
  Won Volume $ = SUM(IF [Stage] = "Closed Won" THEN [Amount] END)
  MoM Color = IF [계산1] > 0 THEN "blue" ELSEIF [계산1] = 0 THEN "gray" ELSE "red" END
- 단계별 전환(Conversion Rate 시트 기준): Prospecting 842 → 61%, Qualification 512 → 54%,
  Value Proposition 277 → 39%(가장 큰 이탈), Proposal 108 → 47%, Negotiation 51 → Closed Won 24

[Game Log Dashboard] 구조
- 주간 코호트 리텐션 매트릭스 + KPI 카드(Avg DAU, New Install, ARPDAU, Paid Players, Total Revenue)
- 코호트: 첫 이벤트 주 기준 W0~W9 잔존율 히트맵
- Tableau 구현 시 {FIXED [User]: MIN([Event Date])} 계열 LOD와 주차 차이 계산 필요
`;

async function tp(path) {
  const r = await fetch(BASE + path, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`tableau ${r.status}`);
  return r.json();
}

export default async (req) => {
  const cors = {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type',
  };
  if (req.method === 'OPTIONS') return new Response('', { headers: cors });
  if (req.method !== 'POST') return new Response('{"error":"POST only"}', { status: 405, headers: cors });

  try {
    const { question } = await req.json();
    if (!question || !question.trim())
      return new Response('{"error":"empty"}', { status: 400, headers: cors });

    // 1) Tableau Public 실시간 조회
    const [profile, wbs] = await Promise.all([
      tp(`/profile/api/${USER}`),
      tp(`/public/apis/workbooks?profileName=${USER}&count=12&start=0&visibility=NON_HIDDEN`),
    ]);
    const list = (wbs.contents || [])
      .map((w) => `- ${w.title} · 조회 ${w.viewCount} · 즐겨찾기 ${w.numberOfFavorites}`)
      .join('\n');

    const context =
      `[프로필 · 실시간 조회]\n이름 ${profile.name} / ${profile.title} / ${profile.organization}\n` +
      `소개: ${profile.bio}\n공개 워크북 ${profile.visibleWorkbookCount} · 팔로워 ${profile.totalNumberOfFollowers} · 팔로잉 ${profile.totalNumberOfFollowing}\n\n` +
      `[공개 워크북 목록 · 실시간 조회]\n${list}\n\n[워크북 구조 · 사전 파싱]\n${WORKBOOK}`;

    // 2) LLM 답변
    const sys =
      '너는 Tableau Public MCP에 연결된 분석 도우미다. 아래 컨텍스트만 근거로 한국어로 답한다.\n' +
      '- 3~6문장 이내로 간결하게. 필요하면 마크다운 표 사용.\n' +
      '- 계산식은 원문 그대로 인용. 컨텍스트에 없으면 "조회 범위 밖"이라고 명시하고 추측하지 않는다.\n' +
      '- 판정하지 않고 확인이 필요한 항목까지만 제시한다.\n' +
      '- 문장은 건조하게. 이모지 금지.';

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 700,
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: `${context}\n\n[질문]\n${question}` },
        ],
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return new Response(JSON.stringify({ error: `llm ${r.status}`, detail: t.slice(0, 200) }), { headers: cors });
    }
    const d = await r.json();
    return new Response(
      JSON.stringify({ answer: d.choices?.[0]?.message?.content || '', model: d.model }),
      { headers: cors }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e.message || e) }), { headers: cors });
  }
};

export const config = { path: '/api/ask' };
