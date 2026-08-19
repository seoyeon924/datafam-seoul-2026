# 라이브 시연 · Tableau Public MCP

사례 02(제작 구조 질의)를 실제로 구동하는 절차. 계정 로그인 불필요.

## 설치

이미 등록되어 있음. 새 기기에서는 아래 한 줄.

```bash
claude mcp add tableau-public -s user -- npx -y @wjsutton/tableau-public-mcp-server@latest
claude mcp list          # tableau-public: ✔ Connected 확인
```

MCP 제작: Will Sutton · The Information Lab · 도구 22개 · 공개 API만 사용

## 시연 순서

### 1 · 프로필 조회로 연결 확인 (20초)

> tableau-public MCP로 내 프로필 `.83057946` 정보와 워크북 목록 보여줘

확인된 실제 응답:
- Seoyeon Jun · Tableau Visionary · 5X Public Ambassador · 4X VOTD
- 팔로워 2,086 · 공개 워크북 35개
- Sales Funnel Dashboard | VOTD 조회 104,444 · 즐겨찾기 1,405

### 2 · 대시보드 구조 분석 (본 시연 · 1분)

> 이 대시보드 어떻게 만든 건지 분석해줘
> https://public.tableau.com/app/profile/.83057946/viz/SalesFunnelDashboard_16570254084520/SalesPipelineDashboard

기대 결과 (사전 파싱으로 확인된 실제 구조)
- 시트 16개 · 대시보드 1개 · 파라미터 2개 (Top N Accounts · padding)
- 시트 명명 규칙: `T_` 툴팁 전용 7개 · `B_` 하단 KPI 카드 4개
- 계산 필드 27개 중 구조를 만드는 4개
  - `Sort` = CASE [Stage] WHEN "Prospecting" THEN 1 … 퍼널 정렬
  - `Won Rate` = [# of Won Opp.] / [# of Closed Opp.]
  - `Age of Oppty` = {FIXED [Opportunity ID]: MAX(DATEDIFF(...))}
  - `Avg.Deal Size` = SUM({FIXED …}) / COUNTD([Opportunity ID])

### 3 · 응용 질문 (여유 있으면)

> Game Log Dashboard의 코호트 리텐션은 어떤 구조로 만들었어?

> 이 계산식을 내 데이터에 적용하려면 어떤 필드가 필요해?

## 주의

- 다운로드 불가로 설정된 워크북은 메타데이터만 조회됨 · 계산식은 안 나옴
- 네트워크 필요 · 오프라인이면 슬라이드 캡처로 대체
- 첫 실행 시 npx 패키지 내려받느라 몇 초 지연 · 발표 전 1회 예열 권장

## 예열 명령

발표 직전 터미널에서 한 번 실행해 두면 지연 없음.

```bash
claude -p "tableau-public MCP로 프로필 .83057946 정보 조회" --allowedTools "mcp__tableau-public__*"
```
