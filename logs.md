# Work log

## 2026-09-24 — Enable PWA installation and offline shell

- 변경 파일: `astro.config.mjs`, `src/pages/index.astro`, `public/`
- 요약: 한국어 앱 manifest, 홈 화면 아이콘, production service worker 등록과 정적 파일 precache를 추가했습니다.

PWA 플러그인은 앱의 React island 구성에서 manifest 링크와 service worker 등록을 HTML에 자동 연결하지 않으므로 페이지에 명시적으로 등록했습니다. 독서 데이터는 localStorage에 남아 브라우저 안에서만 보관되며, 오프라인 동기화는 제공하지 않습니다.

## 2026-09-24 — Build a personal reading shelf

- 변경 파일: `src/components/Booklog.tsx`, `src/components/Booklog.css`, `src/pages/index.astro`
- 요약: 읽고 싶은 책을 모으고 읽는 상태를 옮기며 완독 뒤 별점과 독후감을 기록하는 작은 책장을 만들었습니다.

책 표지는 외부 이미지 서비스 없이 색면과 제목으로 표현해 샘플 데이터가 오프라인에서도 안정적으로 보이게 했습니다. 책장 상태와 감상은 브라우저 localStorage에만 저장하므로 기기 간 동기화나 백업은 제공하지 않습니다.
