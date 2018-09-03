import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './reducers'
import App from './components/App'

const root: ?Element = document.getElementById('root')

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
)
/* eslint-enable */

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
}
