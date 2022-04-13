import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Empty, Row, Space } from 'antd'
import Checkbox from './Checkbox'
import { Radiobox } from './Radiobox'
import { filterProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import ProductItem from './ProductItem'

const Shop = () => {
    const state = useSelector(state => state)
    //存储用户筛选
    const [filters, setFilters] = useState<{category: string[], price: number[]}>({
        category: [],
        price: []
    })


    const [skip, setSkip] = useState<number>(0)

    const dispatch = useDispatch()

    useEffect(() => {
        //筛选条件时 skip清0
         setSkip(0)
    }, [filters])

    useEffect(() => {
        dispatch(filterProduct({skip, filters}))
    }, [filters, skip])

    const product = useSelector<AppState, ProductState>(state => state.product)

    const filterDom = () => (
        <>
          <Space size="middle" direction='vertical'>
            <Checkbox 
                handleFilter={(filter: string[]) => {
                    setFilters({...filters, category: filter})
                }}
            />
            <Radiobox
                handleFilter={(filter: number[]) => {
                    setFilters({
                        ...filters,
                        price: filter
                    })
                }}
            />
          </Space>
        </>
    )

    const productDom = () => (
        <Row gutter={[16,16]}>
            {
                product.filter.result.data.map(item => (
                    <Col key={item._id} span="6">
                        <ProductItem product={item}/>
                    </Col>
                ))
            }
        </Row>
    )

    const loadMoreBtn = () => {
          return (
              <Row>
                  { product.filter.result.size >= 4 &&<Button onClick={loadMore}>加载更多</Button>}
              </Row>
          )
    }

    const loadMore = () => {
        setSkip(skip+4)
    }

    const noData = () => {
        return <>
            {
                product.filter.result.size === 0 && <Row><Empty /></Row>
            }
        </>
    }
    return (
        <div>
            <Layout title='商城' subTitle='挑选商品'>
                <Row>
                    <Col span="4">
                        {filterDom()}
                    </Col>
                    <Col span="20">
                        {productDom()}
                        {loadMoreBtn()}
                        {noData()}
                    </Col>
                </Row>
            </Layout>
        </div>
    )
}

export default Shop
