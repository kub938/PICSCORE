import { Share } from "lucide-react";
import processResult from "../../assets/ImageEval/process-result.svg";
import Button from "../../components/Button";
import testImage from "../../assets/ImageEval/test-image.jpg";

import {
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";

function ImageEvalResult() {
  const score = 84;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <img src={processResult} alt="결과" className="mb-5" />
      <div
        className="w-[95%] shadow p-3 rounded flex flex-col items-center"
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
        <div className="mb-3">혹시... 전문 사진작가?</div>
      </div>

      <div className="flex  gap-10 mt-8 mb-5">
        <Button color="white" width={30} height={10}>
          <MagnifyingGlassIcon width={15} />
          <div className="ml-2">자세히</div>
        </Button>
        <Button color="green" width={30} height={10}>
          <ArrowUpTrayIcon width={15} />
          <div className="ml-2">업로드</div>
        </Button>
      </div>
      <button className="cursor-pointer flex justify-center items-center gap-1 w-30  border border-pic-primary rounded-2xl text-pic-primary">
        <ShareIcon width={15} />
        <div>공유하기</div>
      </button>
    </div>
  );
}

export default ImageEvalResult;
