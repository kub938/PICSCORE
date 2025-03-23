import {
  XMarkIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleBottomCenterIcon,
  PhotoIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { Clock, GitGraph } from "lucide-react";
import Chart from "./components/Chart";
import { useEffect } from "react";

interface ImageEvalDetailProps {
  isModalOpen: boolean;
  closeModal: () => void;
  score: number;
}

interface ImageEvalData {
  composition: number;
  lighting: number;
  color: number;
  sharpness: number;
  technique: number;
}

function ImageEvalDetail({
  isModalOpen,
  closeModal,
  score,
}: ImageEvalDetailProps) {
  const evalData: ImageEvalData = {
    composition: 85,
    lighting: 78,
    color: 92,
    sharpness: 83,
    technique: 88,
  };

  return (
    <>
      {isModalOpen && (
        <div
          className=" bottom-0 top-0 fixed w-full bg-black/40 z-50 flex flex-col justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-gray-100 mx-3 my-10 rounded flex flex-col max-h-[90vh]">
            {/* header - 고정된 헤더 */}
            <header className="bg-gray-100 flex justify-between items-center p-4 border-b border-gray-200 rounded">
              <div className="text-lg font-semibold">
                <span className="text-pic-primary">PIC</span>
                <span>SCORE</span>
              </div>
              <button
                onClick={closeModal}
                className="hover:bg-gray-200 rounded-full p-1"
              >
                <XMarkIcon className="text-gray-700" width={30} />
              </button>
            </header>

            <div className="overflow-y-auto">
              <div className="bg-pic-primary text-white py-4 pl-6">
                <div>TOTAL SCORE</div>
                <div>
                  <span className="text-6xl font-bold pr-1">{score}</span>
                  <span>/ 100</span>
                </div>
              </div>

              <div className=" bg-white rounded m-3 p-7 ">
                <div className="font-bold mb-2 text-xl">주제 분석</div>
                <div className="border-y-2  border-gray-200 ">
                  <div className="flex items-center my-2">
                    <ChatBubbleBottomCenterIcon className="text-pic-primary w-7 my-2 mx-4" />
                    <div>
                      <div className="font-bold text-gray-700">주요 주제</div>
                      <div className="text-sm">일반</div>
                    </div>
                  </div>

                  <div className="flex items-center my-2">
                    <ChatBubbleLeftRightIcon className="text-pic-primary w-7 my-2 mx-4" />
                    <div>
                      <div className="font-bold text-gray-700">관련 주제</div>
                      <div className="text-sm">일반</div>
                    </div>
                  </div>
                  <div className="flex items-center my-2">
                    <DocumentTextIcon className="text-pic-primary w-7 my-2 mx-4" />
                    <div>
                      <div className="font-bold text-gray-700">내용</div>
                      <div className="text-sm">일반</div>
                    </div>
                  </div>
                  <div className="flex items-center my-2">
                    <ClockIcon className="text-pic-primary w-7 my-2 mx-4" />
                    <div>
                      <div className="font-bold text-gray-700">시간대</div>
                      <div className="text-sm">일반</div>
                    </div>
                  </div>
                  <div className="flex items-center my-2">
                    <PhotoIcon className="text-pic-primary w-7 my-2 mx-4" />
                    <div>
                      <div className="font-bold text-gray-700">분위기</div>
                      <div className="text-sm">일반</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded m-3 p-7 ">
                <div className="font-bold mb-2 text-xl">요소 분석</div>
                <Chart />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageEvalDetail;
