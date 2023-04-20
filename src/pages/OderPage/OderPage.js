import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseProduct,
  increaseProduct,
  removeOrderProduct,
  setOrderItemsSelector,
  setOrderSelectorAll,
} from "../../redux/orderSlice/orderSlice";

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderProducts = useSelector((state) => state.orderReduce);
  const idProductSelector = orderProducts.orderItemsSelector?.map(
    (e) => e.product
  );

  const priceMemo = useMemo(() => {
    const result = orderProducts.orderItemsSelector.reduce((total, e) => {
      return total + e.price * e.amount;
    }, 0);
    return result;
  }, [orderProducts]);
  const totalPriceMemo = useMemo(() => {
    if (priceMemo > 10000000) {
      return priceMemo - (priceMemo * 5) / 100;
    }
    return 0;
  }, [priceMemo]);

  const handleAddOrder = () => {
    navigate("/payment", {
      state: {
        totalPrice: totalPriceMemo,
      },
    });
  };

  return (
    <div className="flex px-20 py-8">
      <div className="w-4/6">
        <div className="flex  bg-white p-3 rounded-lg">
          <div className="w-[40%] flex">
            <input
              type="checkbox"
              checked={
                orderProducts.orderItems.length ===
                orderProducts.orderItemsSelector.length
              }
              onChange={() => dispatch(setOrderSelectorAll())}
            />
            <span className="ml-1">
              Tất cả ({orderProducts?.orderItems?.length} sản phẩm)
            </span>
          </div>
          <div className="w-[60%] grid grid-cols-4 text-center">
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
            <span className="cursor-pointer">Xóa</span>
          </div>
        </div>
        {/* ------------ */}
        <div>
          {orderProducts?.orderItems?.map((e) => (
            <div className="flex  bg-white p-3 justify-between rounded-lg mt-3 items-center">
              <div className="w-[40%] flex">
                <input
                  type="checkbox"
                  checked={idProductSelector.includes(e?.product)}
                  onChange={() =>
                    dispatch(setOrderItemsSelector({ orderItemsSelector: e }))
                  }
                />
                <img
                  className="ml-1 h-[50px] w-[50px] object-cover mx-2"
                  src={e?.image}
                  alt=""
                />
                <span className="w-[70%] truncate">{e?.name}</span>
              </div>
              <div className="w-[60%] grid grid-cols-4 text-center">
                <span>{e?.price}</span>
                <div className="flex border-solid  border-[1px] border-primary w-fit ">
                  <span
                    onClick={() =>
                      dispatch(decreaseProduct({ product: e?.product }))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H6"
                      />
                    </svg>
                  </span>
                  <span className="mx-4">{e?.amount}</span>
                  <span
                    onClick={() =>
                      dispatch(increaseProduct({ product: e?.product }))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>
                </div>
                <span>{e?.amount * e?.price}</span>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch(removeOrderProduct({ product: e?.product }))
                  }
                >
                  Xóa
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/6 pl-5">
        <div className="bg-white p-3">
          <div className="flex justify-between items-center">
            <span>Tạm Tính</span>
            <span>{priceMemo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Giảm giá</span>
            <span>{priceMemo > 10000000 ? "5%" : "0"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Thuế</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex bg-white p-3 justify-between items-center mt-1">
          <span>Tổng Tiền</span>
          <span className="text-lg text-red font-semibold">
            {totalPriceMemo} VND
          </span>
        </div>
        <div
          className="w-[60%] mt-3 py-1 rounded-sm flex justify-center mx-auto bg-red text-white font-normal"
          onClick={handleAddOrder}
        >
          Mua hàng
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
