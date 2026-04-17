# Conventions

## 레이어 구조

새 기능은 도메인별 패키지에 `controller` → `service` → `repository` → `entity` 순서로 추가한다.

## 도메인 규칙

- **리뷰**: 1인 1메뉴 1리뷰 (`uk_review_user_menu` UNIQUE 제약 — `user_id + menu_id`)
- **별점**: 1~5점 정수 (`@Min(1) @Max(5)`)
- **코멘트**: 최대 500자, nullable
- **메뉴**: 매주 월요일 자동 크롤링, 수동 트리거 `POST /api/v1/admin/crawl`
  - 중복 방지 UNIQUE 제약: `uk_menu_name_corner_date` (`name + corner + served_date`)

## 엔티티 수정 패턴

엔티티는 setter를 사용하지 않는다. 필드 변경이 필요한 경우 의미 있는 메서드를 엔티티에 추가한다.

```java
// Review.java 예시
public void update(int rating, String comment) {
    this.rating = rating;
    this.comment = comment;
}
```

## 응답 코드 규칙

| 상황 | 코드 |
|---|---|
| 조회 성공 | 200 OK |
| 생성 성공 | 201 Created (Location 헤더 포함) |
| 삭제 성공 | 204 No Content |
