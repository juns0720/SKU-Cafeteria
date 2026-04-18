# Frontend Development Plan (v1 · 아카이브)

> ⚠️ **이 문서는 레거시 v1 플랜입니다.**
> 2026-04-18 UI/UX 전면 개편이 확정되었으며, 현재 유효한 프론트·백엔드 로드맵은
> **[`docs/ui-ux-redesign-plan.md`](./ui-ux-redesign-plan.md)** 입니다.
>
> v1(FE-1 ~ FE-22)의 완료된 항목(FE-1~FE-5 대부분)은 현재 코드에 반영되어 있으며,
> 미완료 항목(FE-5-4, FE-6-1~FE-6-3)은 신규 Phase B·C·D로 **완전히 흡수**되었습니다.
> 레거시 미완료 항목을 별도로 진행하지 마세요.
>
> 이 문서는 초기 디자인 결정(컬러 팔레트/타이포그래피/반응형 브레이크포인트 등)을
> 참조하기 위해 보존됩니다.

---

## 디자인 시스템 (현재도 유효)

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

| 환경 | 기준 | 카드 열 수 (v2에서 변경) |
|---|---|---|
| 모바일 | 375px | **2열** (v1: 1열) |
| 태블릿 | 768px | **3열** (v1: 2열) |
| 데스크탑 | 1280px | **4열** (v1: 3열), 최대 1100px 중앙 정렬 |

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

## 레거시 v1 단계 목록 (참조 전용)

- FE-1 ~ FE-3: 인프라 · 환경변수 · Axios · React Query · useAuth · Router · Google 로그인 → **완료**
- FE-4 ~ FE-5: HomePage / WeeklyPage / ReviewsPage / MenuDetailModal / ReviewItem / StarRating / 리뷰 작성 폼 · 수정/삭제 → **대부분 완료**
- FE-5-4 (내 리뷰 페이지) → **v2의 FE-B-4 ProfilePage에 흡수**
- FE-6-1 (백엔드 API 연동) → **v2의 FE-B-1 + FE-C-3~C-7에 흡수**
- FE-6-2 (반응형 점검) → **v2 각 단위 검증 단계에 흡수**
- FE-6-3 (에러/빈 상태 UI) → **v2 각 단위 검증 단계에 흡수**

v1 상세 단계별 설계(FE-1-1~FE-22)는 본 파일 이전 커밋에서 확인 가능(`git log -p docs/FRONTEND_PLAN.md`).
