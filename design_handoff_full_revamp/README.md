# 핸드오프 — 학식 리뷰 앱 전면 UI/UX 개편

> **이 번들은 Claude Code가 기존 "웹앱 기반 학식 리뷰 및 메뉴 조회 서비스" 프로젝트를
> 새 디자인에 맞춰 재설계·재구현하기 위한 레퍼런스 패키지입니다.**

## 1. 번들에 포함된 것

```
design_handoff_full_revamp/
├── README.md                            ← 이 파일
├── design/
│   ├── SKU 학식 하이파이.html            ← 메인 (7개 화면 캔버스)
│   ├── hifi-system.jsx                  ← 디자인 토큰 + 공용 컴포넌트 + 아이콘
│   ├── hifi-screens-1.jsx               ← 홈 / 주간 / 전체 메뉴
│   ├── hifi-screens-2.jsx               ← 메뉴 상세 / 리뷰 작성
│   ├── hifi-screens-3.jsx               ← 프로필 / 로그인 / 닉네임 / 빈 상태
│   └── design-canvas.jsx                ← 캔버스 래퍼 (구현에 불필요)
└── DATA_MODEL.md                        ← 데이터 모델 & API 제안
```

## 2. 중요: 이 파일들을 '복사'하지 마세요

번들된 `.html` / `.jsx` 파일은 **디자인 레퍼런스**입니다. 실제 아이폰/브라우저에서 보이는
모양을 빠르게 프로토타이핑한 HTML + React(Babel 인라인)일 뿐, 프로덕션 코드가 아닙니다.

**Claude Code가 해야 할 일**: 대상 코드베이스의 기존 스택·패턴·라이브러리로 **재구현**.
- 프로젝트에 프레임워크가 이미 있으면 → 그 규칙을 따름
- 없거나 정해지지 않았으면 → **권장: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui**
  (모바일 웹 · 정적 생성 · Google OAuth 쉬움 · 팀 온보딩 편함)

## 3. 피델리티

**High-fidelity (hifi).** 아래 값은 확정안이므로 픽셀 수준까지 그대로 옮겨주세요.

---

## 4. 디자인 시스템 (토큰)

### 4.1 컬러

`hifi-system.jsx` 의 `T` 객체 참고. 요약:

