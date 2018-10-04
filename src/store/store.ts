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

const konamiReducer = (state = false, action) => {
  switch (action.type) {
    case "KONAMI_COMMAND":
      return action.payload
  }
  return state
}
const keyeventLog = (state = "", action) => {
  switch (action.type) {
    case "KEY_EVENT":
      return action.payload
  }
  return state
}

export const generateStore = () => {
  const reducerMap = { konami: konamiReducer, keyeventLog }
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
