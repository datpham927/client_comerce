import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

import { OrderCreate } from "../../service";

function PaymentPage() {
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState("FAST");
    const [payment, setPayment] = useState(true);
    const [paypalScript, setPaypalScript] = useState(false);
    const location = useLocation();
    const orderProducts = useSelector((state) => state.orderReduce);
    const user = useSelector((state) => state.userReduce);
    const handleOder = () => {
        const fetchApi = async () => {
            await OrderCreate(
                {
                    orderItems: orderProducts.orderItemsSelector,
                    shippingAddress: [
                        {
                            fullName: user.name,
                            address: user.address,
                            city: "abc",
                            phone: user.phone,
                        },
                    ],
                    paymentMethod: paymentMethod,
                    itemsPrice: "111111",
                    shippingPrice: "20000",
                    taxPrice: "22222",
                    totalPrice: location.state.totalPrice,
                },
                user.access_token
            );
        };
        navigate("/order-success", {
            state: {
                paymentMethod,
                orderItems: orderProducts.orderItems
            }
        })
        fetchApi();
    };

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

    const handlePaypalScript = () => {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = `https://www.paypal.com/sdk/js?client-id=AT1ETPmUnrl76MQemHoPuyj4fcfvErWDIFwwGKOIiFDr3naPhue7czGMapqZoGYqrTBZBcZU_AaaMZiM`
        script.async = true
        script.onload = () => {
            setPaypalScript(true)
        }
        document.body.appendChild(script)
    }
    useEffect(() => {
        handlePaypalScript()
    }, [])
    console.log("paypalScript", paypalScript);


    return (
        <div className="flex px-20 py-8">
            <div className="w-4/6">
                <h1 className="my-3">Phương thức giao hàng</h1>
                <div className="p-4 bg-cyan-50 border-solid border-[1px] border-sky-300 rounded-sm">
                    <div className="flex py-3">
                        <input
                            type="radio"
                            checked={paymentMethod === "FAST"}
                            onChange={() => setPaymentMethod("FAST")}
                        />
                        <span className="text-amber-700  font-semibold  mx-2"> FAST</span>
                        Giao hàng tiết kiệm
                    </div>
                    <div className="flex py-3">
                        <input
                            type="radio"
                            checked={paymentMethod === "GO_JEK"}
                            onChange={() => setPaymentMethod("GO_JEK")}
                        />
                        <span className="text-amber-700 font-semibold mx-2"> GO_JEK</span>
                        Giao hàng tiết kiệm
                    </div>
                </div>
                <h1 className="my-3">Phương thức thanh toán</h1>
                <div className="p-4 bg-cyan-50 border-solid border-[1px] border-sky-300 rounded-sm">
                    <div className="flex py-3 cursor-pointer" onClick={() => setPayment(true)}>
                        <input type="radio" checked={payment} />
                        <span className="text-amber-700  font-semibold  mx-2">
                            Thanh toán tiền mặt khi nhận hàng
                        </span>
                    </div>
                    <div className="flex py-3 cursor-pointer" onClick={() => setPayment(false)}>
                        <input type="radio" checked={payment === false} />
                        <span className="text-amber-700  font-semibold  mx-2">
                            Thanh toán bằng tiền mặt
                        </span>
                    </div>
                </div>
                {/* ------------ */}
            </div>
            <div className="w-2/6 pl-5">
                <div className="bg-white p-3">
                    <div className="flex justify-between items-center">
                        <span className="flex-shrink-0 ">Địa chỉ</span>
                        <span className="text-primary text-lg truncate ml-2">
                            {user.address}
                        </span>
                    </div>
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

                {
                    !payment ?
                        <PayPalButton
                            amount="0.01"
                            currency="USD"
                            onSuccess={(details, data) => {
                                alert("Transaction completed by " + details.payer.name.given_name);
                            }}
                            onError={(err) => {
                                console.log(err);
                            }}
                        />
                        :

                        <div
                            onClick={handleOder}
                            className="w-[60%] mt-3 py-1 rounded-sm flex justify-center mx-auto bg-red text-white font-normal"
                        >
                            Đặc hàng
                        </div>
                }
            </div>
        </div>
    );
}

export default PaymentPage;
