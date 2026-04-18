# 프론트엔드 진행 상황

세부 설계: [`docs/ui-ux-redesign-plan.md`](./ui-ux-redesign-plan.md)

## 완료된 단계 (v1 레거시, 코드에 반영됨)

[인프라]
- [x] FE-1-1: Vite 프로젝트 생성 + TailwindCSS 설정
- [x] FE-1-2: Axios 인스턴스 (api/client.js)
- [x] FE-1-3: React Query + React Router 설정
- [x] FE-1-4: Header 컴포넌트
- [x] FE-1-5: BottomNav 컴포넌트

[공통 컴포넌트]
- [x] FE-2-1: StarDisplay (별점 표시용)
- [x] FE-2-2: SkeletonCard (로딩 shimmer)
- [x] FE-2-3: Toast + useToast 훅

[인증]
- [x] FE-3-1: useAuth 훅
- [x] FE-3-2: Google 로그인 버튼

[페이지 - Mock 데이터]
- [x] FE-4-1: HomePage + MenuCard (Mock) — v2에서 전면 재작성 예정
- [x] FE-4-2: WeeklyPage + WeekTab (Mock) — v2에서 전면 재작성 예정
- [x] FE-4-3: ReviewsPage (Mock) — v2에서 `AllMenusPage`로 대체
- [x] FE-4-4: 메뉴 상세 모달 + ReviewItem — v2에서 3축 별점으로 업데이트
- [x] FE-4-5: HomePage·ReviewsPage 모달 미작동 버그 수정

[리뷰 기능]
- [x] FE-5-1: StarRating (입력용)
- [x] FE-5-2: 리뷰 작성 폼
- [x] FE-5-3: 리뷰 수정/삭제

### 레거시 미완료 항목(새 계획에 흡수됨)

- ~~FE-5-4: 내 리뷰 페이지~~ → **FE-B-4 ProfilePage**에 흡수
- ~~FE-6-1: 백엔드 API 연동~~ → **FE-B-1 + FE-C-3~C-7**에 흡수
- ~~FE-6-2: 반응형 점검~~ → **각 Phase 검증 단계**에 흡수
- ~~FE-6-3: 에러/빈 상태 UI~~ → **각 Phase 검증 단계**에 흡수

---

## Phase B — 프로필 탭

- [ ] **FE-B-1**: `api/menus.js`·`api/users.js` 신설 + `api/reviews.js` 3축 시그니처 업데이트
- [ ] **FE-B-2**: BottomNav 4-way + `/profile`·`/menus` 라우트 (미로그인 `/profile` 리다이렉트)
- [ ] **FE-B-3**: NicknameSetupModal (최초 로그인 자동 오픈, 닫기 불가)
- [ ] **FE-B-4**: ProfilePage (프사/닉네임/뱃지/내 리뷰/로그아웃, `MyReviewsPage.jsx` 흡수 후 삭제)

## Phase C — 홈 / 주간 / 전체 메뉴 개편

- [ ] **FE-C-1**: `CornerTabs` 공통 컴포넌트
- [ ] **FE-C-2**: `MultiStarRating` / `MultiStarDisplay`
- [ ] **FE-C-3**: HomePage 재작성 (🏆 이번 주 BEST 배너 + "오늘의 메뉴" + CornerTabs + 검색/정렬 + 2열 그리드)
- [ ] **FE-C-4**: WeeklyPage 재작성 (✨ 신메뉴 배너 + 주간표 · 행=코너/열=요일 · 가로 스크롤)
- [ ] **FE-C-5**: AllMenusPage 신설 (`/menus`, `ReviewsPage.jsx` 삭제하고 로직 이관)
- [ ] **FE-C-6**: MenuDetailModal 3축 별점 + ReviewItem 뱃지·썸네일 슬롯
- [ ] **FE-C-7**: 레거시 파일 정리 + Vercel 배포

## Phase D — 사진 업로드 (프론트)

- [ ] **FE-D-3**: 사진 업로드 UX + 썸네일 프리뷰 + 라이트박스

---

## 구현 규칙

- 한 번에 하나의 단위만 구현. 완료 즉시 체크박스 업데이트
- 커밋 메시지에 단위 ID 포함 (예: `feat(FE-B-4): profile page with badge`)
- 브라우저에서 **375 / 768 / 1280** 뷰포트 확인
- `position: fixed` UI는 `createPortal(…, document.body)` 사용

## 현재 이슈

없음