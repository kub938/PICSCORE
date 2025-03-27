import {
  HeartIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

function PhotoPost() {
  const likeCnt = 123;
  const score = 40;
  const profileImage = "";
  const photo = "";

  return (
    <div className="w-full flex flex-col mb-16">
      <div className="border h-18 w-full flex items-center">
        <div className="w-8/10 p-4 flex items-center ">
          <div className="w-12 h-12 rounded-full border">
            <img src="" alt="" />
          </div>
          <div className="ml-3">닉네임</div>
        </div>
        <div className="w-2/10 flex justify-center">
          <EllipsisHorizontalIcon width={30} />
        </div>
      </div>
      <div className="border h-110"></div>
      <div className="border h-50 mx-3">
        <div className="flex items-center justify-between">
          <div className="flex">
            <HeartIcon className="w-7" />
            <ShareIcon className="w-6 m-2" />
          </div>

          <div className="mr-3">PICSCORE {score}</div>
        </div>
        <div>이 사진을 {likeCnt}명이 좋아합니다</div>
        <div>해쉬태그</div>
        <div>자세히 보기</div>
      </div>
    </div>
  );
}

export default PhotoPost;
