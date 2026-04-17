# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

성결대학교 학식 리뷰 앱의 백엔드 서버.
- **Stack**: Spring Boot 3.5 / Java 17 / Gradle 8.14 / PostgreSQL
- **Deployment**: Railway (backend), Vercel (frontend)
- **Auth**: Google OAuth2 idToken 검증 + JWT

## Commands

모든 Gradle 명령은 `backend/` 디렉토리에서 실행한다.

```bash
./gradlew bootRun                  # 개발 서버 실행 (dev 프로파일)
./gradlew build -x test            # 빌드 (테스트 제외)
./gradlew test                     # 전체 테스트
./gradlew test --tests "com.sungkyul.cafeteria.SomeTest.methodName"  # 단일 테스트
./gradlew compileJava              # 컴파일 확인
```

## Docs

- @docs/architecture.md — 패키지 구조, Auth Flow, Security 규칙, Crawler, Configuration
- @docs/api.md — 전체 API 엔드포인트, 에러 응답 형식, Exception → HTTP Status 매핑
- @docs/conventions.md — 레이어 구조, 도메인 규칙, 엔티티 수정 패턴, 응답 코드 규칙
- @docs/progress.md — 구현 진행 체크리스트, Known Issues / TODO
