# Frontend Development Plan

## 기술 스택

| 라이브러리 | 버전 | 용도 |
|---|---|---|
| React | 18 | UI 렌더링 |
| Vite | latest | 빌드 도구 |
| TailwindCSS | v3 | 스타일링 |
| @tanstack/react-query | v5 | 서버 상태 관리 |
| Axios | latest | HTTP 클라이언트 |
| react-router-dom | v6 | 라우팅 |
| @react-oauth/google | latest | Google 로그인 |
| lucide-react | latest | 아이콘 |

---

## 폴더 구조

```
frontend/
├── src/
│   ├── api/
│   │   ├── client.js       # Axios 인스턴스 (baseURL, 인터셉터)
│   │   ├── auth.js         # 로그인, 내 정보
│   │   ├── menus.js        # 메뉴 조회 전체
│   │   └── reviews.js      # 리뷰 CRUD
│   ├── components/
│   │   ├── MenuCard.jsx
│   │   ├── ReviewItem.jsx
│   │   ├── StarDisplay.jsx
│   │   ├── StarRating.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── Toast.jsx
│   │   ├── WeekTab.jsx
│   │   ├── BottomNav.jsx
│   │   └── MenuDetailModal.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── WeeklyPage.jsx
│   │   ├── ReviewsPage.jsx
│   │   └── MyReviewsPage.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useToast.js
│   ├── index.css           # Tailwind directives + 커스텀 CSS 변수/애니메이션
│   └── App.jsx             # QueryClient + Router + GoogleOAuthProvider
├── .env.local
├── index.html
└── package.json
```

---

## 디자인 시스템 요약

### 컬러 팔레트

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-primary` | `#D94148` | 메인 포인트 컬러 (버튼, 뱃지, 활성 탭) |
| `--color-primary-dark` | `#B93540` | hover 상태 |
| `--color-primary-light` | `#FDEAEB` | 연한 배경 강조 |
| `--color-bg` | `#FFFFFF` | 페이지 배경 |
| `--color-surface` | `#F8F8F8` | 카드 배경 |
| `--color-star` | `#FBBF24` | 별점 색상 |
| `--color-success` | `#22C55E` | 성공 Toast |
| `--color-error` | `#D94148` | 에러 Toast |

### 타이포그래피

- 한국어: **Pretendard** (CDN)
- 영문 헤더: **DM Serif Display** (CDN)
- 사이즈: xs(12px) → sm(14px) → base(16px) → lg(18px) → xl(22px) → 2xl(26px) → 3xl(30px)

### 반응형 브레이크포인트

| 환경 | 기준 | 카드 열 수 |
|---|---|---|
| 모바일 | 375px | 1열 |
| 태블릿 | 768px | 2열 |
| 데스크탑 | 1280px | 3열 (최대 1100px 중앙 정렬) |

### 애니메이션

| 대상 | 효과 | 시간 |
|---|---|---|
| 카드 hover | `translateY(-2px)` | 0.2s ease |
| 페이지 진입 | `fadeInUp` (opacity 0→1, translateY 12→0) | 0.3s ease |
| 별점 선택 | `scale(1.2)` | 0.1s ease |
| 스켈레톤 shimmer | 좌→우 그라디언트 sweep | 1.5s infinite |
| 모달 진입 | `fadeIn` + `slideUp` | 0.2s ease |

---

## 환경변수 (.env.local)

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_GOOGLE_CLIENT_ID=발급받은_클라이언트_ID
```

---

## 구현 단계

---

### [인프라]

---

#### FE-1. Vite 프로젝트 생성 + 패키지 설치 + TailwindCSS 설정

**구현 파일**
- `frontend/` 디렉토리 전체 초기화
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css` — Tailwind directives + CSS 변수 + 폰트 import + 애니메이션 keyframes

