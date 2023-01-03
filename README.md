# Fitplace-Frontend
핏플레이스 - 프론트엔드

## **v0.0.0**
- (2022.12.20)
  - 화면 전환, 레이아웃 구성
  - 로그인, 회원가입 API서버와 연동
  - 첫 커밋
- (2022.12.21)
  - 게시판(Board) 페이지
- (2022.12.22)
  - 프로필(취향, 키워드) 수정 화면 작업
  - 메인화면 디자인
  - 메인로고 추가
- (2022.12.23)
  - 웹페이지명 변경
  - 이용약관, 개인정보 처리방침 작성 및 동의화면 작업
  - 로그인화면 수정
- (2022.12.24)
  - 회원가입 시 사용자 정보도 같이 입력하도록 변경
  - 사용자 프로필 수정 화면 추가
  
## **v0.1.0**
- (2022.12.26)
  - 키워드 수정 화면 추가
  - 메인 화면 인기 있는 장소 랜덤으로 불러오기 구현
  - 개인정보 처리방침, 이용약관 확인 페이지 추가 (스타일 수정 필요)
- (2022.12.27)
  - 메인화면, 로그인 페이지 CSS 수정
  - 검색페이지 추가
  - 백엔드 바뀐 변수명에 맞춰 약간 수정
  - 사용자 토큰 정보 ==> 세션 스토리지 저장으로 변경 (브라우저 닫으면 로그아웃)
  - 사용자 취향 정보 입력 시 부울 값에서 0/1로 바꿈 (유사도 계산 때문에)
  - 상세페이지 작업 중
  - 이용약관 작업 중
  - 게시판 작업 중
- (2022.12.28)
  - 검색페이지 장소 추천 API 연동 중
  - 추천 장소 화면에 불러오는건 됨
  - **useEffect로 추천장소 불러올 때, 비동기 실행 순서 문제로 추천된 장소 말고 전체 장소 불러오는 문제 해결 필요 ==> 로딩화면 추가로 해결** 
  - SignUp.css 파일에 추천장소 display: flex 스타일 수정해놨음
- (2022.12.28)
  - 키워드 필터링, 평점/리뷰순 필터링 구현은 했는데
- (2022.12.29)
  - useEffect 비동기 추천 순서 문제 해결 ==> POST요청 시 body값에 effect_flag 확인하고, 사용자 프로필 반영된 정보일 때 응답 받아오도록 기다림 (로딩 화면 추가 필요)
  - 일단 기본 강남구 장소 불러오도록 (이후 버튼 추가되면 장소 필터링 반영되도록 해주기)
  - 필터링도 어느 정도 완료 (중분류는 아직 X)
  - 회원가입, 프로필 수정 페이지 스타일 수정
  - 추천 화면 로그인 안하면 전체 장소 불러오도록 바꾸기
  - 장소 상세페이지 (이전혼잡도, 혼잡도예측, 블로그리뷰 불러와야함) + 뒤로가면 다시 추천 로딩해야 돼서 상세페이지 새 탭에서 열게 함
  - 개인정보 처리방침, 이용약관 별도페이지 수정
- (2022.12.30)
  - 페이지네이션 기능 구현 완료 (스타일은 수정 필요)
  - 마지막페이지 20개 개수 안맞을 때 렌더링 문제도 해결
  - 추천 화면에 추천 근거 표시 (얘도 스타일 수정 필요)
- (2022.12.31)
  - 요즘 인기 있는 장소 클릭 시 상세페이지 넘어가도록 해줌
  - 메인화면(MainTop) 연령대, 성별, MBTI 별 추천 장소 보기 구현
  - 중분류 카테고리 필터링 구현 완료
- (2023.01.01)
  - 상세페이지 네이버 블로그 리뷰 불러오기 구현 (스타일 수정 필요)
- (2023.01.02)
  - SNS 둘러보기 구현
  - API KEY .gitignore에 추가 (npm install --save dotenv 해주세요)
  - 댓글 작성 구현 중
- (2023.01.03)
  - 장소 추천 페이지 스타일 수정
  - id, 닉네임 마스킹 처리 (functions.js 모듈에 함수 추가)
  - 상단바 환영합니다 이름으로 나오게 변경


**구현해야 할 기능**
- **상세페이지 혼잡도 예측, 7일간 데이터 불러오기**

- 스타일 수정 (상세페이지(+블로그리뷰), 게시판, SNS둘러보기)