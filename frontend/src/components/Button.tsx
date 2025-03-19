interface ButtonProps {
  color: "white" | "green";
  width: number;
  height: number;
  content: string;
  textSize?: "md" | "lg" | "xl" | "2xl";
  onClick?: () => void;
}

function Button({
  color,
  width,
  height,
  content,
  textSize,
  onClick,
}: ButtonProps) {
  const colorClasses = {
    green:
      "bg-pic-primary hover:bg-[#7cc948] active:bg-[#66a13e] text-[#fafafa]",
    white:
      "bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 border border-gray-300",
  };

  return (
    <button
      className={`w-${width} h-${height} px-5 py-3 rounded-sm shadow-[0px_0px_5px_-2px_gray]
      touch-action-manipulation transition-colors duration-150 cursor-pointer
      flex items-center justify-center text-center text-${textSize}
      ${colorClasses[color]}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
