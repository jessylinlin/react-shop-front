import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import Layout from './Layout'
import ProductItem from './ProductItem'

export default function Product() {
    const { productId } = useParams<{productId: string}>()
    const dispatch = useDispatch()

    useEffect(() => {
         dispatch(getProductById({ productId }))
    }, [])
    
    const { product } = useSelector<AppState, ProductState>(state => state.product)

    return (
       <Layout title='商品名称' subTitle='商品描述'>
           <Row gutter={36}>
               <Col span="18">
                   <ProductItem product={product.result} showViewProduct={false}/>
                </Col>
               <Col span="6">2</Col>
           </Row>
       </Layout>
    )
}
