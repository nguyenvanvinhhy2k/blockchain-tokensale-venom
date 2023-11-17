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
  hidden?: boolean
}

const Modal = ({
  display,
  open, 
  title,
  children,
  handleConfirm,
  key,
  handleCancel,
  confirmButtonTitle = 'Add',
  className = 'w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4',
  disabled = false,
}: ModalProps) => {
  if (typeof window === 'object') {
    // Check if document is finally loaded
    return ReactDOM.createPortal( 
      <React.Fragment>
          <div className={`fixed w-screen h-screen left-0 right-0 bottom-0 transition-colors top-0 flex justify-center items-center z-[1000] text-[#fff] ${open ? "visible bg-black/20" : "invisible"}`}>
            <div
              className="bg-black/60 absolute top-0 left-0 right-0 bottom-0 h-full w-full z-50"
            />
            <div className={`bg-[#141B1D] rounded-[15px] transition-all duration-350 ease-linear shadow-md overscroll-y-hidden z-[60] ${className} ${open ? "translate-y-6 opacity-100" : "translate-y-0 opacity-0"}`}>
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
              <div
                className={`${display ? 'hidden' : 'flex'
                  } justify-between gap-2 items-center p-3 mb-[10px]`}
              >
                  <div className="cursor-pointer rounded-[15px] bg-bgOpacity w-full h-full py-[12px]" onClick={() => handleCancel && handleCancel()}>
                     <p className='text-white text-center font-semibold text-[18px]'>Cancel</p>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 w-full rounded-[15px] align-top text-[18px] font-semibold text-white  py-[12px] bg-bgOpacity "
                    onClick={handleConfirm}
                    disabled={disabled}
                  >
                    {confirmButtonTitle}
                  </button>
              </div>
            </div>
          </div>
      </React.Fragment>,
      document.body,
      key
    )
  }
  return null
}

export default Modal
