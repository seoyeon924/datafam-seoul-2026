# DataFam Seoul 2026 · 발표자료 초안

Claude Code와 Tableau MCP로 만드는 분석 워크플로우

## 파일

| 경로 | 내용 |
|---|---|
| `index.html` | 슬라이드 덱 53장 · 편집용 (assets 폴더 필요) |
| `DataFam-Seoul-2026-발표자료.html` | 이미지 임베드 단일 파일 · 어디서나 열림 |
| `DataFam-Seoul-2026-발표자료.pdf` | 53쪽 · 960×540pt |
| `assets/` | 원본 템플릿 PDF에서 추출한 로고·3D 아이콘 |

## 실행

```bash
open index.html
```

좌우 방향키 · 스페이스로 이동. 하단 카운터로 현재 장 확인.
PDF 재생성:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="DataFam-Seoul-2026-발표자료.pdf" \
  "file://$PWD/index.html"
```

단일 파일 HTML 재생성은 이미지 10개를 base64로 인라인하면 된다. iCloud Drive `DataFam Seoul 2026/` 에도 같은 파일들을 복사해 뒀다.

## 템플릿 재현 기준

원본: `Copy 후 사용 [회사명] DataFam Seoul 2026_Speaker Template` (Google Slides)
PDF로 내려받아 색상을 픽셀 단위로 샘플링하고, 로고와 3D 아이콘은 PDF 내부 이미지에서 알파 채널까지 복원해 추출했다.

| 토큰 | 값 | 쓰임 |
|---|---|---|
| `--sky` | `#90D0FE` | 커버 · 타이틀 · 인용 · 감사 |
| `--pale` | `#CFE9FE` | 본문 슬라이드 |
| `--brand` | `#066AFE` | 섹션 구분 · 빅 스테이트먼트 |
| `--card` | `#EAF5FE` | 카드 채움 |
| `--navy` | `#001E5B` | 제목 · 본문 |
| `--accent` | `#022AC0` | 소제목 강조 |
| `--cyan` | `#00B3FF` | 인용 2행 |

원본 폰트는 Avant Garde Demi(제목) · Salesforce Sans(본문). 라이선스 문제로 로컬 대체 스택(Futura / Century Gothic / Pretendard)을 썼다.
원본 템플릿에 있으나 이 초안에서 뺀 레이아웃: 이미지 카드 2단, 노트북·모바일 목업, Forward Looking Statements(Salesforce 법적 고지라 외부 발표에는 불필요).

## 구성

하나의 문장에 들어가는 내용만 남겼다.

> Tableau 전의 반복 업무는 Claude Code로 줄이고, Tableau 안에 있는 자산은 MCP로 연결하고,
> 최종 판단과 배포는 사람과 Tableau가 맡는다.

### 본편 27장

| # | 구분 | 제목 |
|---|---|---|
| 1 | 오프닝 | 타이틀 |
| 2 | 오프닝 | 오늘 던질 질문 |
| 3 | 오프닝 | AI는 Tableau를 대체하지 않는다 |
| 4 | 오프닝 | Contents |
| 5 | 섹션 | 01 AI가 들어갈 자리 |
| 6 | 표 | 1.1 AI · 사람 · Tableau 역할 분담 |
| 7 | 지도 | 1.2 전체 워크플로우 |
| 8 | 섹션 | 02 반복 분석 업무 자동화 |
| 9 | 흐름 | 2.1 기존 방식 · 프롬프트 이어 붙이기 |
| 10 | 2 카드 | 2.2 프롬프트 방식의 한계 |
| 11 | 3단 | 2.3 Agent · Rule · Skill |
| 12 | 표 | 2.4 에이전트 구성 |
| 13 | 흐름 + 데모 자리 | 2.5 실행 흐름 |
| 14 | 섹션 | 03 Tableau 자산과의 연결 |
| 15 | 대비 | 3.1 Claude Code 단독 사용의 단절 |
| 16 | 빅 스테이트먼트 | 3.2 Tableau MCP의 역할 |
| 17 | 2단 | 3.3 MCP로 처리하는 업무 |
| 18 | 레인 | 3.4 대시보드 QA 워크플로우 |
| 19 | 2 카드 + 코드 | 3.5 연결 방식 |
| 20 | 섹션 | 보너스 데모 · Tableau의 표현 범위 확장 |
| 21 | 이미지 | 4.1 기본 차트로 어려운 시각화 |
| 22 | 이미지 | 4.2 Tableau 안에서 실행되는 결과 |
| 23 | 섹션 | 04 실무 도입 순서 |
| 24 | 단계 | 4.1 실무 도입 순서 |
| 25 | 1단 | WRAP UP |
| 26 | 빅 스테이트먼트 | Q & A |
| 27 | 감사 | Thank you |

