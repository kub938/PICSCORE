import { XMarkIcon } from "@heroicons/react/24/outline";

interface ImageEvalDetailProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

function ImageEvalDetail({ isModalOpen, closeModal }: ImageEvalDetailProps) {
  const score = 89;
  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex flex-col justify-center"
          onClick={closeModal}
        >
          <div className="bg-gray-100 mx-3 rounded ">
            <div className="flex justify-between p-4">
              <div className="text-lg ">
                <span className="text-pic-primary">PIC</span>
                <span>SCORE</span>
              </div>
              <div>
                <XMarkIcon color="black" width={30} />
              </div>
            </div>

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
              <div>요소 분석</div>
              <div className="border-y-2  border-gray-200 h-80">그래프</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageEvalDetail;
