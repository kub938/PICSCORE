import processEval from "../../assets/ImageEval/process-upload.svg";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Button";

function ImageEval() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-13">
        <img src={processEval} alt="" />
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold mb-1">사진을 올려주세요!</div>
        <div className="mb-5">멋진 사진을 평가해 드립니다.</div>
      </div>
      <div
        className="w-92 h-92 rounded-md border mb-13 border-black flex flex-col items-center justify-center gap-10"
        style={{ borderStyle: "dashed", borderSpacing: "40px" }}
      >
        <div className="bg-white  w-20 h-20 rounded-full flex justify-center">
          <ArrowUpTrayIcon className="text-pic-primary w-10 " />
        </div>
        <div className="text-lg font-bold text-[#0000007a]">
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
