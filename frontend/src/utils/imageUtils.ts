/**
 * 이미지 파일을 압축하는 유틸리티 함수
 *
 * @param file 압축할 이미지 파일
 * @param maxSizeInMB 최대 파일 크기 (MB)
 * @returns 압축된 파일 또는 원본 파일
 */
export const compressImageFile = async (
  file: File,
  maxSizeInMB: number = 5
): Promise<File> => {
  // 파일 크기가 최대 크기 이하면 그대로 반환
  if (file.size <= maxSizeInMB * 1024 * 1024) {
    return file;
  }

  // 이미지 압축
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        // 원본 비율 유지하며 해상도 조정
        let width = img.width;
        let height = img.height;

        // 큰 이미지는 비율을 유지하며 크기 줄이기
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;

        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }

        if (height > MAX_HEIGHT) {
          width = (width * MAX_HEIGHT) / height;
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // 압축률 조정 (0.7은 70% 품질을 의미)
        const quality = 0.7;
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("이미지 압축 실패"));
              return;
            }

            // Blob을 File로 변환
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => {
        reject(new Error("이미지 로드 실패"));
      };

      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        reject(new Error("파일 읽기 실패"));
      }
    };

    reader.onerror = () => {
      reject(new Error("파일 읽기 실패"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * 타임어택용 이미지 처리 함수
 * - 이미지 압축
 * - 메타데이터 추가
 *
 * @param file 원본 이미지 파일
 * @param topic 타임어택 주제
 * @returns 처리된 이미지 파일과 메타데이터
 */
export const processTimeAttackImage = async (
  file: File,
  topic: string
): Promise<{
  processedFile: File;
  metadata: {
    captureTime: number;
    originalSize: number;
    processedSize: number;
    topic: string;
  };
}> => {
  try {
    // 현재 타임스탬프 기록 (지연 업로드 확인용)
    const captureTime = Date.now();

    // 원본 파일 크기 저장
    const originalSize = file.size;

    // 이미지 압축 (크기가 큰 경우)
    const processedFile = await compressImageFile(file, 5); // 최대 5MB

    return {
      processedFile,
      metadata: {
        captureTime,
        originalSize,
        processedSize: processedFile.size,
        topic,
      },
    };
  } catch (error) {
    console.error("이미지 처리 중 오류 발생:", error);
    throw new Error("이미지 처리 실패");
  }
};

/**
 * 이미지 파일 유효성 검사
 *
 * @param file 검사할 이미지 파일
 * @returns 유효성 검사 결과
 */
export const validateImageFile = (
  file: File
): {
  valid: boolean;
  message?: string;
} => {
  // 파일 타입 확인
  if (!file.type.startsWith("image/")) {
    return {
      valid: false,
      message: "이미지 파일만 업로드 가능합니다.",
    };
  }

  // 파일 크기 확인 (10MB 제한)
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      message: "파일 크기는 최대 10MB까지 가능합니다.",
    };
  }

  // 파일 확장자 확인
  const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (!validExtensions.includes(extension)) {
    return {
      valid: false,
      message: "JPG, PNG, GIF, WEBP 형식만 지원합니다.",
    };
  }

  return { valid: true };
};
