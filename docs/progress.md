# Progress

## Current Progress

- [x] STEP1: 프로젝트 초기 셋업 (HealthController, SecurityConfig, GlobalExceptionHandler)
- [x] STEP2: DB 스키마 및 Entity (User, Menu, Review + Repository)
- [x] STEP3: Google OAuth2 + JWT 로그인
- [x] STEP4: 학식 크롤러 (MenuCrawlerService, CrawlerScheduler, AdminController) + 단위 테스트
- [x] STEP5: 메뉴 조회 API (MenuService, MenuController, menu/dto)
- [x] STEP6: 리뷰 CRUD API (ReviewService, ReviewController, review/dto)

## Known Issues / TODO

- [ ] RefreshToken 관리 미구현 (현재 발급만 하고 저장 안 함)
  → 백엔드 완료 후 Redis로 구현 예정 (Upstash Redis 무료 플랜)
- [ ] AdminController 인가: 현재 일반 JWT로 접근 가능 → 추후 ROLE_ADMIN 분리 필요
- [ ] Menu API N+1 쿼리: `MenuService`에서 메뉴당 `averageRating`·`reviewCount`를 개별 쿼리로 조회
  → LEFT JOIN JPQL 단일 쿼리로 개선 필요
