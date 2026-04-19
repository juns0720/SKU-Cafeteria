# 데이터 모델 & API 설계 제안

> UI 전면 개편에 맞춰 데이터 스키마와 API를 **Postgres + Prisma** 기준으로 제안합니다.
> 기존 모델이 있다면 마이그레이션 계획을 먼저 세우고, 차이 영역에 대해 사용자와 논의하세요.

## 1. 스키마 (Prisma)

```prisma
// schema.prisma

generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

model User {
  id          String   @id @default(cuid())
  googleId    String   @unique                   // Google OAuth sub
  email       String   @unique
  nickname    String   @unique                   // 2~12자, 최초 1회 설정
  avatarColor String   @default("#EF8A3D")       // 아바타 원형 색
  createdAt   DateTime @default(now())

  reviews     Review[]

  @@index([nickname])
}

model Menu {
  id            String   @id @default(cuid())
  name          String                           // "치킨까스"
  corner        Corner                           // 한식/양식/분식/일품
  // 동일 이름+코너 조합을 unique key로 → 크롤링 시 upsert
  firstSeenAt   DateTime @default(now())         // 최초 등장 시각 (NEW 판정)
  lastSeenAt    DateTime @default(now())

  servings      Serving[]
  reviews       Review[]

  // 집계 캐시 (리뷰 저장 트리거로 갱신)
  avgTaste      Float?
  avgAmount     Float?
  avgValue      Float?
  avgOverall    Float?   // 3축 평균
  reviewCount   Int      @default(0)

  @@unique([name, corner])
  @@index([avgOverall])
  @@index([firstSeenAt])
}

enum Corner {
  KOREAN      // 한식
  WESTERN     // 양식
  SNACK       // 분식
  SPECIAL     // 일품
}

// 특정 날짜에 특정 메뉴가 제공된 기록 (주간 식단표 원본)
model Serving {
  id          String   @id @default(cuid())
  menuId      String
  menu        Menu     @relation(fields: [menuId], references: [id], onDelete: Cascade)
  servedOn    DateTime @db.Date                  // 2026-04-20
  mealSlot    MealSlot                           // LUNCH / DINNER
  crawledAt   DateTime @default(now())

  @@unique([menuId, servedOn, mealSlot])
  @@index([servedOn])
}

enum MealSlot { LUNCH DINNER }

model Review {
  id         String   @id @default(cuid())
  menuId     String
  menu       Menu     @relation(fields: [menuId], references: [id], onDelete: Cascade)
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // 3축 × 1~5 (정수)
  taste      Int                                 // 맛
  amount     Int                                 // 양
  value      Int                                 // 가성비

  comment    String?  @db.VarChar(500)
  photoUrls  String[] @default([])               // 최대 3장

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([menuId, userId])                     // 메뉴당 1리뷰, 수정만 가능
  @@index([createdAt])
}
```

## 2. 파생 값 (앱 레이어에서 계산)

### 2.1 메뉴 메달 (리스트/상세에 표시)

```ts
function menuTier(menu: Menu): 'gold' | 'silver' | 'bronze' | null {
  const { avgOverall, reviewCount } = menu;
  if (!avgOverall) return null;
  if (avgOverall >= 4.5 && reviewCount >= 20) return 'gold';
  if (avgOverall >= 4.0 && reviewCount >= 10) return 'silver';
  if (avgOverall >= 3.5 && reviewCount >= 5)  return 'bronze';
  return null;
}
```

### 2.2 NEW 판정

```ts
const NEW_WINDOW_DAYS = 7;
const isNew = (menu: Menu) =>
  Date.now() - menu.firstSeenAt.getTime() < NEW_WINDOW_DAYS * 86400_000;
```

### 2.3 사용자 레벨 뱃지

```ts
function userTier(reviewCount: number): 'bronze' | 'silver' | 'gold' {
  if (reviewCount >= 30) return 'gold';
  if (reviewCount >= 5)  return 'silver';
  return 'bronze';
}

function nextTargetReviews(count: number): { target: number; remaining: number } {
  const target = count < 5 ? 5 : count < 30 ? 30 : 100;
  return { target, remaining: Math.max(0, target - count) };
}
```

## 3. API 엔드포인트

REST 기준. tRPC / GraphQL을 쓰면 쿼리 이름만 옮기세요.

