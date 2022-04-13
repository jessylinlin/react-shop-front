import { applyMiddleware, createStore } from 'redux'
import createRootReducer from './reducers'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension'

export const history = createHashHistory()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history), //监听路由状态 dispatch一个action
            sagaMiddleware
        )
    )
   
)

//运行saga
sagaMiddleware.run(rootSaga)

export default store