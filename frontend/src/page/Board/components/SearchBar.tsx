import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useSearchPhotos } from "../../../hooks/useBoard";
import { useQuery } from "@tanstack/react-query";
import { friendApi } from "../../../api/friendApi";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  interface SearchFriendsResponse {
    message: string;
    nickName: string;
    profileImage: string;
    userId: number;
  }
  const useSearchFriends = (searchText: string) => {
    return useQuery<SearchFriendsResponse[]>({
      queryKey: ["search-friends", searchText],
      queryFn: async () => {
        if (!searchText || searchText.trim() === "") return [];
        const response = await friendApi.searchFriends(searchText);
        return response.data.data;
      },
      enabled: searchText.trim().length > 0,
    });
  };

  const [inputText, setInputText] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchNickname, setSearchNickname] = useState("");
  const searchResult = useSearchPhotos(searchKeyWord);
  const searchFriends = useSearchFriends(searchNickname);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputText && inputText.trim() !== "") {
      setSearchKeyWord(inputText);
    }
  };

  const activeInput = () => {
    setActive(true);
  };

  const deActiveInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(false);
  };

  // --------------여기서부터 친구검색-------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchNickname(inputText);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputText]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedText(inputText);
  //   }, 500);
  // });

  const users = searchFriends.data;

  return (
    <div className={`${active && "relative h-full"}`}>
      <div
        className="sticky  w-full h-12 flex justify-center items-center border-b border-b-gray-200 "
        onClick={activeInput}
      >
        <div className="flex w-full mx-3 justify-center items-center ">
          <MagnifyingGlassIcon width={20} className="mr-2" />
          <form onSubmit={handleSubmit} className="w-full ">
            <input
              value={inputText}
              onChange={(e) => handleChangeInput(e)}
              className={`
                relative
                ${
                  active ? "w-[86%]" : "w-[98%] duration-200"
                } bg-[#e9e9e9f5] h-8  rounded-lg px-2.5 active:bg-[#dddcdcf5] focus:outline-none `}
              placeholder="검색"
            />
            {active && (
              <span className="ml-3 cursor-pointer" onClick={deActiveInput}>
                취소
              </span>
            )}
          </form>
        </div>
      </div>
      {active && (
        <div className="absolute top-12 left-0 w-full h-full pt-2 bg-white ">
          {users &&
            users.length > 0 &&
            users.slice(0, 5).map((user, index) => (
              <div
                key={index}
                className="px-4 py-2 flex items-center cursor-pointer active:bg-gray-100"
                onClick={() => {
                  navigate(`/user/profile/${user.userId}`);
                }}
              >
                <div className="rounded-full border-[#c1c0c0] border w-11 h-11 mr-3">
                  <img
                    src={user.profileImage}
                    alt="프로필 이미지"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{user.nickName}</div>
                  <div className="text-[#737373]">{user.message}</div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