**`index.css` 포함 내용**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Pretendard + DM Serif Display CDN */
/* CSS 변수: --color-primary, --color-star 등 */
/* @keyframes fadeInUp, shimmer */
```

**`tailwind.config.js` 커스터마이징**
```js
theme: {
  extend: {
    colors: { primary: '#D94148', 'primary-dark': '#B93540', star: '#FBBF24' },
    fontFamily: { sans: ['Pretendard', 'sans-serif'] },
  }
}
```

**브라우저 검증**
- `npm run dev` → `localhost:5173` 접속
- 빈 화면에 Tailwind 클래스 적용된 `<h1 className="text-primary">테스트</h1>` 렌더링 확인

**다음 단계 의존성** — FE-2 (환경변수)

---

#### FE-2. 환경변수 설정

**구현 파일**
- `frontend/.env.local`

**내용**
```
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_GOOGLE_CLIENT_ID=발급받은_클라이언트_ID
```

**브라우저 검증**
- `App.jsx`에서 `console.log(import.meta.env.VITE_API_BASE_URL)` → 콘솔에 URL 출력 확인 후 제거

**다음 단계 의존성** — FE-3 (Axios 인스턴스)

---

#### FE-3. Axios 인스턴스 작성

**구현 파일**
- `src/api/client.js`

**구현 내용**
```js
// baseURL = import.meta.env.VITE_API_BASE_URL
// 요청 인터셉터: localStorage에서 accessToken 읽어 Authorization: Bearer 헤더 추가
// 응답 인터셉터: 401 → localStorage 토큰 제거 + window.location.href = '/'
```

**브라우저 검증**
- 백엔드 실행 후 `client.get('/health')` 콘솔 호출 → 200 응답 확인

**다음 단계 의존성** — FE-4 (API 함수)

---

#### FE-4. API 함수 전체 작성

**구현 파일**
- `src/api/auth.js`
- `src/api/menus.js`
- `src/api/reviews.js`

**auth.js**
```js
export const loginWithGoogle = (idToken) => client.post('/auth/google', { idToken })
export const getMe = () => client.get('/auth/me')
```

**menus.js**
```js
export const getTodayMenus = () => client.get('/menus/today')
export const getWeeklyMenus = (date) => client.get('/menus/weekly', { params: { date } })
export const getAllMenus = (sort) => client.get('/menus', { params: { sort } })
export const getMenuById = (menuId) => client.get(`/menus/${menuId}`)
```

**reviews.js**
```js
export const getReviews = (menuId, page, size) =>
  client.get('/reviews', { params: { menuId, page, size } })
