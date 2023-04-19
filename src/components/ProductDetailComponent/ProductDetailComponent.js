import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setOrderProduct } from "../../redux/orderSlice/orderSlice";
import { getDetailProduct } from "../../service";

function ProductDetailComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const idProduct = location?.state;
  const [quantity, setQuantity] = useState(1);
  const [detailProduct, setDetailProduct] = useState({});
  const user = useSelector((state) => state.userReduce);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getDetailProduct(idProduct);
      setDetailProduct(data.product);
    };

    fetchApi();
  }, [idProduct]);

  const handleAddProduct = () => {
    if (!user.id) {
      navigate("/sign-in", { state: idProduct });
    } else {
      dispatch(
        setOrderProduct({
          orderItems: {
            name: detailProduct?.name,
            amount: quantity,
            image: detailProduct?.image,
            price: detailProduct?.price,
            product: detailProduct?._id,
            discount: detailProduct?.discount,
          },
        })
      );
    }
  };

  return (
    <div className="bg-white mx-5 p-4 rounded-lg flex">
      <div className="w-2/6">
        <div className="w-full">
          <img className="w-full" src={detailProduct?.image} alt="" />
        </div>
        {/* ----------- */}
        {/* <div className=" grid grid-cols-5 gap-2 my-4">
          <div className="w-full">
            <img
              className="w-full"
              src="https://salt.tikicdn.com/cache/100x100/ts/product/d8/83/93/a0ba09d64fd98ed9be6d2fb5ae11e162.png.webp"
              alt=""
            />
          </div>
          <div className="w-full">
            <img
              className="w-full"
              src="https://salt.tikicdn.com/cache/100x100/ts/product/d8/83/93/a0ba09d64fd98ed9be6d2fb5ae11e162.png.webp"
              alt=""
            />
          </div>
          <div className="w-full">
            <img
              className="w-full"
              src="https://salt.tikicdn.com/cache/100x100/ts/product/d8/83/93/a0ba09d64fd98ed9be6d2fb5ae11e162.png.webp"
              alt=""
            />
          </div>
          <div className="w-full">
            <img
              className="w-full"
              src="https://salt.tikicdn.com/cache/100x100/ts/product/d8/83/93/a0ba09d64fd98ed9be6d2fb5ae11e162.png.webp"
              alt=""
            />
          </div>
          <div className="w-full">
            <img
              className="w-full"
              src="https://salt.tikicdn.com/cache/100x100/ts/product/d8/83/93/a0ba09d64fd98ed9be6d2fb5ae11e162.png.webp"
              alt=""
            />
          </div>
        </div> */}
      </div>
      <div className="w-4/6 pl-3">
        <h2 className="text-xl">{detailProduct?.name}</h2>
        <div className="flex mx-2 mt-2">
          <div className="flex text-sm">
            <span className="text-amber-300 mx-2">
              <ion-icon
                name="star"
                role="img"
                class="md hydrated"
                aria-label="star"
              ></ion-icon>
            </span>
            <span className="text-amber-300 mx-2">
              <ion-icon
                name="star"
                role="img"
                class="md hydrated"
                aria-label="star"
              ></ion-icon>
            </span>
            <span className="text-amber-300 mx-2">
              <ion-icon
                name="star"
                role="img"
                class="md hydrated"
                aria-label="star"
              ></ion-icon>
            </span>
            <span className="text-amber-300 mx-2">
              <ion-icon
                name="star"
                role="img"
                class="md hydrated"
                aria-label="star"
              ></ion-icon>
            </span>
            <span className="text-amber-300 mx-2">
              <ion-icon
                name="star"
                role="img"
                class="md hydrated"
                aria-label="star"
              ></ion-icon>
            </span>
          </div>
          <div className="text-xs text-neutral-600">
            Đã bán {detailProduct?.sold}
          </div>
        </div>
        <div className="text-3xl">{detailProduct?.price}</div>
        <div>
          <span>Giao đến</span>
          <span className="text-primary mx-1 cursor-pointer ">
            Q. Hải Châu, P. Hải Châu I, Đà Nẵng -
          </span>
          <span className="cursor-pointer">Đổi địa chỉ</span>
        </div>
        <div>
          <h2 className="my-4">Số lượng</h2>
          <div className="flex border-solid  border-[1px] border-primary w-fit ">
            <span onClick={() => setQuantity((i) => i - 1)}>
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
            <span className="mx-4">{quantity}</span>
            <span onClick={() => setQuantity((i) => i + 1)}>
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
        </div>
        {/* -------------- */}
        <button
          className="w-[240px] my-4 py-1 bg-rose-500  border-solid  text-white"
          onClick={handleAddProduct}
        >
          Chọn mua
        </button>
      </div>
    </div>
  );
}

export default ProductDetailComponent;
