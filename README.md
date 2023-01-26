# 사용자 맞춤 장소 추천 서비스 **FIT.PLACE**

<img width="736" alt="image" src="/Users/kim-youngbin/Desktop/KT_AIVLE_SCHOOL/dev/my-react/my-app/src/img/fitplace.png">

---
## **서비스 기획 배경**
개인의 취향과 흥미를 중요하게 생각하는 사람들을 위해 MBTI를 더해 개인 맞춤형 장소 추천 서비스를 제공하고자 하였습니다.

---
## **서비스 설명**
### **- 장소 추천**
- 사용자의 정보(연령대, 성별, MBTI)와 취향 키워드에 기반한 장소를 추천해줍니다.
### **- 인구 혼잡도 제공**
- 실시간 혼잡도 + 예측결과를 제공함으로써 장소 선택에 도움을 줍니다.

---
## **개발환경**
- 협업 tools
<img width="553" alt="image" src="https://user-images.githubusercontent.com/89764127/214747905-293e01e3-2c09-43b0-99b9-49e7af2da972.png">

- 개발 tools
<img width="547" alt="image" src="https://user-images.githubusercontent.com/89764127/214748024-849cc57d-1950-4154-8412-0fe1f6f4bdf7.png">

---
## **사용 데이터**
- **Kaggle MBTI Personality Types 500 Dataset**
  - https://www.kaggle.com/datasets/zeyadkhalid/mbti-personality-types-500-dataset
  - 장소들의 리뷰 데이터에 대해 MBTI를 분류하기 위해 사용
- **서울 실시간 도시데이터**
  - https://data.seoul.go.kr/SeoulRtd/
  - 혼잡도 예측에 사용
- **네이버 지도 장소 데이터**
  - 네이버 지도에서 [지역구 + 취향 키워드]를 조합한 검색 결과 데이터를 크롤링 (Selenium, BeautifulSoup 사용)

---
## **AI 모델링**
- 혼잡도 예측
- 리뷰 키워드 추출
- 리뷰 MBTI 분류
- 장소 추천 시스템

---
## **추천 시스템**
**코사인 유사도 + 콘텐츠 기반 필터링** 으로 유사도가 높은 장소들 추천
<img width="586" alt="image" src="https://user-images.githubusercontent.com/89764127/214749567-d93cb602-85da-45ca-983f-bf60fc6944ac.png">


---
## **개발 화면**
- **메인화면 + 로그인**
<img width="1082" alt="image" src="https://user-images.githubusercontent.com/89764127/214750249-e1840844-5f36-45c5-b575-272ba2c103ea.png">

- **프로필 수정**
<img width="1068" alt="image" src="https://user-images.githubusercontent.com/89764127/214750422-8eaf0d07-fdbd-4247-bae2-1b83c96cc57c.png">
<img width="1077" alt="image" src="https://user-images.githubusercontent.com/89764127/214750480-fd4d1b77-1770-4211-9bb3-764463f0624d.png">

- **장소추천 결과**
<img width="1082" alt="image" src="https://user-images.githubusercontent.com/89764127/214750546-92488b7b-e238-4c27-b884-37ba7fc88ab2.png">

- **장소 상세화면**
<img width="727" alt="스크린샷 2023-01-26 오후 12 13 40" src="https://user-images.githubusercontent.com/89764127/214751438-9c80cc0b-b7b7-4c2e-8d87-47b381fd45f5.png">

- **혼잡도 예측**
<img width="653" alt="image" src="https://user-images.githubusercontent.com/89764127/214751557-f611efcd-e0c8-4daa-b52e-64e15857193c.png">



---
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
  - 게시글 번호 붙여줌
- (2023.01.04)
  - SNS 둘러보기 스타일 수정
  - 게시판 이름 수정

