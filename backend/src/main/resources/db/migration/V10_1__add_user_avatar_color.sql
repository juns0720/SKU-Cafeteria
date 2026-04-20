-- V10.1: users.avatar_color 추가
-- 선행 조건: V10 적용 완료

ALTER TABLE users
    ADD COLUMN avatar_color VARCHAR(7) NOT NULL DEFAULT '#EF8A3D';

ALTER TABLE users
    ADD CONSTRAINT users_avatar_color_format
    CHECK (avatar_color ~ '^#[0-9A-Fa-f]{6}$');
