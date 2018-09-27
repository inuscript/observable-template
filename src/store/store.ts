import {
  createStore,
  Reducer,
  combineReducers,
  compose,
  applyMiddleware
} from "redux"
import { connect } from "react-redux"
import { Devtool } from "../Devtool"
import { createEpicMiddleware } from "redux-observable"
import { rootEpic } from "../epic/rootEpic"

export const counterReducer: Reducer<number, any> = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
  }
  return state
}

export const generateStore = () => {
  const reducerMap = {
    counter: counterReducer
  }
  const epicMiddleware = createEpicMiddleware()
  const enhancer = compose(
    applyMiddleware(epicMiddleware),
    Devtool.instrument()
  )
  const store = createStore(combineReducers(reducerMap), enhancer)
  epicMiddleware.run(rootEpic)
  return store
}

export const simpleConnect = (Component) => {
  return connect((state) => state)(Component)
}
