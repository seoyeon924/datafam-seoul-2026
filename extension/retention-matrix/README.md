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
| 코호트 | 사용자별 첫 이벤트 주 기준 · 최근 10개 주 |
| 매트릭스 | W0~W9 주간 잔존율 · 파랑 단계 히트맵 |
| KPI | Avg DAU · D+1 · D+7 · D+30 (일 단위 복귀율) |
| 미연결 시 | SAMPLE DATA 배지와 함께 샘플 수치 렌더링 |

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
