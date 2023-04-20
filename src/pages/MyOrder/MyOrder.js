/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteOrder, getAllOrder } from '../../service'
import { useNavigate } from 'react-router-dom'

export const MyOrder = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.userReduce)
    const [dataOrder, setDataOrder] = useState({})
    const [loadData, setLoadData] = useState(false)
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllOrder(user?.access_token)
            setDataOrder(response || {})
        }
        fetchApi()
    }, [loadData])


    const handleDeleteOrder = (e, item) => {
        e.preventDefault()
        const fetchApi = async () => {
            const response = await deleteOrder(user?.access_token, item)
            if (response.status === "OK") {
                setLoadData((e) => !e)
            }
        }
        fetchApi()
    }
    return (

        <div className='w-full '>
            <h1 className='flex w-full justify-center text-3xl py-3'>Đơn hàng của tôi</h1>
            <div className='flex flex-col gap-4 w-2/3 mx-auto '>
                {dataOrder?.data?.map(item =>
                    <div className='w-full shadow-card p-3'>
                        <h1 className='font-semibold'>Trạng thái</h1>
                        <div className='flex gap-1 text-sm shrink-0'>
                            <span className='text-orange-500'>Thanh toán :</span>
                            <span> {item?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</span>
                        </div>
                        <div className='flex gap-1 text-sm shrink-0'>
                            <span className='text-orange-500'>Giao hàng :</span>
                            <span> {item?.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}</span>
                        </div>


                        <div className='w-full  my-3 border-solid   border-t-[1px]  border-b-[1px] border-stone-300'>
                            {item?.orderItems?.map(e => <div className="flex   p-3 justify-between  items-center">
                                <div className="w-[50%] flex">
                                    <img
                                        className="ml-1 h-[50px] w-[50px] object-cover mx-2"
                                        src={e?.image}
                                        alt=""
                                    />
                                    <span className=" truncate">{e?.name}</span>
                                </div>
                                <div className="flex">
                                    <span className="whitespace-nowrap">giá tiền : {e?.price}</span>
                                </div>

                            </div>

                            )}
                        </div>
                        <div className='flex flex-col items-end my-4'>
                            <div className='flex gap-1'>
                                <span className='text-orange-400 font-medium'>Tổng tiền :</span>
                                <span className='text-sm'>{item.totalPrice}</span>
                            </div>
                        </div>
                        <div className='flex justify-end gap-4'>
                            <button className="flex px-2 py-1 border-solid border-blue-500 border-[1px] rounded-sm  text-sm"
                                onClick={(e) => handleDeleteOrder(e, item)}
                            >Hủy đơn hàng</button>
                            <button className="flex px-2 py-1 border-solid border-blue-500 border-[1px] rounded-sm  text-sm"
                                onClick={(e) => {
                                    e.preventDefault()
                                    navigate("/order-detail", {
                                        state: {
                                            orderId: item._id
                                        }
                                    })
                                }}

                            >Xem chi tiết</button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}
