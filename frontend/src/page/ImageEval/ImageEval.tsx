import processEval from "../../assets/ImageEval/process-upload.svg";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { CameraIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import { useState } from "react";

function ImageEval() {
  const [modalState, setModalState] = useState(false);
  const modalOpen = () => {
    setModalState(true);
  };
  const modalClose = () => {
    if (modalState === true) {
      setModalState(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      onClick={modalClose}
    >
      {modalState && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            onClick={handleModalClick}
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}
            className="bg-gray-50 mt-10 flex justify-around text-xl rounded-2xl px-8 py-5 w-80 "
          >
            <div className="flex flex-col justify-center items-center">
              <CameraIcon className="text-pic-primary w-16" />
              <div className="text-[#3c3c3c] text-sm">사진 촬영</div>
            </div>
            <div className="border-l border-gray-300"></div>
            <div className="flex flex-col justify-center items-center">
              <ArrowUpTrayIcon className="text-pic-primary w-16" />
              <div className="text-[#3c3c3c] text-sm">사진 업로드</div>
            </div>
          </div>
        </div>
      )}
      <div className="mb-13">
        <img src={processEval} alt="" />
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold mb-1">사진을 올려주세요!</div>
        <div className="mb-5">멋진 사진을 평가해 드립니다.</div>
      </div>
      <div
        className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square rounded-md border border-black flex flex-col items-center justify-center gap-6 sm:gap-10 mb-8 sm:mb-12"
        style={{ borderStyle: "dashed", borderSpacing: "40px" }}
        onClick={modalOpen}
      >
        <div className="bg-white w-20 h-20 rounded-full flex justify-center">
          <ArrowUpTrayIcon className="text-pic-primary w-10 " />
        </div>
        <div className="text-lg font-bold text-[#000000b9]">
          사진을 촬영 또는 업로드 해주세요
        </div>
      </div>
      <Button
        color="green"
        width={32}
        height={12}
        textSize="lg"
        content="확인"
      ></Button>
    </div>
  );
}

export default ImageEval;
