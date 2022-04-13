import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import Layout from '../core/Layout'
import { Divider, Select, Typography } from 'antd'
import { Order } from '../../store/models/order'
import moment from 'moment'

const { Title } = Typography

const Orders = () => {
    const { user, token } = isAuth() as Jwt

    const [orders, setOrders] = useState([])
    const mapStatus: string[] = [
        'Unpaid', 'Paid', 'Shipped', 'Completed', 'Cancelled'
    ]
    const showStatus = (status: string) => {
        switch (status) {
            case 'Unpaid':
                return '未付款'
            case 'Paid':
                return '已付款'
            case 'Shipped':
                return '运输中'
            case 'Completed':
                return '已完成'
            case 'Cancelled':
                return '已取消'
        }
    }

    async function getOrders() {
        let { data } = await axios.get(`${API}/order/list/${user._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        //假数据测试
        data = [
            {
              "status": "Cancelled",
              "_id": "5fa8cc8c64a54f7274578c36",
              "trade_no": "2.02011092200146e+27",
              "amount": 101.9,
              "address": "北京市海淀区创业大街",
              "products": [
                {
                  "_id": "5fa8cc8c64a54f7274578c37",
                  "count": 1,
                  "product": {
                    "_id": "5fa2c58ed6b0014c93906a99",
                    "name": "JavaScript权威指南（第6版）",
                    "price": 101.9
                  }
                }
              ],
              "user": {
                "_id": "5f9d6f70f75ae3c81541bcba",
                "name": "乔峰1"
              },
              "createdAt": "2020-11-09T04:58:52.234Z",
              "updatedAt": "2020-11-09T09:36:43.397Z",
              "__v": 0
            }
          ]

        setOrders(data)
    }
    
    useEffect(() => {
        getOrders()
    }, [])

    const getOrderCount = () => {
        if (orders.length > 0) {
            return `订单数量 ${orders.length}`
        }

        return ''
    }

    const handleChange = (orderId: string) => (status: string) => {
        axios.put(`${API}/order/status/${user._id}`, {
            orderId,
            status
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            getOrders()
        })
    }

    return (
        <Layout title='订单' subTitle={getOrderCount()}>
            {
                orders.map((item: Order) => (
                    <>
                        <Title level={4}>订单ID: {item._id}</Title>
                        <table style={{ width: "100%" }}>
                            <thead className="ant-table-thead">
                                <tr>
                                <th className="ant-table-cell">订单状态</th>
                                <th className="ant-table-cell">订单号</th>
                                <th className="ant-table-cell">总价</th>
                                <th className="ant-table-cell">创建时间</th>
                                <th className="ant-table-cell">邮寄地址</th>
                                <th className="ant-table-cell">客户姓名</th>
                                </tr>
                            </thead>
                            <tbody className="ant-table-tbody">
                                <tr className="ant-table-row">
                                    <td className="ant-table-cell">
                                        {showStatus(item.status)}
                                        <Select defaultValue={item.status} onChange={handleChange(item._id)}>
                                             {
                                                 mapStatus.map(status => (
                                                    <Select.Option value={status} key={status}>
                                                        {showStatus(status)}
                                                    </Select.Option>
                                                 ))
                                             }
                                        </Select>
                                    </td>
                                    <td className="ant-table-cell">
                                        {item.trade_no}
                                    </td>
                                    <td className="ant-table-cell">
                                        {item.amount}
                                    </td>
                                    <td className="ant-table-cell">
                                        {moment(item.createdAt).format('YYYY-MM-DD')}
                                    </td>
                                    <td className="ant-table-cell">
                                        {item.address}
                                    </td>
                                    <td className="ant-table-cell">
                                        {item.user.name}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ width: "100%" }}>
                            <thead className="ant-table-thead">
                                <tr>
                                <th className="ant-table-cell">商品名称</th>
                                <th className="ant-table-cell">商品价格</th>
                                <th className="ant-table-cell">商品数量</th>
                                <th className="ant-table-cell">商品ID</th>
                                </tr>
                            </thead>
                            <tbody className="ant-table-tbody">
                                {
                                    item.products.map(product => (
                                        <tr className="ant-table-row">
                                            <td className="ant-table-cell">
                                                {product.product.name}
                                            </td>
                                            <td className="ant-table-cell">
                                                {product.product.price}
                                            </td>
                                            <td className="ant-table-cell">
                                                {product.count}
                                            </td>
                                            <td className="ant-table-cell">
                                                {product.product._id}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Divider />
                    </>
                ))
            }
        </Layout>
    )
}

export default Orders