부록은 두지 않는다. 에이전트 구성은 2.4로, MCP 설정 코드는 3.5 카드 안으로 넣었다.

## 제목 규칙

한국 컨퍼런스 발표자료(NAVER DEVIEW 2023 세션 덱) 관행을 따랐다.

- 본문 슬라이드 제목은 **챕터 번호 + 명사구**. 예: `3.4 대시보드 QA 워크플로우`
- 서술어로 끝나는 문장형 제목을 쓰지 않는다
- 부제는 제목을 한 줄로 푼 명사구
- 섹션 구분 슬라이드는 `번호 + 명사구`
- 마무리는 WRAP UP → Q & A → Thank You

## 발표 시간에 따른 조정

- **20분 안팎** 20–22장(보너스 데모)을 통째로 뺀다. 24장으로 줄어든다
- **30분 이상** 현재 구성 그대로
- 부록은 어느 경우에도 넘기지 않는다

## 채워야 할 자리

- ~~1장 발표자 정보~~ 전서연 · 데이터브릿지랩 CEO | Tableau Visionary & Ambassador 반영 완료
- **13장** Demo 결과 화면. 파이프라인 실행 결과가 나오면 교체
- **18장** 실제 사용 중인 Tableau 사이트 기준으로 QA 시나리오 조정
- **27장** 자료 · 예제 코드 링크, 연락처

## 이전 버전

`index.v1.html` 은 재구성 전 27장 버전이다. 5개 대주제(반복 구간 → 파이프라인 → MCP → 확장 제작 → 공개와 도입) 구성으로,
확장 프로그램 개발 과정이 본편의 3분의 1을 차지했다. 세션 주제와 어긋나 부록으로 내렸다.

## 내용 출처

- 프롬프트 체이닝(9장): 업로드한 `Prompt to Dashboard 실습 프롬프트`
  - 슬라이드에는 고객사명을 빼고 "기업 대상 실습"으로만 표기했다. 대외 발표라 사명 노출은 확인 후 결정할 것
