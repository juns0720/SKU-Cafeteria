# Architecture

## Package Structure

```
com.sungkyul.cafeteria
├── CafeteriaApplication.java
├── common/
│   ├── config/
│   │   ├── AppConfig.java          # RestTemplate 빈
│   │   └── SecurityConfig.java     # Security + CORS + JwtAuthFilter 등록
│   ├── controller/HealthController.java  # GET /api/v1/health
│   └── exception/
│       ├── ErrorResponse.java      # 공통 에러 응답 record
│       └── GlobalExceptionHandler.java   # @RestControllerAdvice
├── auth/
│   ├── controller/AuthController.java
│   ├── dto/LoginRequest.java, LoginResponse.java, UserResponse.java
│   ├── jwt/JwtProvider.java, JwtAuthFilter.java
│   └── service/AuthService.java
├── admin/
│   └── controller/AdminController.java   # POST /api/v1/admin/crawl, GET /api/v1/admin/crawl/debug
├── crawler/
│   ├── dto/CrawlingResult.java
│   ├── scheduler/CrawlerScheduler.java   # 매주 월요일 08:00 자동 실행
│   └── service/MenuCrawlerService.java   # Jsoup 기반 크롤링
├── user/
│   ├── entity/User.java
│   └── repository/UserRepository.java
├── menu/
│   ├── controller/MenuController.java
│   ├── dto/MenuResponse.java, TodayMenuResponse.java, WeeklyMenuResponse.java
│   ├── entity/Menu.java
│   ├── repository/MenuRepository.java
│   └── service/MenuService.java
└── review/
    ├── controller/ReviewController.java
    ├── dto/ReviewRequest.java, ReviewUpdateRequest.java, ReviewResponse.java
    ├── entity/Review.java
    ├── repository/ReviewRepository.java
    └── service/ReviewService.java
```

새 기능은 도메인별 패키지에 `controller` → `service` → `repository` → `entity` 레이어로 추가한다.

## Auth Flow

1. 프론트에서 Google 로그인 후 `idToken`을 `POST /api/v1/auth/google`로 전송
2. `AuthService.verifyGoogleToken()` → `https://oauth2.googleapis.com/tokeninfo?id_token=` 호출로 검증
3. `User` upsert (googleId로 조회 → 없으면 `save`, 있으면 `user.updateProfile()`)
4. `JwtProvider`로 accessToken / refreshToken 발급 → `LoginResponse` 반환
5. 이후 요청은 `Authorization: Bearer {accessToken}` 헤더로 인증
6. `JwtAuthFilter` → 토큰 유효 시 `SecurityContextHolder`에 userId(Long) 저장

컨트롤러에서 userId 추출 패턴:
```java
Long userId = (Long) authentication.getPrincipal();
```

## Security 인가 규칙

`SecurityConfig.filterChain()`에 정의된 현재 규칙:

| 경로 | 메서드 | 인증 |
|---|---|---|
| `/api/v1/auth/google` | POST | permitAll |
| `/api/v1/health` | GET | permitAll |
| `/api/v1/menus/**` | GET | permitAll |
| `/api/v1/reviews/**` | GET | permitAll |
| `/api/v1/admin/**` | * | authenticated |
| 나머지 | * | authenticated |

JWT 없는 authenticated 요청은 `AuthenticationEntryPoint`가 401 반환.
CORS 허용 오리진은 `SecurityConfig.corsConfigurationSource()`에서 관리한다. 배포 시 Vercel 도메인을 추가해야 한다.

## Crawler 구조

- **대상 URL**: `https://www.sungkyul.ac.kr/skukr/340/subview.do`
- **HTML 구조**: `<th>요일<br>yyyy.MM.dd</th>` 헤더, `<td class="no-data">` 주말 빈칸
- **날짜 파싱**: `\d{4}\.\d{2}\.\d{2}` 정규식으로 추출 (`parseDates()`)
- **SSL 이슈**: 성결대 사이트는 KISA(한국 CA) 인증서를 사용해 JVM 기본 truststore에 없음 → `fetchDocument()`에서 trust-all `SSLContext`로 우회
- **테스트 설계**: `fetchDocument()`가 package-private이라 같은 패키지의 테스트에서 Mockito `spy`로 stubbing 가능 (`MenuCrawlerServiceTest`)

## Configuration Profiles

| 프로파일 | 용도 | ddl-auto | 활성화 방법 |
|---|---|---|---|
| `dev` (기본) | 로컬 개발 | `update` | 기본값 |
| `prod` | Railway 배포 | `validate` | `SPRING_PROFILES_ACTIVE=prod` |

prod 프로파일 환경변수: `SPRING_DATASOURCE_URL` / `SPRING_DATASOURCE_USERNAME` / `SPRING_DATASOURCE_PASSWORD` / `JWT_SECRET`
