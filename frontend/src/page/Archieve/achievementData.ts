import { BadgeCategory } from "../../types";
// Import 방식으로 이미지 불러오기 (방법 1)
import badge1 from "../../assets/badge1.png";
import badge2 from "../../assets/badge2.png";
import badge3 from "../../assets/badge3.png";
import badge4 from "../../assets/badge4.png";
import badge5 from "../../assets/badge5.png";
import badge6 from "../../assets/badge6.png";
import badge7 from "../../assets/badge7.png";
import badge8 from "../../assets/badge8.png";
import badge9 from "../../assets/badge9.png";
import badge10 from "../../assets/badge10.png";
import badge11 from "../../assets/badge11.png";
import badge12 from "../../assets/badge12.png";

// 모든 업적 정의
export const achievementData: BadgeCategory[] = [
  {
    id: "all",
    name: "전체",
    badges: [
      {
        id: "first_follower",
        name: "첫 팔로워",
        description: "첫 번째 팔로워를 얻었습니다.",
        image: badge1, // import한 이미지 사용
        achieved: true,
        achievedDate: "2024.03.05",
      },
      {
        id: "popular_creator",
        name: "인기 크리에이터",
        description: "30명 이상의 팔로워를 달성했습니다.",
        image: badge2,
        achieved: true,
        achievedDate: "2024.03.12",
      },
      {
        id: "first_photo_eval",
        name: "첫 사진 평가",
        description: "첫 번째 사진 평가를 완료했습니다.",
        image: badge3,
        achieved: true,
        achievedDate: "2024.02.28",
      },
      {
        id: "photo_eval_master",
        name: "평가 마스터",
        description: "30회 이상의 사진 평가를 완료했습니다.",
        image: badge4,
        achieved: true,
        achievedDate: "2024.03.15",
      },
      {
        id: "first_post",
        name: "첫 게시글",
        description: "첫 번째 게시글을 작성했습니다.",
        image: badge5,
        achieved: true,
        achievedDate: "2024.03.01",
      },
      {
        id: "content_creator",
        name: "콘텐츠 크리에이터",
        description: "20개 이상의 게시글을 작성했습니다.",
        image: badge6,
        achieved: true,
        achievedDate: "2024.03.18",
      },
      {
        id: "first_timeattack",
        name: "첫 타임어택",
        description: "첫 번째 타임어택에 참여했습니다.",
        image: badge7,
        achieved: true,
        achievedDate: "2024.03.02",
      },
      {
        id: "timeattack_addict",
        name: "타임어택 중독자",
        description: "20회 이상의 타임어택에 참여했습니다.",
        image: badge8,
        achieved: false,
        achievedDate: "2024.03.17",
      },
      {
        id: "quality_photo",
        name: "고품질 사진작가",
        description: "사진 평가에서 77점 이상을 달성했습니다.",
        image: badge9,
        achieved: true,
        achievedDate: "2024.03.10",
      },
      {
        id: "timeattack_champion",
        name: "타임어택 챔피언",
        description: "타임어택에서 1위를 달성했습니다.",
        image: badge10,
        achieved: true,
        achievedDate: "2024.03.14",
      },
      {
        id: "liked_content",
        name: "인기 콘텐츠",
        description: "게시글이 좋아요 10개를 달성했습니다.",
        image: badge11,
        achieved: true,
        achievedDate: "2024.03.16",
      },
      {
        id: "achievement_master",
        name: "업적 마스터",
        description: "모든 업적을 달성했습니다.",
        image: badge12,
        achieved: true,
        achievedDate: "2024.03.20",
      },
    ],
  },
  {
    id: "social",
    name: "소셜",
    badges: [
      {
        id: "first_follower",
        name: "첫 팔로워",
        description: "첫 번째 팔로워를 얻었습니다.",
        image: badge1,
        achieved: true,
        achievedDate: "2024.03.05",
      },
      {
        id: "popular_creator",
        name: "인기 크리에이터",
        description: "30명 이상의 팔로워를 달성했습니다.",
        image: badge2,
        achieved: true,
        achievedDate: "2024.03.12",
      },
      {
        id: "liked_content",
        name: "인기 콘텐츠",
        description: "게시글이 좋아요 10개를 달성했습니다.",
        image: badge11,
        achieved: true,
        achievedDate: "2024.03.16",
      },
    ],
  },
  {
    id: "evaluation",
    name: "평가",
    badges: [
      {
        id: "first_photo_eval",
        name: "첫 사진 평가",
        description: "첫 번째 사진 평가를 완료했습니다.",
        image: badge3,
        achieved: true,
        achievedDate: "2024.02.28",
      },
      {
        id: "photo_eval_master",
        name: "평가 마스터",
        description: "30회 이상의 사진 평가를 완료했습니다.",
        image: badge4,
        achieved: true,
        achievedDate: "2024.03.15",
      },
      {
        id: "quality_photo",
        name: "고품질 사진작가",
        description: "사진 평가에서 77점 이상을 달성했습니다.",
        image: badge9,
        achieved: true,
        achievedDate: "2024.03.10",
      },
    ],
  },
  {
    id: "content",
    name: "게시글",
    badges: [
      {
        id: "first_post",
        name: "첫 게시글",
        description: "첫 번째 게시글을 작성했습니다.",
        image: badge5,
        achieved: true,
        achievedDate: "2024.03.01",
      },
      {
        id: "content_creator",
        name: "콘텐츠 크리에이터",
        description: "20개 이상의 게시글을 작성했습니다.",
        image: badge6,
        achieved: true,
        achievedDate: "2024.03.18",
      },
    ],
  },
  {
    id: "timeattack",
    name: "타임어택",
    badges: [
      {
        id: "first_timeattack",
        name: "첫 타임어택",
        description: "첫 번째 타임어택에 참여했습니다.",
        image: badge7,
        achieved: true,
        achievedDate: "2024.03.02",
      },
      {
        id: "timeattack_addict",
        name: "타임어택 중독자",
        description: "20회 이상의 타임어택에 참여했습니다.",
        image: badge8,
        achieved: false,
        achievedDate: "",
      },
      {
        id: "timeattack_champion",
        name: "타임어택 챔피언",
        description: "타임어택에서 1위를 달성했습니다.",
        image: badge10,
        achieved: true,
        achievedDate: "2024.03.14",
      },
    ],
  },
  {
    id: "master",
    name: "마스터",
    badges: [
      {
        id: "achievement_master",
        name: "업적 마스터",
        description: "모든 업적을 달성했습니다.",
        image: badge12,
        achieved: true,
        achievedDate: "2024.03.20",
      },
    ],
  },
];