- 파이프라인 구성 · 에이전트(11·12장): 업로드한 `ai-pipeline-kit.zip`
- Tableau MCP(16·17·19장): [github.com/tableau/tableau-mcp](https://github.com/tableau/tableau-mcp)
- 자체 확장(21·22장): `~/Projects/Script/P04-CH01/avengers-complete/`
  - 화면 이미지: `assets/shot_network.jpg`, `assets/shot_tableau.png`
- 제목 규칙 근거: [NAVER DEVIEW 2023 세션 발표자료](https://deview.kr/2023)

## 확인 필요

- 16장의 "권한 밖의 자산은 보이지 않는다"는 MCP가 사용자 권한을 승계한다는 문서 기술에 근거한다. 실제 사이트에서 검증 후 발표할 것
- 18장의 QA 워크플로우는 MCP 단독 기능이 아니라 MCP + Claude Code 조합이다. 슬라이드에 역할을 나눠 표기했다

## 2026-08-18 추가분

- **2.6 단계별 산출물 × 7장**: fastcampus-webinar 파이프라인의 실제 산출물(01~07) 인용 + 슬라이드별 Tableau 연결 포인트
- **3.3 · 3.4 TC26 키노트**: Agentic Analytics Platform 구조 · Tableau MCP GA 발표 화면 캡처 (Salesforce+ 키노트, Will Sutton · The Information Lab)
- **3.7 활용 사례**: Claude Code + Tableau MCP 주간 점검 리포트 · 직접 제작한 데모(`scratchpad/demo_qa.html`)를 캡처
- **3.8 활용 아이디어 6종**: 점검 리포트 · 카탈로그 · 미사용 콘텐츠 · KPI 감사 · Slack 브리핑 · 음성 질의
- 3.2 헤드라인 단순화 · 요청 예시 박스의 한쪽 색 테두리 제거(전역 규칙) · Tableau 공식 로고 추가(worldvectorlogo)
- 번호 재정렬: 기존 3.3→3.5, 3.4→3.6, 3.5→3.9

## 2026-08-18 2차 추가분

- **1.3 Tableau가 계속 맡는 것**: 새로고침 · RLS · 지표 정본 · 커넥터 · 감사 5개 축 대조표. 근거: Southard Jones(Tableau CPO) "AI Can Draw the Chart. Tableau Defines the Truth." (2026-03)
- **3.7 활용 사례 3부작**: 주간 점검 리포트 · 대시보드와 대화 · Tableau Public MCP 제작 구조 질의. 02·03은 발표자 본인 Tableau Public 워크북(Sales Funnel Dashboard | VOTD)을 실제 다운로드 · XML 파싱한 결과 (시트 16 · 계산 필드 27 · Sort/Won Rate/Age of Oppty 계산식 원문)
- **선언 슬라이드**: MCP의 시작점 문구 (다크)
- **3.8 활용 도구 8종**: 브리핑 · QA · KPI 감사 · 카탈로그 · 정리 후보 · 임원 보고 · 운영 알림 · 리뉴얼 진단. 전부 실행 화면 HTML로 제작 → `/usecases/*.html` 보관, 캡처는 `assets/uc1~8.png`
- **3.9 업계 동향**: The Information Lab(Public MCP 교육 활용) · Lovelytics(평가 주도 방법론) · Tableau 본사(시맨틱 3,300만 · OSI)
- **4.3 Retention Matrix 확장 직접 제작**: `/extension/retention-matrix/` (index.html + .trex + README). Game Log Analytics Dashboard 디자인 기준, User·Event Date 선반 2개로 코호트 리텐션. GitHub Pages 배포라 .trex 바로 사용 가능. Tableau 미연결 시 샘플 모드
- 3.3 키노트 슬라이드 문구를 쉬운 말로 교체

## 2026-08-19 추가분

- 활용 도구 8종을 각각 개별 슬라이드로 분리 (3.8 시리즈 · 도구명이 슬라이드 제목)
- 슬라이드마다 GitHub Pages 라이브 링크 표기 · `/usecases/*.html` 전부 배포 확인

## 2026-08-19 편집 패스 (덜어내기)

- 2.6 산출물 7장 → EDA · KPI · 대시보드 3장 + 파일 스택 1장
- 3.8 도구 9장 → 대표 3장(브리핑 · KPI 감사 · 리뉴얼 진단) + 이외 5종 모음 1장. 8종 라이브 링크는 유지
- 3.3 메시지 한 줄 + 캡처 · 3.4 기존/MCP 흐름 비교 + TC26 재고 데모 하나로 축소 (Will Sutton · Embedded Analytics · ElevenLabs 고유명사 제거)
- 사실 정정: Tableau Next MCP Authoring은 GA 아님 · Coming soon in Beta (2026-08-19 공식 페이지 기준). Hosted MCP는 Cloud 정식 제공 · Server는 셀프 호스팅
- "조회 전용" 단정 표현 제거 → "첫 도입은 읽기 전용 권장" · "데모는 조회 · 분석 범위로 제한" (MCP 툴 카탈로그에는 Jobs · Users 등 관리 도구 포함)
- 1.3 → "AI에게 맡기면 안 되는 것" · AI/Tableau/사람 역할 분담 원칙 3열
- 2.3 부제 → 누가 · 어떤 기준으로 · 어떤 순서로
- 보너스 데모 번호 → BONUS 1 · 2 · 3 (04장 실무 도입 순서와 번호 충돌 해소)

## 2026-08-19 라벨 리디자인 패스

- 전 슬라이드 라벨 + 수치 + 실물 원칙 적용: 부제 삭제 · 설명 문장 제거 · 영문 기술 라벨
- 2.1 Prompt-based Analysis · 2.2 Limitations 4카드 · 2.3 라벨 3종 + Define Once → Reuse
- 3.1 Context Boundary · 3.2 Tableau MCP(Connection Layer) · 3.3 플랫폼 라벨 3종 · 3.4 MCP in Action(캡션만 Will Sutton) · 3.5 Access Scope · 3.6 01 RETRIEVE→04 PUBLISH
- 선언 슬라이드 삭제 · 3.8 Use Cases overview(8종 통일 명명) + 상세 3장(수치 3개 포맷 · 상단 크롭 확대 캡처)
- 업계 동향 → APPENDIX · Ecosystem (Thank you 뒤)
- 3.10 Connection Options · BONUS 라벨화 · 4.1 Adoption Framework · Wrap-up 4역할 카드

## 2026-08-19 내러티브 · 언어 패스

- 한국어 80 / 영어 고유명사 20 · 110건 치환 (Tableau · MCP · Claude Code · KPI · QA만 영어)
- 축 3개 재정의: 분석 설계(02) → Tableau MCP(03 표지 승격) → Extensions(거버넌스 유지) → 실무 도입(04)
- 3.7 사례 1~3 · 데모 3종 실배포(usecases/demo_*.html) · 전 활용사례 링크 앵커화(PDF 클릭 가능)
- 2.4 에이전트 표에 Tableau 연결 열 추가 · 3.6 단일 도식 · 3.9 업계 사례 본편 복귀(페이지 캡처 포함)
- EXTENSION 1 · 2 라벨 체계 · 어벤져스 라이브 링크 · Thank you QR · 연락처 · 후기 안내
- 4.1 단계별 체크 항목 보강 (tableau-mcp 공식 배포 가이드 근거)

## 2026-08-19 심화 패스

- 2.1 실습 프롬프트 원문 발췌(STEP 4 · 6 · 7) · 2.5~2.8 ai-pipeline-kit 강의 슬라이드 4장 신설(CLAUDE.md · Rule 7조항 · run-pipeline 체크포인트 · 시각화 기준) · 이후 번호 2.9~2.11
- 1.2 워크플로우 재구성: 기획 → Tableau에 붙이기 → 판단 · 배포 + 하단 거버넌스 바 · 타이틀 부제 「분석 설계부터 Tableau 연결까지」
- 3.1 Tableau MCP 상단 브릿지 도식 · 3.5 도식 단일화 · 3.7 사례 1~3 좌 사진 · 우 목적/구성/사용 + LIVE
- 3.8 overview 카드별 구분 SVG 아이콘 · 3.9 업계 사례 3장 분리(실제 페이지 캡처)
- 대시보드 예시를 KT 구독 대시보드(로고 블러)로 전면 교체
- Retention Matrix 시연 준비: sample_game_log.csv(5,062행 · 결정적 생성) · 시연 4단계 · Exchange 기준 동일 형식 뷰 확장 부재 확인
- 디자인 튠: 헤어라인 타이틀 · 흰 카드 통일 · 타이포 절제

## 2026-08-19 활용 사례 통합

- 사례 · 도구 이원 체계를 단일 시리즈 3.7 활용 사례 01~11로 통합 · overview 1장 + 상세 11장 순차 배치
- 상세 구성 불릿을 수치 나열 대신 기능 요약으로 교체
- 업계 사례 제목을 내용형으로: 공개 대시보드를 팀 교재로 · 에이전트를 실서비스로 보내는 기준(거버넌스 10배 · 평가 6배) · 기준은 시맨틱 레이어에
- Lovelytics 캡처 확대 재크롭 · Thank you의 사이트 링크 제거 · 이후 번호 3.8~3.10 재정렬