| 토큰 | HEX | 용도 |
|---|---|---|
| `paper` | `#FBF6EC` | 배경 (warm cream) |
| `paperDeep` | `#F5EEDD` | 섹션 구분 배경 |
| `ink` | `#2B2218` | 본문 텍스트, 라인 (연필 잉크) |
| `inkSoft` | `#5C4F42` | 중간 톤 텍스트 |
| `mute` | `#8F8377` | 흐린 캡션 |
| `rule` | `#D9CDB8` | 점선 구분선 |
| `orange` | `#EF8A3D` | **메인 액센트** (CTA, #1 강조) |
| `orangeSoft` | `#FCE3CC` | 주황 배경, 한식 일러스트 |
| `yellow` | `#F5C451` | 별점 채움 |
| `yellowSoft` | `#FDF0C8` | 베스트 카드 배경 |
| `green` | `#7BA85C` | 가성비 축, 신선 신호 |
| `greenSoft` | `#DBE7CC` | 분식 일러스트 배경 |
| `peach` | `#F4B896` | 양 축, 일품 일러스트 배경 |
| `red` | `#D86C5A` | 리뷰 없음 안내, 경고 |

**그림자** — 플랫 오프셋 스타일 (soft drop-shadow 아님):
- `shadowSm` = `1px 2px 0 rgba(43,34,24,0.10)`
- `shadow` = `2px 3px 0 rgba(43,34,24,0.12)` (기본)
- `shadowLg` = `3px 5px 0 rgba(43,34,24,0.15)`

### 4.2 타입

- **Gaegu** (Google Fonts, 400/700) — 본문·캡션, 손글씨 느낌
- **Jua** (Google Fonts, 단일) — 제목·버튼·숫자 강조

```html
<link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Jua&display=swap" rel="stylesheet">
```

```css
--font-hand: "Gaegu", system-ui, sans-serif;
--font-disp: "Jua", "Gaegu", system-ui, sans-serif;
```

**스케일** (mobile 375px 기준):
- 페이지 타이틀: `Jua 24~28px / 1.15`
- 섹션 라벨: `Jua 17px`
- 카드 타이틀 (메뉴명): `Jua 15~17px`
- 본문: `Gaegu 13~14px / 1.4`
- 캡션: `Gaegu 11~12px`, `mute` 컬러
- 숫자 강조 (별점·통계): `Jua` 사용, 숫자를 크게

### 4.3 스트로크/라운드

- 기본 테두리: `1.5px solid ink` (버튼 primary는 `1.8px`)
- 카드 라운드: `16px`, 큰 카드 `20~26px`, 칩/필: `999px`
- 아이콘 stroke: `1.6~2.2px` (활성 상태일수록 굵게)

### 4.4 레이아웃 그리드

- 모바일 뷰포트: **375 × 760** 고정 타겟
- 좌우 패딩: `20px` (헤더/리스트 컨테이너)
- 컨테이너 간 간격: 카드 그룹 내 `8~10px`, 섹션 간 `14~18px`
- 탭바 높이: `60px` (아이콘 22px + 라벨 12px + 여백)

### 4.5 일러스트 (SVG)

`hifi-system.jsx`의 `<Icon />` 컴포넌트에 14종 라인 일러스트 정의됨:
`bowl, soup, chop, star, starO, search, home, cal, list, user, heart, gear, pencil, chevL/R/D, x, plus, filter, cam, medal, fire`

메뉴 카드의 `<FoodIllust />` = 원형 배경 + 아이콘 조합 (실사진 대체용 플레이스홀더).
**프로덕션에서는** 점진적으로 실제 음식 사진으로 교체 가능. 사진이 없는 경우 일러스트
fallback 유지.

---

## 5. 화면 명세 (7종)

> 모든 화면은 `Screen` 컴포넌트에 담겨 있음 (375×760, 32px round, ink 테두리).
> 상태바(`HiStatus`)는 실사 아님 — 시간 11:47 고정 디자인 요소.

### 5.1 홈 (`HiHome` · `hifi-screens-1.jsx`)

**목적**: 오늘 무엇을 먹을지 3초 안에 판단.

**구조** (세로):
1. `HiStatus` 상태바
2. 헤더 (패딩 `10px 20px 14px`)
   - 캡션 "2026. 4. 20 · 월요일 · 중식" (Gaegu 13 / mute)
   - H1 "오늘의 메뉴" (Jua 26 / ink) — `UL` 래퍼로 웨이브 언더라인
3. **오늘의 베스트 TOP 5** (가로 스크롤)
   - 카드 폭 `128px`, 패딩 `10px`, #1은 `yellowSoft` 배경
   - 구성: FoodIllust 62px → `#순위` + 메뉴명 → 코너 → 별점 + 리뷰 수
   - 오른쪽 끝 페이드 `linear-gradient(90deg, transparent, paper)` 30px
4. 점선 구분 (`1.5px dashed rule`)
5. **오늘 운영 중인 코너** (세로 리스트)
   - 정렬 드롭다운: 별점순 / 가나다순 / 리뷰 많은 순 (우측 칩)
   - 카드: FoodIllust 48px + 코너 라벨(NEW 뱃지) + 메뉴명 + 별점/리뷰수 + chevR
6. `TabBarHi active="home"`

**상호작용**:
- 베스트 카드 탭 → 메뉴 상세로 이동
- 정렬 칩 탭 → 바텀시트 (별점/가나다/리뷰수)
- 코너 행 탭 → 해당 메뉴 상세

### 5.2 주간 (`HiWeek`)

**목적**: 이번 주 전체 식단 한눈에 + 새 메뉴 식별.

**구조**:
1. 상태바
2. 헤더 "4월 셋째 주 · **이번 주 식단**" (UL 녹색)
3. **요일 탭** (월~금, 폭 균등) — 활성 탭은 `ink` 배경/`paper` 텍스트
4. 선택된 요일 섹션
   - 섹션 라벨 "월요일 · 중식" + 우측 "NEW = 처음 등장" 범례
   - 카드: FoodIllust 50px + 코너 + 메뉴명(+NEW 뱃지) + 별점 or "첫 등장 · 첫 리뷰의 주인공이 되어보세요" (red)
   - 베스트는 우측에 "베스트 🥇" 필
5. `TabBarHi active="week"`

**비즈니스 룰**:
- `NEW` = DB의 `menu.firstSeenAt`이 이번 주 크롤링 시각과 같으면 표시
- 리뷰 0개인 메뉴는 별점 대신 독려 문구 표시 (red 컬러)

### 5.3 전체 메뉴 (`HiAll`)

**목적**: 누적된 모든 메뉴 중 검색·필터 조회.

**구조**:
1. 헤더 "전체 메뉴" + "87개 · 최근 1년" 캡션
2. 검색 바 (자리표시자 "메뉴·코너 검색")
3. 코너 필터 칩 (가로 스크롤): 전체/한식/양식/분식/일품
4. 정렬 안내 "별점 높은 순" (캡션)
5. 리스트 (점선 구분) — FoodIllust 44px + 코너 + 🥇/🥈/🥉 메달 스티커 + NEW 뱃지 (조건부) + 메뉴명 + 별점/리뷰수

**메달 산정 룰**:
- 🥇 = 별점 ≥ 4.5 **and** 리뷰 ≥ 20
- 🥈 = 별점 ≥ 4.0 **and** 리뷰 ≥ 10
- 🥉 = 별점 ≥ 3.5 **and** 리뷰 ≥ 5
- 그 외 = 메달 없음

### 5.4 메뉴 상세 (`HiDetail` · `hifi-screens-2.jsx`)

**구조**:
1. 상단 바 (뒤로 chevL · 찜 heart)
2. 히어로 (중앙 정렬)
   - FoodIllust 120px `yellowSoft`
   - 코너 · 베스트 뱃지 (조건부)
   - 메뉴명 (Jua 26)
   - 별점 (큰 별 15px) + 평균 (Jua 18) + 리뷰 수
3. **3축 집계 카드** (`yellowSoft` 배경)
   - `<AxisBar />` × 3: 맛(`orange`), 양(`peach`), 가성비(`green`)
   - 각 축: 라벨 + 1–5 범위 바 + 수치 (Jua 14)
4. 리뷰 섹션
   - 라벨 "리뷰 24" + 우측 "최신순"
   - 카드: 닉네임(Jua 14) + 뱃지(🥇/🥈/🥉) + 날짜 · 맛/양/가성비 한 줄 · 본문(Gaegu 13)
5. 하단 CTA: **리뷰 작성하기** primary (연필 아이콘)

### 5.5 리뷰 작성 (`HiWrite`)

**구조**:
1. 상단 바 (X · "리뷰 쓰기" · 임시저장)
2. 선택된 메뉴 카드 (FoodIllust 54 + 코너·날짜 + 메뉴명)
3. **3축 × 5점 (big stars 32px)**
   - 맛 (orange) — "얼마나 맛있었나요?"
   - 양 (peach) — "양은 충분했나요?"
   - 가성비 (green) — "값어치 했나요?"
4. 한 마디 (선택) — 자리표시자 + 사진 첨부 아이콘
5. 하단 CTA: **리뷰 등록** primary

**검증 룰**:
- 3축 모두 1점 이상 선택 필수 (그 외는 선택)
- 코멘트 0~500자
- 사진 0~3장 · 각 5MB 이하 · jpeg/png/webp

### 5.6 프로필 (`HiProfile` · `hifi-screens-3.jsx`)

**구조**:
1. 헤더 "프로필" + 설정 아이콘 (gear)
2. 프로필 카드 (`orangeSoft`): 아바타 64 + 닉네임(🥈) + "작성 리뷰 N · 가입 YYYY.MM"
3. **다음 뱃지 진행도**
   - 라벨 "다음 뱃지 🥇 대가까지" + 우측 "리뷰 N개 남음" (orange)
   - 프로그레스 바 (10px, paperDeep 배경, orange 채움, 30에서 타겟 마커)
   - 하단 14 / 30 레이블
4. 통계 카드 3개 (grid): 리뷰 수 / 평균 별점 / 뱃지 수
5. 내가 쓴 리뷰 (최근 3개 preview + "전체 14 ›" 링크)

**뱃지 규칙** (사용자 레벨):
- 🥉 입문 = 리뷰 1~4개
- 🥈 열정 = 리뷰 5~29개
- 🥇 대가 = 리뷰 30개 이상

### 5.7 온보딩 — 로그인 (`HiLogin`)

전체 `orangeSoft` 배경. 센터 정렬 스플래시.
- 큰 일러스트 박스 (104px, 회전 -3deg) + 밥그릇 아이콘
- 타이틀 "SKU **학식**" (Jua 34, UL)
- 서브 "오늘 뭐 먹을지, 친구들 평점으로 3초 안에 결정해요"
- 음식 일러스트 장식 3개
- 하단 "Google로 시작하기" 버튼 (공식 Google G 로고 SVG)
- 푸터 약관 안내

### 5.8 온보딩 — 닉네임 (`HiNickname`)

- "2 / 2 · 마지막 단계"
- H1 "리뷰에 쓸 **닉네임**을 정해주세요"
- 입력 카드: 큰 텍스트 + orange 커서 + "✓ 사용 가능" (green)
- 안내 "2~12자 · 한 번 정하면 변경 어려워요"
- ✨ 추천 닉네임 칩 5개
- 하단 CTA "시작하기"

### 5.9 온보딩 — 빈 상태 (`HiEmpty`)

크롤링 전 첫 진입 화면.
- 헤더 "SKU 학식" + 오늘 날짜
- 중앙 일러스트 (회전 -4deg) + 메시지 "아직 오늘 메뉴가 없어요" + "매주 월요일 아침에 업데이트됩니다. 조금만 기다려주세요!"
- 지난 주 베스트 미리보기 2개 (opacity 0.75)
- 홈 탭바 활성

---

## 6. 공용 컴포넌트 (구현 시 분해 권장)

| 컴포넌트 | 역할 | props |
|---|---|---|
| `<Screen>` | 모바일 프레임 | label, sub, bg |
| `<HiStatus>` | 상태바 | dark? |
| `<Icon name size color stroke>` | 14종 라인 아이콘 | — |
| `<Stars value size>` | 별점 행 (0–5, 반올림) | — |
| `<Pill bg color border icon>` | 뱃지/필 | — |
| `<Button primary size icon>` | CTA | — |
| `<Card bg shadow round>` | 기본 카드 | — |
| `<TabBarHi active>` | 4탭 하단바 | home/week/all/me |
| `<FoodIllust kind size bg>` | 음식 일러스트 플레이스홀더 | — |
| `<AxisBar label value color>` | 3축 바차트 1행 | — |
| `<UL color>` | 웨이브 언더라인 | — |
| `<SecLabel right>` | 섹션 라벨 + 우측 액세서리 | — |

---

## 7. 인터랙션 / 상태

**글로벌**:
- 탭바로 홈/주간/전체/프로필 4개 루트 네비게이션
- 푸시 전환: 메뉴 상세, 리뷰 작성, 닉네임 설정 등 세부 화면
- 인증 가드: 리뷰 작성 진입 시 미로그인이면 `HiLogin` 모달 or 라우트

**애니메이션**:
- 복잡한 모션 없음. 자연스러운 default 트랜지션 (200–250ms ease-out)
- 별점 선택 시 살짝 pop (scale 0.9 → 1.0, 150ms)

**반응형**:
- 모바일 웹 전용. 데스크톱에서는 375px 중앙 정렬 + 좌우 여백 영역(`paperDeep`)으로 처리.

---

## 8. 구현 로드맵 (권장 순서)

1. **프로젝트 셋업**: Next.js 14 App Router + TS + Tailwind + shadcn/ui
2. **디자인 토큰**: `tailwind.config.ts`에 컬러/폰트/그림자 등록, `globals.css`에 Google Fonts import
3. **공용 컴포넌트 포팅**: 위 표의 12개 — shadcn 베이스 + 커스텀 스타일
4. **화면 구현**: 홈 → 주간 → 전체 → 상세 → 리뷰 작성 → 프로필 → 온보딩
5. **데이터 연결** — `DATA_MODEL.md` 참고
6. **크롤러**: 월요일 새벽 5시 cron (Vercel Cron or Supabase Edge Function)
7. **마이그레이션**: 기존 DB → 새 스키마, 데이터 보존 / 손실 있으면 명시

---

## 9. 오픈 이슈 / 결정 필요

- **이미지 소스**: 일러스트만으로 갈지, 메뉴 사진 크라우드소싱 할지
- **찜/하트 기능**: 현재 상세 화면에만 힌트, 메뉴 목록에도 둘지
- **리포트**: 학기말 "내 식습관" 요약 페이지 추가 여부 (추후 논의)

---

## 10. 참고 파일 사용법

1. `design/SKU 학식 하이파이.html`을 로컬 브라우저에서 열면 전체 디자인을 확인 가능
   (Google Fonts 인터넷 필요).
2. 두 손가락 스크롤로 캔버스 이동, 핀치로 확대.
3. 각 `hifi-screens-N.jsx` 파일은 **읽기 전용 레퍼런스** — 이 React는 Babel inline으로
   만들어져 프로덕션 빌드용이 아님.
