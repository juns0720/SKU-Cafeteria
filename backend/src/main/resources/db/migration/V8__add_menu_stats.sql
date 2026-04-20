-- V8: menus 집계 캐시 + first/last_seen_at 컬럼 추가 및 백필
-- 선행 조건: V1~V7 적용 완료, reviews.taste/amount/value_rating NOT NULL (V6~)

-- ─── 1) 컬럼 추가 ─────────────────────────────────────────────────
ALTER TABLE menus ADD COLUMN first_seen_at  DATE;
ALTER TABLE menus ADD COLUMN last_seen_at   DATE;
ALTER TABLE menus ADD COLUMN avg_taste      DOUBLE PRECISION;
ALTER TABLE menus ADD COLUMN avg_amount     DOUBLE PRECISION;
ALTER TABLE menus ADD COLUMN avg_value      DOUBLE PRECISION;
ALTER TABLE menus ADD COLUMN avg_overall    DOUBLE PRECISION;
ALTER TABLE menus ADD COLUMN review_count   INT NOT NULL DEFAULT 0;

-- ─── 2) first/last_seen_at 백필 ───────────────────────────────────
UPDATE menus m
SET
    first_seen_at = sub.first_d,
    last_seen_at  = sub.last_d
FROM (
    SELECT
        menu_id,
        MIN(served_date) AS first_d,
        MAX(served_date) AS last_d
    FROM menu_dates
    GROUP BY menu_id
) sub
WHERE m.id = sub.menu_id;

-- ─── 3) 집계 캐시 백필 ────────────────────────────────────────────
-- 리뷰 없는 메뉴는 avg_* = NULL, review_count = 0 (DEFAULT) 유지
UPDATE menus m
SET
    avg_taste    = sub.at,
    avg_amount   = sub.aa,
    avg_value    = sub.av,
    avg_overall  = (sub.at + sub.aa + sub.av) / 3.0,
    review_count = sub.cnt
FROM (
    SELECT
        menu_id,
        AVG(taste_rating)::DOUBLE PRECISION  AS at,
        AVG(amount_rating)::DOUBLE PRECISION AS aa,
        AVG(value_rating)::DOUBLE PRECISION  AS av,
        COUNT(*)                             AS cnt
    FROM reviews
    GROUP BY menu_id
) sub
WHERE m.id = sub.menu_id;

-- ─── 4) 인덱스 ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_menus_avg_overall
    ON menus (avg_overall DESC NULLS LAST);

CREATE INDEX IF NOT EXISTS idx_menus_first_seen
    ON menus (first_seen_at DESC NULLS LAST);
