# Retention Matrix · Tableau Viz Extension

주간 코호트 리텐션 매트릭스와 KPI 카드(Avg DAU · D+1 · D+7 · D+30)를 워크시트 안에 그리는 뷰 확장.
LOD 계산 필드 없이 User 차원과 Event Date 날짜만으로 동작한다.

디자인 기준: [Game Log Analytics Dashboard](https://public.tableau.com/app/profile/.83057946/viz/12-3_GameLogDashboard_17534330076730/GameDashboard) (전서연 · Tableau Public)

## 사용

1. [`retention-matrix.trex`](./retention-matrix.trex) 다운로드
2. Tableau Desktop 2024.2+ · 워크시트 Marks 카드 → Add Extension → .trex 선택
3. 선반 연결
   - **User** · 사용자 식별 차원
   - **Event Date** · 이벤트 날짜 (첫 이벤트 주 = 코호트)

## 동작

| 항목 | 내용 |
|---|---|
| 필드 인식 | `getVisualSpecificationAsync()`로 선반-필드 매핑을 읽음 · 필드명이 달라도 동작 |
| 코호트 단위 | 데이터 기간에 맞춰 자동 선택 · 31일 이하 일별 · 2년 이하 주간 · 그 이상 월별 |
| 매트릭스 | 코호트별 잔존율 히트맵 · 코호트 크기(n) 표시 · 미래 구간 공백 |
| KPI | 활성 사용자 · 잔존율 · 복귀율 · 데이터에 맞춰 라벨 자동 변경 |
| 비교 기준 | 헤더에서 직전 구간 · 전주 · 전월 선택 |
| 자동 갱신 | 필터 변경 · 데이터 변경 시 재계산 |
| 선반 미구성 시 | 무엇을 올려야 하는지 안내 화면 표시 |

## 시연 순서 (Tableau Desktop)

1. `sample_game_log.csv` 연결 (또는 자체 이벤트 로그)
2. 새 워크시트 · Marks 카드 → Add Extension → `retention-matrix.trex`
3. **User** 선반에 `user_id` · **Event Date** 선반에 `event_date`
4. 코호트 매트릭스 · KPI 카드 즉시 렌더링

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 확장 본체 · 순수 HTML · CSS · JS · 빌드 없음 |
| `retention-matrix.trex` | Tableau에 올리는 manifest |
| `sample_game_log.csv` | 시연용 이벤트 로그 · 10개 주간 코호트 · 결정적 생성 |

호스팅: GitHub Pages · `.trex`의 source-location에 고정.
망 제약 환경은 Extensions API 스크립트를 레포에 내려받아 교체(vendoring).
