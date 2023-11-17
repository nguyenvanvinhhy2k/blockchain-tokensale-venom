
import Modal from "../Modal";

type IProps = {
  isLoadingClaim: boolean
  handleCancel: any
}
export default function LoadingClaim({ isLoadingClaim, handleCancel }: IProps) {
  return (
    <>
      <Modal
        display
        open={isLoadingClaim}
        handleCancel={handleCancel}
        confirmButtonTitle="Confirm"
        className="xl:w-[25%] lg:w-[45%] sm:w-[65%] w-[90%]"
      >
        <div className="px-[20px] py-[10px] ">
          <div className="loading-cpm min-h-[10vh] flex justify-center items-center flex-col text-white mt-[30px]">
            <div className="animate-spin h-12 w-12 border-4 rounded-[50%] border-orange-500 border-t-4 border-t-[#ffffff]" />
            <p className="text-[18px] my-[15px]">Transfer in progress</p>
            <p className="text-[18px] mb-[30px] text-center">Please wait, while we make final touches</p>
          </div>
        </div>
      </Modal>
    </>
  )
}
