# <span style="color: #123456;">PIC</span>SCORE

<img width="1070" alt="image" src="https://github.com/user-attachments/assets/2a8352c4-acdd-42de-a3bb-c24a75dfd202" />



# 개요
프로젝트 명: PICSCORE
프로젝트 기간: 2025.0
주제: 사진 미적평가와 액티비티요소가 들어있는 사진공유 웹앱
인원: 6인 (프론트 3인, 백엔드 2인, AI/인프라 1인)
기여도: 프론트엔드 50%
프로젝트 주관: 삼성 청년 SW/AI 아카데미


# 🛠 Skill / Tool
## Skill
<div style="">
  <img src="https://img.shields.io/badge/react 19-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white">
  <img src="https://img.shields.io/badge/TanStack Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white">
 </div>
 
## Tool
<p align="left">
  <img src="https://img.shields.io/badge/notion-%23181717.svg?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/mattermost-0058CC.svg?style=for-the-badge&logo=mattermost&logoColor=white">
  <img src="https://img.shields.io/badge/postman-FF6C37.svg?style=for-the-badge&logo=postman&logoColor=white">
  <img src="https://img.shields.io/badge/jira-0052CC.svg?style=for-the-badge&logo=jira&logoColor=white"><br>
  <img src="https://img.shields.io/badge/Intellij%20idea-000000.svg?style=for-the-badge&logo=Intellij%20idea&logoColor=white">
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-1572B6.svg?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E.svg?style=for-the-badge&logo=Figma&logoColor=white">
  <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white">
</p>


# 🚀 개발 기능
1. 모바일 환경에 최적화된 이미지 공유 피드 구현 및 무한 스크롤 적용으로 사용자 콘텐츠 탐색 편의성과 체류 시간 향상
2. AI 기반 사진 평가 기능을 프론트엔드에 연동하여 사용자 업로드 이미지에 대한 즉각적인 피드백 제공 및 서비스 몰입도 향상
3. jwt토큰 기반 사용자 인증 흐름 구현 및 로그인 상태 전역 관리로 안정적인 사용자 세션 유지
4. PWA 오프라인 모드 구현을 통해 네트워크 불안정 환경에서도 핵심 기능 사용 가능하도록 서비스 접근성 강화
5. Figma를 활용한 UI 설계 및 화면 흐름 공유로 팀원 간 요구사항을 사전에 정렬하고 개발 단계에서의 커뮤니케이션 비용 감소

🛠️ 트러블슈팅 및 최적화

- **대용량 이미지 피드 렌더링 최적화 (LCP 8.6s → 1.8s  79% 개선)**
    - **문제:** 고해상도 원본 이미지의 동시 로딩으로 인해 LCP가 8.6s까지 지연되고 모바일 스크롤 버벅임 발생
    - **해결:** **Intersection Observer** 기반의 Lazy Loading 및 무한 스크롤을 구현, 로딩 상태에 **Skeleton UI**를 적용하여 체감 속도 개선
    - **결과:** **LCP 8.6s에서 1.8s로 약 79% 단축**
- **서비스 안정성 확보 및 모바일 네이티브 경험 구축**
    - **문제:** 배포 후 사용자들이 정상적으로 서비스를 사용하고 있는지 파악 x, 최소한의 재현 과정 파악이 어려움
    - **해결:** **Sentry**를 연동하여 클라이언트 에러를 실시간으로 추적함
    - **결과:** 사용자 환경 정보를 기반으로 버그 재현 시간을 단축하여 대응 속도를 높여 서비스 안정성에 기여
- **상태 관리 최적화 및 사용자 경험 개선**
    - **해결:** **Zustand**를 활용해 사용자 인증 및 이미지 평가 데이터의 흐름을 전역 상태로 관리하여 복잡도를 낮춤
    - **결과:** Prop Drilling 없는 간결한 데이터 흐름을 설계해 유지보수성 향상

# 💻 화면
## 1. 입장, 로그인
<table>
  <tr>
    <th>입장</th>
     <th>로그인</th>
  </tr>
  <tr>
    <td><img src="https://velog.velcdn.com/images/kub938/post/5d9b7631-00ef-44af-a3b3-9579b9ae1ae9/image.gif" width="250" height="500"/></td>
    <td><img src="https://velog.velcdn.com/images/kub938/post/e24a6734-f6dc-44c2-8c8a-96ad3d9d0d37/image.gif" width="250" height="500"/></td>
  </tr>
</table>

## 2. 사진 분석
<table>
  <tr>
    <th>사진 미적 분석</th>
    <th>분석 결과</th>
    <th>업로드</th>
  </tr>
  <tr>
    <td><img src="https://velog.velcdn.com/images/kub938/post/d87e9da8-f34d-4a36-b8f4-1a20250bd4ce/image.gif" width="250" height="500"/></td>
    <td><img src="https://velog.velcdn.com/images/kub938/post/afaacbf0-d3f7-4d88-8554-03a67fa103a7/image.gif" width="250" height="500"/></td>
    <td><img src="https://velog.velcdn.com/images/kub938/post/b01a2a78-0c8e-49b0-93dd-649f6960920e/image.gif" width="250" height="500"/></td>
  </tr>
</table>

## 3. 게시판
<table>
  <tr>
    <th>전체 목록</th>
    <th>게시글</th>
    <th>친구/게시글 검색</th>
  </tr>
  <tr>
    <td><img src="https://velog.velcdn.com/images/kub938/post/9d6ce850-f53f-4a16-9252-f1b8410492c8/image.gif" width="250" height="500"/></td>
    <td><img src="https://velog.velcdn.com/images/kub938/post/662c61d3-aee2-4f26-b2d7-84bd49693998/image.gif" width="250" height="500"/></td>
    <td><img src="https://velog.velcdn.com/images/kub938/post/2e65cdd8-f8da-46cf-a9fd-a9a3c0b979ad/image.gif" width="250" height="500"/></td>
  </tr>
</table>



# 📕 아키텍쳐

<img src="https://velog.velcdn.com/images/kub938/post/0c28a778-df8a-4eeb-ac3d-976acb43e362/image.png" width="800" height="500"/>

