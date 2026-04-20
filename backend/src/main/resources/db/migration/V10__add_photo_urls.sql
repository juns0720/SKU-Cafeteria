-- V10: reviews.photo_urls 추가 + image_url 백필
-- 선행 조건: V9 적용 완료
-- 주의: image_url 컬럼은 V11(Phase 5)까지 보존 — 여기서 DROP 금지

-- ─── 1) photo_urls 컬럼 추가 ─────────────────────────────────────
ALTER TABLE reviews
    ADD COLUMN photo_urls TEXT[] NOT NULL DEFAULT '{}';

-- ─── 2) 최대 3장 제약 ─────────────────────────────────────────────
ALTER TABLE reviews
    ADD CONSTRAINT reviews_photo_urls_max3
    CHECK (cardinality(photo_urls) <= 3);

-- ─── 3) image_url → photo_urls 백필 ──────────────────────────────
-- image_url 이 있고 photo_urls 가 아직 빈 행만 갱신 (idempotent)
UPDATE reviews
SET photo_urls = ARRAY[image_url]
WHERE image_url IS NOT NULL
  AND cardinality(photo_urls) = 0;
