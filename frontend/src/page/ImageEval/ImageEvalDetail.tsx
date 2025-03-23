import { XMarkIcon } from "@heroicons/react/24/outline";
import { GitGraph } from "lucide-react";
import Chart from "./components/Chart";

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
          className="fixed inset-0 bg-black/40 z-50 flex flex-col justify-center"
          onClick={closeModal}
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
                  <span className="text-6xl font-bold">{score}</span>
                  <span>/100</span>
                </div>
              </div>

              <div className=" bg-white rounded m-3 p-7 ">
                <div className="font-bold mb-2 text-xl">주제 분석</div>
                <div className="border-y-2  border-gray-200 ">
                  <div className="flex items-center my-2">
                    <div>아이콘</div>
                    <div>
                      <div className="font-bold text-gray-500">주요 주제</div>
                      <div>일반</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div>아이콘</div>
                    <div>
                      <div>주요 주제</div>
                      <div>일반</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>아이콘</div>
                    <div>
                      <div>주요 주제</div>
                      <div>일반</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>아이콘</div>
                    <div>
                      <div>주요 주제</div>
                      <div>일반</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>아이콘</div>
                    <div>
                      <div>주요 주제</div>
                      <div>일반</div>
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
