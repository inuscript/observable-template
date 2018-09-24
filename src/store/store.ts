import { createStore, Reducer, combineReducers } from "redux";

export const counterReducer: Reducer<number, any> = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
  }
  return state;
};

export const generateStore = () => {
  const reducerMap = {
    counter: counterReducer
  };
  return createStore(combineReducers(reducerMap));
};