| 메서드 | 경로 | 용도 | 인증 |
|---|---|---|---|
| `GET` | `/api/menus/today?slot=LUNCH` | 오늘 운영 코너 + TOP5 | anon |
| `GET` | `/api/menus/week?from=2026-04-20` | 월~금 5일치 serving | anon |
| `GET` | `/api/menus?q=&corner=&sort=rating\|name\|reviews&page=1` | 전체 검색/필터 | anon |
| `GET` | `/api/menus/:id` | 상세 + 3축 집계 + 최근 리뷰 | anon |
| `POST` | `/api/menus/:id/reviews` | 리뷰 작성/수정 (upsert) | user |
| `GET` | `/api/menus/:id/reviews?sort=latest\|taste` | 리뷰 목록 페이지네이션 | anon |
| `POST` | `/api/auth/google` | OAuth 콜백 → 세션 | — |
| `POST` | `/api/users/me/nickname` | 최초 닉네임 설정 | user |
| `GET` | `/api/users/me` | 프로필 + 진행도 + 통계 | user |
| `GET` | `/api/users/me/reviews?page=1` | 내가 쓴 리뷰 | user |
| `POST` | `/api/cron/crawl` | 월요일 크롤링 (cron-secret 헤더) | system |

**응답 예시** — `/api/menus/today`:
```json
{
  "date": "2026-04-20",
  "slot": "LUNCH",
  "best": [
    { "id":"...", "name":"치킨까스", "corner":"WESTERN",
      "avgOverall":4.7, "reviewCount":24, "tier":"gold", "isNew":false }
  ],
  "corners": [
    { "corner":"KOREAN", "menus":[ /* ... */ ] },
    { "corner":"WESTERN", "menus":[ /* ... */ ] }
  ]
}
```

## 4. 크롤러 사양

- **스케줄**: 월요일 04:00 KST (Vercel Cron or Supabase pg_cron)
- **대상**: 성결대 학식 식단 공지 페이지 (실제 URL은 구 프로젝트 참고)
- **전략**:
  1. 이번 주 5일치 HTML 파싱 → `{ date, slot, corner, menuName }` 레코드 배열
  2. `Menu` upsert (by `name+corner`) — 신규면 `firstSeenAt = NOW()`, 기존이면 `lastSeenAt` 갱신
  3. `Serving` upsert (by `menuId+servedOn+mealSlot`)
- **실패 시**: Slack/이메일 알림 + 지난 데이터 유지
- **멱등성**: 동일 주를 여러 번 크롤해도 데이터 안 깨짐 (unique constraints)

## 5. 집계 캐시 갱신

리뷰 저장/수정/삭제 시 `Menu.avg*`, `reviewCount`를 트랜잭션 내에서 재계산:

```ts
async function recomputeMenuStats(tx, menuId: string) {
  const agg = await tx.review.aggregate({
    where: { menuId },
    _avg: { taste: true, amount: true, value: true },
    _count: { _all: true },
  });
  const { taste, amount, value } = agg._avg;
  await tx.menu.update({
    where: { id: menuId },
    data: {
      avgTaste: taste, avgAmount: amount, avgValue: value,
      avgOverall: taste && amount && value ? (taste + amount + value) / 3 : null,
      reviewCount: agg._count._all,
    },
  });
}
```

## 6. 마이그레이션 체크리스트

- [ ] 기존 DB 덤프 받기
- [ ] 기존 User/Menu/Review 네이밍과 매핑표 작성 (conflict 확인)
- [ ] `Serving` 테이블 없으면 신설 (주간 식단 원본은 필수)
- [ ] `Menu.firstSeenAt`가 없으면 안전하게 현재 시각으로 채우고 주석 남김
- [ ] 구 리뷰가 1축(맛)만 있었으면: `amount`, `value` = `taste`로 백필 or `NULL` 허용 후 UI에서 "맛만 있음" 표시
- [ ] 닉네임이 없었으면 로그인 후 `HiNickname` 강제 진입

## 7. 권한 / 보안

- 리뷰 작성/수정: 작성자 본인만
- 크론 엔드포인트: `CRON_SECRET` 헤더 검증
- 이미지 업로드: Supabase Storage 또는 R2 (직접 presigned URL)
- 닉네임: unique, 특수문자 제한, 욕설 필터 (basic regex로 시작)
