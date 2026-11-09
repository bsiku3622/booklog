# Work log

## 2026-09-25 — Adopt unified neutral palette steps

- 변경 파일: `vendor/paper-ui-0.1.0.tgz`, `pnpm-lock.yaml`
- 요약: Paper UI의 neutral palette step 방향 변경을 반영한 패키지를 갱신하고 production build를 확인했습니다.

이 업데이트는 palette 주소만 재정렬하고 semantic CSS의 HEX 값은 보존합니다. 그래서 앱 고유 스타일을 덧대지 않고 공통 패키지 버전을 최신 계약에 맞췄습니다.


## 2026-09-25 — Rebalance shared light neutral ramp

- 변경 파일: `vendor/paper-ui-0.1.0.tgz`, `pnpm-lock.yaml`
- 요약: Paper UI가 semantic anchor 사이의 OKLCH 보간으로 재생성한 light neutral ramp를 반영했습니다.

Booklog의 앱별 색상은 추가하지 않고 공통 패키지만 갱신해 동일한 surface 단계 구분을 사용하도록 했습니다.

## 2026-09-25 — Use a consistent, quieter neutral ramp

- 변경 파일: `vendor/paper-ui-0.1.0.tgz`, `pnpm-lock.yaml`
- 요약: Paper UI의 라이트 neutral이 achromatic과 zinc cast의 중간 톤으로 조정된 패키지를 반영했습니다.

세 앱이 모두 동일한 저채도 neutral source를 사용하도록 vendored package만 갱신했습니다. 앱별 색상 override나 dark palette는 추가하지 않았습니다.

## 2026-09-25 — Refresh the shared neutral palette

- 변경 파일: `vendor/paper-ui-0.1.0.tgz`, `pnpm-lock.yaml`
- 요약: Paper UI의 미세한 light zinc cast palette가 포함된 패키지로 갱신했습니다. Dark palette와 앱별 색상 override는 건드리지 않았습니다.

세 앱이 같은 neutral system을 보도록 공통 vendored package를 갱신했습니다. 책 표지와 책장 고유 스타일은 그대로 두고 semantic surface/ink 값만 최신 팔레트에서 공급받습니다.

## 2026-09-25 — Migrate to current Paper UI tokens and atoms

- 변경 파일: `vendor/paper-ui-0.1.0.tgz`, `pnpm-lock.yaml`, `src/styles/global.css`, `src/components/Booklog.css`, `src/components/Booklog.tsx`, `src/pages/index.astro`
- 요약: 앱별로 복제한 색상값을 제거하고 최신 Paper UI의 `bg`·`ink` 토큰에 연결했습니다. 책장 탭, 별점, 삭제 버튼과 독후감 입력도 Paper UI Atom으로 통일했습니다.

색상 팔레트는 앱에서 다시 정의하지 않고 라이브러리의 현재 계약을 단일 출처로 사용합니다. 표지 색과 책장 레이아웃처럼 Booklog 콘텐츠 자체를 표현하는 값은 공통 surface 토큰으로 오인되지 않도록 앱 스타일에 남겼습니다.

## 2026-09-24 — Remove the duplicate shelf rule

- 변경 파일: `src/components/Booklog.css`
- 요약: 마지막 책 행의 아래 테두리를 없애고 섹션 끝 구분선만 남겼습니다.

각 책 사이의 선은 목록 구분에 필요하지만, 마지막 책의 바로 아래에는 이미 섹션 `Divider`가 있습니다. 마지막 행에만 테두리를 생략해 선이 두 번 보이지 않게 했습니다.

## 2026-09-24 — Publish Booklog to its custom domain

- 변경 대상: GitHub `bsiku3622/booklog`, Vercel `zevoers/booklog`, Cloudflare DNS `bsiku.dev`
- 요약: 공개 GitHub 저장소에 올리고 Vercel production에 연결했으며, `books.bsiku.dev`를 HTTPS로 배포했습니다.

Cloudflare의 `books` CNAME은 Vercel이 이 프로젝트에 제시한 전용 `vercel-dns-017.com` 대상으로 DNS 전용(프록시 꺼짐)으로 추가했습니다. Wrangler OAuth는 DNS 쓰기 권한을 제공하지 않아 레코드는 Cloudflare 대시보드에서 등록했습니다. Vercel Git 연결을 통해 이후 `main` 푸시가 production 배포를 갱신합니다.

## 2026-09-24 — Enable PWA installation and offline shell

- 변경 파일: `astro.config.mjs`, `src/pages/index.astro`, `public/`
- 요약: 한국어 앱 manifest, 홈 화면 아이콘, production service worker 등록과 정적 파일 precache를 추가했습니다.

PWA 플러그인은 앱의 React island 구성에서 manifest 링크와 service worker 등록을 HTML에 자동 연결하지 않으므로 페이지에 명시적으로 등록했습니다. 독서 데이터는 localStorage에 남아 브라우저 안에서만 보관되며, 오프라인 동기화는 제공하지 않습니다.

## 2026-09-24 — Build a personal reading shelf

- 변경 파일: `src/components/Booklog.tsx`, `src/components/Booklog.css`, `src/pages/index.astro`
- 요약: 읽고 싶은 책을 모으고 읽는 상태를 옮기며 완독 뒤 별점과 독후감을 기록하는 작은 책장을 만들었습니다.

책 표지는 외부 이미지 서비스 없이 색면과 제목으로 표현해 샘플 데이터가 오프라인에서도 안정적으로 보이게 했습니다. 책장 상태와 감상은 브라우저 localStorage에만 저장하므로 기기 간 동기화나 백업은 제공하지 않습니다.
