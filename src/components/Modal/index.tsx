import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  display?: boolean
  open: boolean
  title?: string
  children?: JSX.Element | undefined | Array<JSX.Element> | string
  key?: string
  handleConfirm?: any
  handleCancel?: () => void
  confirmButtonTitle?: string
  className?: string
  disabled?: boolean
  hidden?: number
}

const Modal = ({
  open, 
  title,
  children,
  key,
  className = 'w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4'
}: ModalProps) => {
  if (typeof window === 'object') {
    // Check if document is finally loaded
    return ReactDOM.createPortal(
      <React.Fragment>
        {open && (
          <div className="fixed w-screen h-screen left-0 right-0 bottom-0 top-0 flex justify-center items-center z-[1000] text-[#fff]">
            <div
              className="bg-black/60 absolute top-0 left-0 right-0 bottom-0 h-full w-full z-50"
            />
            <div className={`bg-[#141B1D] rounded-[15px] shadow-md overscroll-y-hidden z-[60] ${className}`}>
              <div className="flex justify-between items-center p-[20px] pb-0">
                <p className="sm:text-[30px] font-semibold text-[20px]">{title}</p>
              </div>
              <div className="">
                {typeof children === 'string' ? (
                  <p className="sm:text-medium">{children}</p>
                ) : (
                  children
                )}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>,
      document.body,
      key
    )
  }
  return null
}

export default Modal
