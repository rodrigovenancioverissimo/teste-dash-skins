import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
  };
  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    else document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          data-testid='outside'
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'
        >
          <div
            className='bg-white xs:p-1 md:p-4 rounded-md shadow-md'
            ref={modalRef}
          >
            <div className='flex justify-end'>
              <button
                data-testid='close-button'
                className='text-gray-500 hover:text-gray-800 focus:outline-none'
                onClick={onClose}
              >
                <MdClose size='32' />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
