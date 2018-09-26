import { createStore, Reducer, combineReducers, compose } from "redux"
import { connect } from "react-redux"
import { Devtool } from "../Devtool"

export const counterReducer: Reducer<number, any> = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
  }
  return state
}
const enhancer = compose(Devtool.instrument())
export const generateStore = () => {
  const reducerMap = {
    counter: counterReducer
  }
  return createStore(combineReducers(reducerMap), {}, enhancer)
}

export const simpleConnect = (Component) => {
  return connect((state) => state)(Component)
}
