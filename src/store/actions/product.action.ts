import { type } from "os"
import { Product } from "../models/product"

export const GET_PRODUCT = "GET_PRODUCT"
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS"

//sortBy=createdAt&order=asc&limit=10
//定义接口
export interface GetProductAction {
    type: typeof GET_PRODUCT,
    sortBy: string,
    order: string,
    limit: number
}

export interface GetProductSuccessAction {
    type: typeof GET_PRODUCT_SUCCESS,
    sortBy: string,
    payload: Product[]
}

//action creator
export const getProduct = (
    sortBy: string,
    order: string = 'desc',
    limit: number = 10
):GetProductAction => ({
     type: GET_PRODUCT,
     sortBy,
     order,
     limit,
})

export const getProductSuccess = (
    payload: Product[],
    sortBy: string
):GetProductSuccessAction => ({
     type: GET_PRODUCT_SUCCESS,
     payload,
     sortBy
})

/**
 * 搜索商品
 */
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const SEARCH_PRODUCT_SUCCESS = 'SEARCH_PRODUCT_SUCCESS'

export interface SearchProductAction {
    type: typeof SEARCH_PRODUCT,
    payload: {
        category: string,
        search: string
    }
}

export interface SearchProductSuccessAction {
    type: typeof SEARCH_PRODUCT_SUCCESS,
    products: Product[]
}

export const searchProduct = (
    payload: {
        category: string,
        search: string
    }
): SearchProductAction => ({
    type: SEARCH_PRODUCT,
    payload
})
export const searchProductSuccess = (
    products: Product[]
):SearchProductSuccessAction => ({
    type: SEARCH_PRODUCT_SUCCESS,
    products
})


/**
 * 和筛选相关的action
 */
export const FILTER_PRODUCT = 'FILTER_PRODUCT'
export const FILTER_PRODUCT_SUCCESS = 'FILTER_PRODUCT_SUCCESS'

export interface FilterProductAction {
    type: typeof FILTER_PRODUCT,
    payload: FilterPayload
}

export interface FilterProductSuccessAction {
    type: typeof FILTER_PRODUCT_SUCCESS,
    payload: {
        size: string,
        data: Product[]
    },
    //用于加载更多按钮
    skip: number
}

export interface FilterPayload  {
    order?: string,
    limit?: number,
    sortBy?: string,
    skip: number,
    filters?: {
        category: string[],
        price: number[]
    }
}
export const filterProduct = (payload:FilterPayload):FilterProductAction=> ({
    type: FILTER_PRODUCT,
    payload
})

export const filterProductSuccess = (
    payload: {
        size: string,
        data: Product[]
    },
    skip: number
):FilterProductSuccessAction=> ({
    type: FILTER_PRODUCT_SUCCESS,
    payload,
    skip
})

/**
 * 根据产品id获取产品详情
 */
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS'

//ACTION
export interface GetProductByIdAction {
    type: typeof GET_PRODUCT_BY_ID,
    payload: {
        productId: string
    }
}

export interface GetProductByIdSuccessAction {
    type: typeof GET_PRODUCT_BY_ID_SUCCESS,
    payload: Product
}

export const getProductById = (
    payload: {
        productId: string
    }
):GetProductByIdAction => ({
    type: GET_PRODUCT_BY_ID,
    payload
})

export const getProductByIdSuccess = (
   payload: Product
):GetProductByIdSuccessAction => ({
    type: GET_PRODUCT_BY_ID_SUCCESS,
    payload
})

export type ProcuctUnionAction= GetProductAction
| GetProductSuccessAction
| SearchProductSuccessAction
| SearchProductAction
| FilterProductAction
| FilterProductSuccessAction
| GetProductByIdAction
| GetProductByIdSuccessAction