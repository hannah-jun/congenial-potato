# `lib/settings.ts`의 `loadSettings()`는 localStorage 값의 필드 형태를 검증하지 않는다

JSON 문법은 유효하지만 예상 스키마와 다른 값(예: 스키마 변경 후 남은 옛 값)이면 그대로 통과시켜, 초기 설정 화면 대신 `undefined`/`NaN`이 섞인 화면이 보일 수 있다 (2026-08-20, code-review low에서 발견, 주 경로가 아니라 수정하지 않고 기록만 남김).
