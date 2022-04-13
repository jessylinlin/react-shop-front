import { Button } from 'antd'
import axios from 'axios'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { CartItem } from '../../helpers/cart'
import { Jwt } from '../../store/models/auth'

interface Props {
    totalPrice: number,
    address: string,
    cart: CartItem[]
}

const Pay: FC<Props> = ({totalPrice, cart, address}) => {
    const getPayUrl = () => {
        axios.post(`${API}/alipay`, {
            totalAmount: totalPrice,
                subject: 'test订单标题',
                body: 'test订单描述',
                 // 服务器端要求的必填参数
                products: cart.map(item => ({
                    count: item.count,
                    product: item._id
                })),
                address,
                userId: (isAuth() as Jwt).user._id 
        }).then(res => {
            //支付跳转地址
            window.location.href = res.data.result
        })
    }

    const showButton = () => {
        return isAuth() 
        ? <Button onClick={getPayUrl}>提交订单</Button>
        : <Button>
            <Link to='/signin'>去登录</Link>
        </Button>
    }

    return <>
        {
             showButton()
        }
    </>
}

export default Pay
