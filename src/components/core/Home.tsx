import React, { useEffect } from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import Search from './Search'
import { Col, Row, Typography } from 'antd'
import ProductItem from './ProductItem'
import { getProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'

const { Title } = Typography

const Home = () => {
    const { createdAt, sold } = useSelector<AppState, ProductState>(state => state.product)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct("createdAt"))
        dispatch(getProduct("sold"))  
    }, [])

    return (
        <Layout title='商城' subTitle='xxx'>
            <Search />
            <Title level={5}>最新上架</Title>
            <Row gutter={[16, 16]}> 
                {
                   createdAt.products.map((product) => (
                    <Col span="6">
                        <ProductItem product={product}/>
                    </Col>
                   )) 
                }
               
            </Row>
            <Title level={5}>最受欢迎</Title>
            <Row gutter={[16, 16]}>  
            {
                   sold.products.map((product) => (
                    <Col span="6" >
                        <ProductItem product={product}/>
                    </Col>
                   )) 
                }
            </Row>
        </Layout>
    )
}

export default Home
