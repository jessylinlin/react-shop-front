import axios from "axios";
import { takeEvery, put} from "redux-saga/effects";
import { API } from "../../config";
import { GetProductAction, getProductSuccess, GET_PRODUCT, SEARCH_PRODUCT, SearchProductAction, searchProductSuccess, SEARCH_PRODUCT_SUCCESS, FILTER_PRODUCT, FilterProductAction, filterProductSuccess, GET_PRODUCT_BY_ID, GetProductByIdAction, getProductByIdSuccess } from "../actions/product.action";
import { Product } from "../models/product";

///products?sortBy=createdAt&order=asc&limit=10
function* handleGetProduct ({sortBy, order, limit}: GetProductAction) {
    let { data } = yield axios.get<Product[]>(`${API}/products`, {
        params: { sortBy, order, limit}
    })

    yield put(getProductSuccess(data, sortBy))
}


///products/search?search=node&category=5fa11a0bfbe98b811e09d1ea
function* handleSearchProduct ({payload: {search, category}}: SearchProductAction) {
    let { data } = yield axios.get(`${API}/products/search`, {
        params: {
            search,
            category
        }
    })

    yield put(searchProductSuccess(data))
}

function* handleFilterProduct (action: FilterProductAction) {
    let { data } = yield axios.post(`${API}/products/filter`, action.payload)
    yield put(filterProductSuccess(data, action.payload.skip))
}

function*  handleGetProductById ({ payload }: GetProductByIdAction) {
    let { data } = yield axios.get(`${API}/product/${payload.productId}`)

    yield put(getProductByIdSuccess(data))
}

export default function* productSaga () {
    yield takeEvery(GET_PRODUCT, handleGetProduct)
    yield takeEvery(SEARCH_PRODUCT, handleSearchProduct)
    yield takeEvery(FILTER_PRODUCT, handleFilterProduct)
    yield takeEvery(GET_PRODUCT_BY_ID, handleGetProductById)
}