import { ReactNode, useEffect, useRef } from "react";
import { Close } from "./icons/Close";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      // Check if click is on the backdrop
      console.log("click");
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md"
      onClick={handleBackdropClick}
    >
      <div
        className="relative max-w-[600px] min-w-[300px] bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}

          <button
            className="hover:text-rebels cursor-pointer"
            onClick={onClose}
          >
            <Close />
          </button>
        </div>

        {children}
      </div>
    </dialog>
  );
}
