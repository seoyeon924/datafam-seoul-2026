# 대시보드와 대화 · Claude Code + Tableau MCP

Tableau를 열지 않고 채팅으로 대시보드 데이터를 확인하는 설정 묶음입니다.
DataFam Seoul 2026 세션 활용 사례 01번을 그대로 옮겼습니다.

## 5분 설치

### 1. Claude Code 설치

```bash
npm install -g @anthropic-ai/claude-code
```

### 2. 이 폴더를 프로젝트로 열기

```bash
cd dashboard-chat
claude
```

`.claude/skills/dashboard-chat/SKILL.md` 가 자동으로 인식됩니다.

### 3. MCP 서버 연결 · 둘 중 하나

**A. Tableau Public · 인증 없이 바로**

공개 워크북만 대상입니다. 계정 설정이 필요 없어 가장 빠릅니다.

```bash
claude mcp add tableau-public -s user -- npx -y @wjsutton/tableau-public-mcp-server@latest
claude mcp list          # ✔ Connected 확인
```

**B. Tableau Cloud · Server · 사내 자산 대상**

`.env.example` 을 `.env` 로 복사해 값을 채운 뒤 실행합니다.
개인 액세스 토큰은 Tableau 사이트의 내 계정 설정에서 발급합니다.

```bash
cp .env.example .env
claude mcp add tableau -s user -e TABLEAU_SERVER=$TABLEAU_SERVER \
  -e TABLEAU_SITE_NAME=$TABLEAU_SITE_NAME \
  -e TABLEAU_PAT_NAME=$TABLEAU_PAT_NAME \
  -e TABLEAU_PAT_VALUE=$TABLEAU_PAT_VALUE \
  -- npx -y @tableau/mcp-server@latest
```

### 4. 물어보기

```
공개된 내 워크북 목록 보여줘
Sales Funnel Dashboard 어느 단계에서 전환이 가장 많이 깨져?
Won Rate 계산식 원문 그대로 보여줘
```

`questions.md` 에 바로 붙여 쓸 질문 30개가 있습니다.

## 폴더 구성

```
.claude/skills/dashboard-chat/SKILL.md   대화 규칙 · 답변 형식
questions.md                             질문 예시 30개
.env.example                             사내 Tableau 연결용 값 서식
README.md                                이 파일
```

## 확인 사항

- Claude Code가 접근하는 범위는 연결한 계정의 권한 안입니다. 권한 밖 자산은 조회되지 않습니다
- 조회 중심으로 씁니다. 워크북 수정과 배포는 Tableau에서 사람이 합니다
- 계산식은 워크북 원문을 그대로 인용하게 되어 있습니다. 추측 답변은 규칙으로 막아 두었습니다
- API 키나 토큰은 이 묶음에 들어 있지 않습니다. 각자 발급해 `.env` 에 넣습니다

## 출처

DataFam Seoul 2026 · Claude Code와 Tableau MCP로 만드는 AI 분석 워크플로우 · 전서연
https://seoyeon924.github.io/datafam-seoul-2026
