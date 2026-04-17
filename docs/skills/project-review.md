# Skill: project-review

새로운 Claude Code 세션이 시작될 때 프로젝트 전체를 빠르게 파악하기 위한 Skill.

## 목적

- 새 세션 시작 시 프로젝트 컨텍스트 자동 파악
- 현재 진행 상황, 아키텍처, 컨벤션을 한 번에 리뷰

## 실행 순서

### Step 1. docs/progress.md 읽기

- 현재 완료된 STEP 확인
- TODO / Known Issues 확인

### Step 2. docs/architecture.md 읽기

- 패키지 구조 파악
- DB 스키마 파악
- 레이어 구조 파악

### Step 3. docs/api.md 읽기

- 구현된 API 목록 파악
- 요청/응답 형식 파악

### Step 4. docs/conventions.md 읽기

- 코드 컨벤션 파악
- 네이밍 규칙 파악
- 도메인 규칙 파악

### Step 5. 현재 코드베이스 스캔

- `src/main/java/com/sungkyul/cafeteria/` 하위 구조 확인
- 최근 변경된 파일 확인 (`git log --oneline -10` 및 `git status`)

### Step 6. 파악한 내용 요약 출력

아래 형식으로 출력한다.

---

## 프로젝트 현황 요약

### 진행 상황
- [x] 완료된 STEP 체크리스트 형식으로 나열

### 다음 작업
- 바로 시작할 수 있는 항목을 우선순위 순으로 나열

### 주의사항 (Known Issues)
- Known Issues 목록 나열
