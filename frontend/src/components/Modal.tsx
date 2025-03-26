import { ReactNode } from "react";

interface ModalProps {
  title?: string;
  description: ReactNode;
  buttons?: ButtonProps[];
  isOpen: boolean;
  onClose: () => void;
}

interface ButtonProps {
  label: string;
  textColor: "black" | "red" | "gray" | "green";
  onClick: () => void;
}

function Modal({
  title,
  description,
  buttons = [],
  isOpen,
  onClose,
}: ModalProps) {
  return (
    <>
      {isOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className=" rounded-xl w-70 bg-white  flex flex-col justify-between items-center">
            {title && <div className="font-bold text-lg pt-5">{title}</div>}
            <div className="text-center p-5  ">{description}</div>
            <div className=" w-full flex flex-col">
              {buttons.map((button, index) => {
                return (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className={`p-3 border-t font-semibold border-gray-300 text-sm active:bg-[#c7c7c744] rounded duration-100 ${
                      (button.textColor === "red" && "text-red-600") ||
                      (button.textColor === "green" && "text-green-600") ||
                      (button.textColor === "black" && "text-black") ||
                      (button.textColor === "gray" && "text-gray-500")
                    }`}
                  >
                    {button.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
