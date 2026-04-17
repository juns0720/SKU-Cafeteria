# API Reference

모든 엔드포인트 prefix: `/api/v1/`

## Auth

| 메서드 | 경로 | 인증 | 설명 |
|---|---|---|---|
| POST | `/auth/google` | 불필요 | Google idToken으로 로그인, JWT 반환 |
| GET | `/auth/me` | 필요 | 현재 로그인 사용자 정보 |

## Menus

| 메서드 | 경로 | 인증 | 설명 |
|---|---|---|---|
| GET | `/menus/today` | 불필요 | 오늘 학식 목록 |
| GET | `/menus/weekly?date=yyyy-MM-dd` | 불필요 | 해당 주 월~금 식단 (`date` 생략 시 이번 주) |
| GET | `/menus/{menuId}` | 불필요 | 메뉴 단건 상세 (없으면 404) |

- `MenuResponse`에 `averageRating`(null 가능), `reviewCount` 포함
- `/menus/weekly` 응답 `days` 필드: `"MON"~"FRI"` 키, 데이터 없는 요일은 빈 리스트

## Reviews

| 메서드 | 경로 | 인증 | 설명 |
|---|---|---|---|
| GET | `/reviews?menuId=&page=&size=` | 선택 | 특정 메뉴 리뷰 목록 (페이징, 최신순) |
| GET | `/reviews/me` | 필요 | 내 리뷰 전체 목록 (최신순) |
| POST | `/reviews` | 필요 | 리뷰 작성 → 201 Created |
| PUT | `/reviews/{reviewId}` | 필요 | 리뷰 수정 (본인만) → 200 OK |
| DELETE | `/reviews/{reviewId}` | 필요 | 리뷰 삭제 (본인만) → 204 No Content |

- 인증 시 본인 리뷰에 `isMine = true`

## Admin

| 메서드 | 경로 | 인증 | 설명 |
|---|---|---|---|
| POST | `/admin/crawl` | 필요 | 학식 크롤링 수동 트리거 |
| GET | `/admin/crawl/debug` | 필요 | 크롤링 디버그 정보 |

## 에러 응답 형식

모든 에러는 `ErrorResponse` record 형식으로 반환된다.

```json
{ "status": 404, "message": "메뉴를 찾을 수 없습니다" }
```

### Exception → HTTP Status 매핑

| 예외 | 상태코드 |
|---|---|
| `EntityNotFoundException` | 404 Not Found |
| `IllegalStateException` | 409 Conflict |
| `IllegalArgumentException` | 403 Forbidden |
| `MethodArgumentNotValidException` | 400 Bad Request |
| `Exception` (기타) | 500 Internal Server Error |

새로운 예외 타입이 필요하면 `GlobalExceptionHandler`에 `@ExceptionHandler` 추가.
