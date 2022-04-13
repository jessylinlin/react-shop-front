
import React from "react"
import ReactDOM from "react-dom"
import Routes from "./Routes"
import { Provider } from 'react-redux'
import store, { history } from './store/index'
import { ConnectedRouter } from "connected-react-router"
import './style.css'
import AnotherStore from "./AnotherStore"

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AnotherStore>
        <Routes />
      </AnotherStore>
    </ConnectedRouter>
    </Provider>,
  document.getElementById("root")
)
