import { useEffect, useState } from "react";
import { useGetPhotos } from "../../hooks/useBoard";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function Board() {
  // const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPhotos();

  // console.log(data?.pages[0].data.data.photos);
  const photos = data?.pages[0].data.data.photos;
  if (isLoading) {
    <div>로딩중...</div>;
  }
  if (error) {
    console.log(error);
    <div>에러 났어요</div>;
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("보이나?????뭐임");
      console.log(data?.pages[0].data.data);

      fetchNextPage();
    }
  }, [inView]);

  const navigatePhotoDetail = (photoId: number) => {
    navigate(`/photo/${photoId}`);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="sticky border w-full h-15"></div>
      <div className="border  overflow-y-auto flex-1 mb-16">
        {Array.from({ length: 8 }, (_, rowIndex) => (
          <div
            key={rowIndex}
            className={`border flex w-full ${
              rowIndex === 7 ? "border-red-600" : "border-black"
            }`}
            ref={rowIndex === 7 ? ref : null}
          >
            {photos &&
              photos
                .slice(rowIndex * 3, rowIndex * 3 + 3)
                .map((photo, index) => (
                  <div
                    key={index}
                    className={`max-w-1/3 aspect-square ${
                      index === 2 ? "" : "mr-0.5 mt-0.5"
                    }`}
                    onClick={() => navigatePhotoDetail(photo.id)}
                  >
                    <img
                      src={photo.imageUrl}
                      alt="이미지 입니다."
                      className="h-full w-full"
                    />
                  </div>
                ))}
          </div>
        ))}
        {isLoading && <h1>로딩중...</h1>}
      </div>
    </div>
  );
}

export default Board;
