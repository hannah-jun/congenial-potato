# playwright e2e가 로컬 3000번 포트의 무관한 서버를 재사용한다

**Symptom**: `bun run test:e2e` 실행 시 `smoke.spec.ts`가 제목 불일치로 실패한다
(`Expected: "Create Next App"`, `Received: "todo"`).

**Observed evidence**: 이 세션의 개발 환경에서 `curl http://localhost:3000`이
이 저장소와 무관한 "todo" 앱의 HTML을 반환했다. `playwright.config.ts`의
`baseURL`이 `http://localhost:3000`으로 고정돼 있고 `reuseExistingServer:
!process.env.CI`라, 그 자리에 이미 떠 있는 무관한 서버를 그대로 재사용해버렸다.

**Suspected cause**: 로컬 머신에 다른 프로젝트의 dev 서버가 3000번 포트를 먼저
점유하고 있고, playwright 설정이 그 포트가 이 저장소의 서버인지 확인하지 않고
재사용하는 것으로 보인다 (아직 다른 머신에서 재현하지 않아 확정은 아님).

**What was tried**: 이 스펙 구현은 별도 포트(4173)에서 수동으로 띄운 dev
서버로 브라우저 검증을 마쳤다. `playwright.config.ts`는 건드리지 않았다 — 이
스펙의 범위 밖이라, e2e 하니스 자체의 포트 충돌 회피 방식은 고치지 않았다.

**Proposed next step**: `playwright.config.ts`의 `webServer`가 실제로 이
저장소의 서버인지 확인 후에만 재사용하도록 하거나(예: 응답 바디/헤더로
확인), 고정 3000번 대신 무작위 사용 가능한 포트를 골라 `baseURL`을 동적으로
설정하는 방법을 검토한다.
