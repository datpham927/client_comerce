import { useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation()
  const orderProducts = location.state;
  return (
    <>
      <div className="p-4   border-solid border-[1px] ">
        <div className="flex p-3 bg-teal-100">
          <span className="text-amber-700 ">{orderProducts.paymentMethod}</span>
          Giao hàng tiết kiệm
        </div>
      </div>

      <div>
        {orderProducts?.orderItems?.map((e) => (
          <div className="flex  bg-white p-3 justify-between rounded-lg mt-3 items-center">
            <div className="w-[50%] flex">
              <img
                className="ml-1 h-[50px] w-[50px] object-cover mx-2"
                src={e?.image}
                alt=""
              />
              <span className=" truncate">{e?.name}</span>
            </div>
            <div className="grid grid-cols-4 text-center">
              <span className="whitespace-nowrap">giá tiền : {e?.price}</span>
            </div>
            <div className="grid grid-cols-4 text-center">
              <span>Số lượng : {e?.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderSuccess;
