# 다른 노트북에서 여는 법

DataFam Seoul 2026 발표자료 · 전서연

## 1. 발표만 할 때 (설치 불필요)

`DataFam-Seoul-2026-발표자료.html` 더블클릭.

이미지가 파일 안에 들어 있어 인터넷 없이도 열립니다. 좌우 방향키로 넘깁니다.
PDF가 편하면 `DataFam-Seoul-2026-발표자료.pdf`.

## 2. 수정할 때

`index.html` + `assets/` 폴더가 한 쌍입니다. 같이 있어야 이미지가 보입니다.

편집 후 단일 파일을 다시 만들려면 프로젝트 폴더에서:

```bash
python3 - <<'PY'
import base64, io, os, re, mimetypes
s = io.open('index.html', encoding='utf-8').read()
for f in sorted(set(re.findall(r'assets/([A-Za-z0-9_.\-]+)', s))):
    q=os.path.join('assets',f)
    mt=mimetypes.guess_type(q)[0] or 'application/octet-stream'
    s=s.replace('assets/'+f, f'data:{mt};base64,'+base64.b64encode(open(q,'rb').read()).decode())
io.open('DataFam-Seoul-2026-발표자료.html','w',encoding='utf-8').write(s)
PY
```

## 3. 라이브 시연 준비

### Tableau Public MCP (사례 02)

```bash
claude mcp add tableau-public -s user -- npx -y @wjsutton/tableau-public-mcp-server@latest
claude mcp list          # ✔ Connected 확인
```

시연 대사와 순서는 `DEMO.md` 참고. 발표 직전 한 번 예열 권장.

### Retention Matrix 확장

`extension/retention-matrix/` 폴더.

1. Tableau Desktop 2024.2+ 에서 `sample_game_log.csv` 연결
2. 워크시트 Marks 카드 → Add Extension → `retention-matrix.trex`
3. User 선반에 `user_id` · Event Date 선반에 `event_date`

확장 본체는 GitHub Pages에서 불러오므로 네트워크가 필요합니다.

## 4. 웹에서 열기

| 용도 | 주소 |
|---|---|
| 발표 슬라이드 | seoyeon924.github.io/datafam-seoul-2026 |
| 자료 링크 모음 | seoyeon924.github.io/datafam-seoul-2026/links.html |
| 활용 사례 11종 | seoyeon924.github.io/datafam-seoul-2026/usecases/ |
| 채팅 데모 (LLM 연동) | datafam-seoul-2026.netlify.app/usecases/demo_chat.html |

## 5. 폴더 구성

```
index.html                          편집용 슬라이드 (assets 필요)
DataFam-Seoul-2026-발표자료.html      단일 파일 · 어디서나 열림
DataFam-Seoul-2026-발표자료.pdf       인쇄 · 배포용
assets/                             이미지 · 로고 · 캡처
usecases/                           활용 사례 11종 HTML
extension/retention-matrix/         Tableau 뷰 확장 + 샘플 CSV
netlify/functions/                  API 프록시 · LLM 응답 함수
links.html  feedback.html           자료 인덱스 · 후기 폼
README.md  DEMO.md                  제작 기록 · 시연 스크립트
```

## 6. 개발 환경까지 옮길 때

이 폴더에는 `node_modules`와 `.git`을 넣지 않았습니다. 필요하면 GitHub에서 받는 편이 빠릅니다.

```bash
git clone https://github.com/seoyeon924/datafam-seoul-2026.git
cd datafam-seoul-2026 && npm install
```

Netlify 배포는 `netlify link` 후 `netlify deploy --prod --dir .`.
LLM 응답 함수는 Netlify 환경변수 `OPENAI_API_KEY`를 씁니다. 키는 서버에만 있고 저장소에는 없습니다.

> API 키는 발표 후 폐기하고 재발급하세요.
