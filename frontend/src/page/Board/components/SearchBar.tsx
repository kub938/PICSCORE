import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useSearchPhotos } from "../../../hooks/useBoard";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const searchResult = useSearchPhotos(searchKeyWord);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputText && inputText.trim() !== "") {
      setSearchKeyWord(inputText);
    }
  };

  console.log(searchResult);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedText(inputText);
  //   }, 500);
  // });
  return (
    <>
      <div className="sticky  w-full h-15 flex justify-center items-center ">
        <div className="flex w-full mx-4 justify-center items-center">
          <MagnifyingGlassIcon width={20} className="mr-2" />
          <form onSubmit={handleSubmit} className="w-full">
            <input
              value={inputText}
              onChange={(e) => handleChangeInput(e)}
              className="bg-[#e9e9e9f5] w-[95%] h-8  rounded-lg px-2.5 active:bg-[#dddcdcf5] focus:outline-none"
              placeholder="검색"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
