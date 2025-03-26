import { Share } from "lucide-react";
import processResult from "../../assets/ImageEval/process-result.svg";
import Button from "../../components/Button";
import testImage from "../../assets/ImageEval/test-image.jpg";
import {
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import ImageEvalDetail from "./ImageEvalDetail";
import { useAuthStore } from "../../store";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

function ImageEvalResult() {
  const score = 84;
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const openModal = () => {
    if (isLoggedIn) {
      setIsDetailOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const navigateLogin = () => {
    navigate("/login");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <Modal
        description={
          <>
            더 자세한 정보는 로그인 후 <br></br> 확인하실 수 있습니다!
          </>
        }
        title="알림"
        isOpen={isModalOpen}
        onClose={closeModal}
        buttons={[
          {
            label: "로그인 하기",
            textColor: "green",
            onClick: navigateLogin,
          },
          {
            label: "취소",
            textColor: "gray",
            onClick: closeModal,
          },
        ]}
      />
      <ImageEvalDetail
        isModalOpen={isDetailOpen}
        closeDetail={closeDetail}
        score={score}
      />

      <img src={processResult} alt="결과" className="mb-5 mt-5 " />
      <div
        className="w-[90%] shadow p-3 rounded flex flex-col items-center"
        style={{ boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.3)" }}
      >
        <img
          src={testImage}
          alt=""
          className="rounded h-full w-full aspect-square border mb-4"
          style={{ boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.3)" }}
        />
        <div className="font-logo text-pic-primary text-5xl mb-2">
          {score}점
        </div>
        <div className="mb-1">혹시... 전문 사진작가?</div>
      </div>

      <div className="flex  gap-10 mt-8 mb-5">
        <Button color="white" width={30} height={10} onClick={openModal}>
          <MagnifyingGlassIcon width={15} />
          <div className="ml-2">자세히</div>
        </Button>
        <Button color="green" width={30} height={10}>
          <ArrowUpTrayIcon width={15} />
          <div className="ml-2">업로드</div>
        </Button>
      </div>
      {/* <button className="cursor-pointer flex justify-center items-center gap-1 w-30  border border-pic-primary rounded-2xl text-pic-primary mb-5">
        <ShareIcon width={15} />
        <div className="text-sm my-1">공유하기</div>
      </button> */}
    </div>
  );
}

export default ImageEvalResult;
