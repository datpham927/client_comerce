import React, { useEffect, useMemo, useState } from 'react'
import { getDetailOrder } from '../../service'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertPrice } from '../../utils/priceDiscount';

export const DetailOrderPost = () => {
    const location = useLocation()
    const [dataOrder, setDataOrder] = useState({})
    const { orderId } = location.state
    const user = useSelector(state => state.userReduce)
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailOrder(user.access_token, orderId)
            if (response) {
                setDataOrder(response?.data)
            }
        }
        fetchApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId])

    const { orderItems, shippingAddress, paymentMethod,
        itemsPrice, shippingPrice, totalPrice, isPaid } = dataOrder




    return (
        <div className='w-[80%] mx-auto my-4'>
            <h1 className='text-2xl font-normal'>Chi tiết đơn hàng</h1>
            <div className='flex my-4 justify-between '>
                <div className='w-[30%]'>
                    <h2 className='text-sm uppercase'>Địa chỉ người nhận</h2>
                    <div className='my-3 p-2 bg-white  rounded-md  text-[13px]'>
                        <div className='flex gap-2'>
                            <span>Địa chỉ:</span>
                            {shippingAddress && <span>{shippingAddress[0]?.city}</span>}
                        </div>
                        <div className='flexgap-2'>
                            <span>Liên hệ:</span>
                            <span>{user?.email}</span>
                        </div>
                    </div>
                </div>
                <div className='w-[30%]'>
                    <h2 className='text-sm uppercase'>Hình thức giao hàng</h2>
                    <div className='my-3 p-2 bg-white  rounded-md text-[13px]'>
                        <div className='flex gap-2 '>
                            {paymentMethod && <span className='text-orange-500 font-medium'>{paymentMethod}</span>}
                            <span>Giao hàng tiết kiệm</span>
                        </div>
                        <div className='flex gap-2'>
                            <span>Phí giao hàng:</span>
                            <span>{shippingPrice}</span>
                        </div>
                    </div>
                </div>
                <div className='w-[30%]'>
                    <h2 className='text-sm uppercase'>Hình thức thanh toán</h2>
                    <div className='my-3 p-2 bg-white text-[13px]'>

                        <div className='flex  flex-col'>
                            <span>Thanh toán khi nhận hàng</span>
                            <span className='text-blue-600'> {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"40%"} >Sản phẩm</TableCell>
                            < TableCell sx={{ whiteSpace: 'nowrap' }}> Giá</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }} >Số Lượng</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}  >Giảm giá</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}  >Tạm tính</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}  >Phí vận chuyển</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}  >Tổng cộng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderItems?.map((e) => (
                            <TableRow
                                key={e.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >
                                    <div className="flex items-center w-[300px]">
                                        <img
                                            className="ml-1 h-[50px] w-[50px] object-cover mx-2"
                                            src={e?.image}
                                            alt=""
                                        />
                                        <span className="truncate">{e?.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}  > {e?.price}</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}  >{e?.amount} </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}  >{e?.discount}%</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}  >{e?.discount ? convertPrice(e?.price, e?.amount, e?.discount) : "0"} VND</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}  >{shippingPrice ? shippingPrice : "0"} VND</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}  >{shippingPrice ? convertPrice(e?.price, e?.amount, e?.discount)
                                    + shippingPrice : convertPrice(e?.price, e?.amount, e?.discount)} VND
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='flex justify-end items-center my-4 pr-4'>
                <span>Tổng tiền :</span>
                <span className='text-orange-600'>{totalPrice}</span>
            </div>
        </div >
    )
}