export const getMyReviews = () => client.get('/reviews/me')
export const createReview = (data) => client.post('/reviews', data)          // → 201
export const updateReview = (reviewId, data) => client.put(`/reviews/${reviewId}`, data)
export const deleteReview = (reviewId) => client.delete(`/reviews/${reviewId}`)
```

**브라우저 검증**
- 콘솔에서 `getTodayMenus().then(console.log)` → 백엔드 응답 확인

**다음 단계 의존성** — FE-5 (React Query)

---

#### FE-5. React Query 설정

**구현 파일**
- `src/App.jsx` — `QueryClientProvider` 래핑

**구현 내용**
```jsx
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1000 * 60 } }
})
// <QueryClientProvider client={queryClient}> 로 앱 전체 래핑
```

**브라우저 검증**
- React Query Devtools 임시 추가 → 쿼리 패널 표시 확인

**다음 단계 의존성** — FE-6 (useAuth)

---

#### FE-6. useAuth 훅 구현

**구현 파일**
- `src/hooks/useAuth.js`

**구현 내용**
```js
// 상태: accessToken (localStorage), user (React Query로 /auth/me 캐시)
// login(idToken): POST /auth/google → accessToken localStorage 저장 → user 갱신
// logout(): localStorage 제거 → queryClient.clear()
// isLoggedIn: !!accessToken
```

**브라우저 검증**
- 콘솔에서 `useAuth().isLoggedIn` 확인 (false)

**다음 단계 의존성** — FE-7 (Router), FE-8 (Google 로그인)

---

#### FE-7. React Router 설정 + 기본 레이아웃

**구현 파일**
- `src/App.jsx` — `BrowserRouter` + `Routes` 설정
- `src/components/BottomNav.jsx`

**라우트 구성**
```
/             → HomePage
/weekly       → WeeklyPage
/reviews      → ReviewsPage
/my-reviews   → MyReviewsPage (미로그인 시 / 로 리다이렉트)
```

**BottomNav 명세**
- 아이콘: `Home`, `CalendarDays`, `Star` (lucide-react)
- 활성 탭: `text-primary`, 비활성: `text-[--color-text-muted]`
- `position: fixed; bottom: 0; width: 100%`
- 안전 영역: `pb-safe` 또는 `padding-bottom: env(safe-area-inset-bottom)`

**브라우저 검증**
- 각 탭 클릭 → URL 변경 + 빈 페이지 전환 확인
- BottomNav 하단 고정 확인

**다음 단계 의존성** — FE-8 (Google 로그인)

---

#### FE-8. Google 로그인 구현

**구현 파일**
- `src/App.jsx` — `GoogleOAuthProvider` 래핑
- `src/components/` 내 헤더에 로그인 버튼 포함 (또는 HomePage 헤더 영역)

**구현 내용**
```jsx
// GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
// useGoogleLogin({ onSuccess: async ({ credential }) => { await login(credential) } })
// 로그인 후 Toast("로그인 되었습니다", "success")
// 로그아웃 버튼: logout() 호출
```

**헤더 레이아웃**
```
성결 학식 (DM Serif Display)   [로그인 / 닉네임]
```

**브라우저 검증**
- Google 로그인 팝업 → 성공 → 헤더에 닉네임 표시 확인
- 401 발생 시 자동 로그아웃 확인

**다음 단계 의존성** — FE-9 이후 컴포넌트

---

### [공통 컴포넌트]

---

#### FE-9. StarDisplay

**구현 파일**
- `src/components/StarDisplay.jsx`

**Props**
```ts
{ rating: number, size?: 'sm' | 'md' | 'lg' }
```

**구현 내용**
- 5개 별 렌더링, 0.5 단위 반 별 표시
- 색상: `text-[--color-star]` (#FBBF24)
- lucide-react `Star` 아이콘 활용

**브라우저 검증**
- `<StarDisplay rating={3.5} />` → 별 3.5개 표시 확인

**다음 단계 의존성** — MenuCard(FE-12부터), ReviewItem

---

#### FE-10. SkeletonCard

**구현 파일**
- `src/components/SkeletonCard.jsx`

**구현 내용**
- MenuCard와 동일한 크기/레이아웃 구조
- shimmer 애니메이션: `animate-shimmer` (index.css에 정의)
- `bg-[#F0F0F0]` 기반, 그라디언트 sweep 1.5s infinite

**브라우저 검증**
- `<SkeletonCard />` 렌더링 → shimmer 애니메이션 동작 확인

**다음 단계 의존성** — HomePage 로딩 상태

---

#### FE-11. Toast

**구현 파일**
- `src/components/Toast.jsx`
- `src/hooks/useToast.js`

**Props**
```ts
{ message: string, type: 'success' | 'error' }
```

**구현 내용**
- 화면 상단 중앙 `position: fixed; top: 16px`
- success: 좌측 보더 `--color-success`, error: `--color-error`
- 2초 후 `fadeOut` 자동 소멸
- `useToast()` 훅: `{ showToast, ToastComponent }` 반환

**브라우저 검증**
- `showToast("테스트", "success")` 호출 → 2초 후 사라짐 확인

**다음 단계 의존성** — 리뷰 작성/수정/삭제 성공 알림

---

### [페이지 - Mock 데이터로 UI 먼저]

---

#### FE-12. 홈 화면 (오늘의 학식)

**구현 파일**
- `src/pages/HomePage.jsx`
- `src/components/MenuCard.jsx`

**MenuCard Props**
```ts
{ menuId, name, corner, imageUrl?, averageRating, reviewCount }
```

**MenuCard 레이아웃**
```
┌─────────────────────┐
│  [음식 사진]         │  ← aspect-ratio 4:3, object-fit cover
│  [코너 뱃지]         │  ← 좌상단 absolute, bg-primary text-white
├─────────────────────┤
│  메뉴명 (font-bold)  │
│  StarDisplay  4.2 (12) │
└─────────────────────┘
```

**HomePage 레이아웃**
```
헤더: "성결 학식" + 로그인 버튼
날짜 타이틀: "오늘 4월 17일 (목)"
카드 그리드: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

**Mock 데이터 예시**
```js
const MOCK_TODAY = [
  { menuId: 1, name: '제육볶음', corner: 'A코너', averageRating: 4.2, reviewCount: 12 },
  { menuId: 2, name: '된장찌개', corner: 'B코너', averageRating: 3.8, reviewCount: 5 },
]
```

**브라우저 검증**
- Mock 카드 그리드 렌더링 확인
- 모바일(375px) 1열 / 태블릿(768px) 2열 확인
- 카드 hover `translateY(-2px)` 확인

**다음 단계 의존성** — FE-15 (메뉴 상세 모달)

---

#### FE-13. 주간 학식표

**구현 파일**
- `src/pages/WeeklyPage.jsx`
- `src/components/WeekTab.jsx`

**WeekTab 명세**
- 월~금 날짜 탭, 가로 스크롤 (`overflow-x: auto`, 스크롤바 숨김)
- 오늘 날짜 자동 선택
- 선택된 탭: `border-b-2 border-primary font-bold text-primary`
- 비선택: `text-[--color-text-muted]`

**WeeklyPage 레이아웃**
```
헤더: "이번 주 학식"
WeekTab (월~금)
선택된 날짜의 MenuCard 그리드
```

**Mock 데이터**
- `{ MON: [...], TUE: [...], WED: [...], THU: [...], FRI: [...] }` 형태

**브라우저 검증**
- 탭 클릭 → 해당 날짜 메뉴 목록 전환 확인
- 오늘 탭 자동 선택 확인

**다음 단계 의존성** — FE-20 (백엔드 연동)

---

#### FE-14. 전체 리뷰 페이지

**구현 파일**
- `src/pages/ReviewsPage.jsx`

**레이아웃**
```
헤더: "전체 메뉴"
검색창 (lucide-react Search 아이콘)
정렬 버튼: [별점↓] [리뷰수↓] [날짜↓]
MenuCard 그리드
```

**정렬 상태**: `useState('date')` → `'rating' | 'reviewCount' | 'date'`
**검색**: 클라이언트 사이드 필터링 (mock), 실 연동 후 서버 파라미터로 전환

**브라우저 검증**
- 정렬 버튼 클릭 → 활성 버튼 스타일 전환 확인
- 검색창 입력 → 카드 필터링 확인

**다음 단계 의존성** — FE-15 (메뉴 상세 모달)

---

#### FE-15. 메뉴 상세 모달

**구현 파일**
- `src/components/MenuDetailModal.jsx`
- `src/components/ReviewItem.jsx`

**ReviewItem Props**
```ts
{ reviewId, authorName, avatarUrl?, rating, comment?, createdAt, isMine }
```

**ReviewItem 레이아웃**
```
[아바타] 닉네임          날짜
         StarDisplay
         코멘트 텍스트
         [수정] [삭제]   ← isMine일 때만 노출
```

**모달 레이아웃 (바텀시트)**
```
overlay: fixed inset-0 bg-black/40
sheet: fixed bottom-0 w-full rounded-t-2xl bg-white
  ✕ 닫기 버튼
  [음식 사진] aspect-ratio 16:9
  메뉴명 + StarDisplay + 리뷰수
  코너 뱃지 + 날짜
  ── 구분선 ──
  리뷰 작성 영역 (로그인 시만 표시)
  ── 구분선 ──
  ReviewItem 목록
```

**애니메이션**
- overlay: `fadeIn 0.2s`
- sheet: `slideUp 0.2s`

**브라우저 검증**
- MenuCard 클릭 → 모달 오픈 확인
- ✕ 클릭 또는 overlay 클릭 → 닫힘 확인
- `isMine=true` 리뷰에 수정/삭제 버튼 노출 확인

**다음 단계 의존성** — FE-17 (리뷰 작성 폼)

---

### [리뷰 기능]

---

#### FE-16. StarRating

**구현 파일**
- `src/components/StarRating.jsx`

**Props**
```ts
{ value: number, onChange: (rating: number) => void }
```

**구현 내용**
- 5개 별, hover 시 해당 별까지 채워짐
- 클릭으로 별점 확정
- 선택 시 `scale(1.2) 0.1s ease` 애니메이션

**브라우저 검증**
- 별 hover → 색상 변화 확인
- 클릭 → 값 고정 확인

**다음 단계 의존성** — FE-17 (리뷰 작성 폼)

---

#### FE-17. 리뷰 작성 폼

**구현 파일**
- `src/components/MenuDetailModal.jsx` 내 리뷰 작성 영역 통합

**구현 내용**
```
StarRating (별점 입력, 1~5)
textarea (코멘트, 최대 500자, placeholder: "맛 어때요?")
[등록] 버튼 → POST /reviews
```

**useMutation 활용**
```js
const { mutate: submitReview } = useMutation({
  mutationFn: createReview,
  onSuccess: () => { queryClient.invalidateQueries(['reviews', menuId]); showToast("리뷰 등록 완료", "success") },
  onError: (err) => showToast(err.response?.data?.message ?? "오류 발생", "error")
})
```

**도메인 규칙**
- 1인 1메뉴 1리뷰: 이미 작성 시 409 → "이미 리뷰를 작성했습니다" Toast
- 별점 미선택 시 버튼 비활성

**브라우저 검증**
- 별점 선택 + 코멘트 입력 → 등록 → 리뷰 목록 갱신 확인
- 중복 리뷰 시 에러 Toast 확인

**다음 단계 의존성** — FE-18 (수정/삭제)

---

#### FE-18. 리뷰 수정/삭제

**구현 파일**
- `src/components/ReviewItem.jsx` — 수정/삭제 버튼 동작 추가

**수정 흐름**
- [수정] 클릭 → ReviewItem 내 인라인 편집 모드 전환
- StarRating + textarea 노출
- [저장] → PUT /reviews/{reviewId} → 리뷰 목록 갱신

**삭제 흐름**
- [삭제] 클릭 → 확인 다이얼로그 (window.confirm 또는 인라인)
- DELETE /reviews/{reviewId} → 204 → 리뷰 목록 갱신

**브라우저 검증**
- 수정 → 저장 → 변경된 내용 즉시 반영 확인
- 삭제 → 해당 ReviewItem 제거 확인

**다음 단계 의존성** — FE-19 (내 리뷰 페이지)

---

#### FE-19. 내 리뷰 페이지

**구현 파일**
- `src/pages/MyReviewsPage.jsx`

**구현 내용**
- 미로그인 시 `/` 로 리다이렉트
- GET /reviews/me → 내 리뷰 전체 목록
- ReviewItem 전체에 `isMine=true` → 수정/삭제 버튼 노출
- 빈 상태: "아직 작성한 리뷰가 없어요" 안내

**브라우저 검증**
- 로그인 후 `/my-reviews` 접속 → 리뷰 목록 확인
- 비로그인 접속 → `/` 리다이렉트 확인

**다음 단계 의존성** — FE-20 (백엔드 연동)

---

### [마무리]

---

#### FE-20. 백엔드 API 연동 (Mock → 실제)

**구현 파일**
- `src/pages/HomePage.jsx`
- `src/pages/WeeklyPage.jsx`
- `src/pages/ReviewsPage.jsx`
- `src/pages/MyReviewsPage.jsx`
- `src/components/MenuDetailModal.jsx`

**각 페이지별 useQuery 교체**

```js
// HomePage
const { data, isLoading } = useQuery({ queryKey: ['menus', 'today'], queryFn: getTodayMenus })

// WeeklyPage
const { data } = useQuery({ queryKey: ['menus', 'weekly', date], queryFn: () => getWeeklyMenus(date) })

// ReviewsPage
const { data } = useQuery({ queryKey: ['menus', 'all', sort], queryFn: () => getAllMenus(sort) })

// MenuDetailModal 리뷰 목록
const { data } = useQuery({ queryKey: ['reviews', menuId, page], queryFn: () => getReviews(menuId, page, 10) })

// MyReviewsPage
const { data } = useQuery({ queryKey: ['reviews', 'me'], queryFn: getMyReviews })
```

**isLoading 처리**: `SkeletonCard` 표시
**isError 처리**: 에러 메시지 표시

**브라우저 검증**
- 백엔드 실행 후 실제 데이터 렌더링 확인
- 네트워크 탭에서 API 호출 확인

**다음 단계 의존성** — FE-21 (반응형 점검)

---

#### FE-21. 반응형 점검

**점검 기준**

| 환경 | 기준 | 확인 항목 |
|---|---|---|
| 모바일 | 375px | 카드 1열, BottomNav 표시, 가로 스크롤 없음 |
| 태블릿 | 768px | 카드 2열, WeekTab 가로 스크롤 |
| 데스크탑 | 1280px | 카드 3열, 최대 너비 1100px 중앙 정렬 |

**점검 항목**
- [ ] BottomNav safe-area 대응 (iOS Safari)
- [ ] 모달 바텀시트 높이 (vh 제한)
- [ ] WeekTab overflow-x 스크롤바 숨김
- [ ] 폰트 로드 완료 후 레이아웃 안정성 (FOUT)

**다음 단계 의존성** — FE-22 (에러/빈 상태)

---

#### FE-22. 에러/빈 상태 UI 점검

**점검 항목**

| 상황 | 표시 내용 |
|---|---|
| 오늘 학식 없음 | "오늘 학식 정보가 없습니다" |
| 주간 메뉴 없는 요일 | "해당 날짜 학식이 없습니다" |
| 리뷰 없음 | "아직 리뷰가 없어요. 첫 리뷰를 남겨보세요!" |
| 내 리뷰 없음 | "아직 작성한 리뷰가 없어요" |
| 네트워크 에러 | "데이터를 불러오지 못했습니다. 다시 시도해주세요." + 재시도 버튼 |
| 401 자동 로그아웃 | Toast("로그인이 만료되었습니다", "error") |

**브라우저 검증**
- 백엔드 중단 후 에러 상태 UI 확인
- 빈 배열 반환 시 빈 상태 UI 확인

---

## API 연동 매핑

| 페이지/컴포넌트 | 메서드 | 엔드포인트 | queryKey |
|---|---|---|---|
| HomePage | GET | `/menus/today` | `['menus', 'today']` |
| WeeklyPage | GET | `/menus/weekly?date=` | `['menus', 'weekly', date]` |
| ReviewsPage | GET | `/menus?sort=` | `['menus', 'all', sort]` |
| MenuDetailModal | GET | `/menus/{menuId}` | `['menus', menuId]` |
| MenuDetailModal | GET | `/reviews?menuId=&page=` | `['reviews', menuId, page]` |
| MenuDetailModal | POST | `/reviews` | invalidate `['reviews', menuId]` |
| ReviewItem | PUT | `/reviews/{reviewId}` | invalidate `['reviews', menuId]` |
| ReviewItem | DELETE | `/reviews/{reviewId}` | invalidate `['reviews', menuId]` |
| MyReviewsPage | GET | `/reviews/me` | `['reviews', 'me']` |
| 헤더 | GET | `/auth/me` | `['auth', 'me']` |
| 헤더 | POST | `/auth/google` | — |

---

## Known Issues / 주의사항

- **JWT accessToken 만료**: refreshToken 미구현 (백엔드 TODO) → 만료 시 자동 로그아웃만 처리
- **Menu 이미지**: API에 `imageUrl` 없음 → 대체 이미지(`/placeholder.png`) 또는 코너별 색상 배경으로 대체
- **AdminController 인가**: 일반 JWT로 접근 가능 → 프론트에서 admin UI 미구현
- **N+1 쿼리 (백엔드)**: `/menus` 응답 속도 느릴 수 있음 → SkeletonCard로 UX 보완
