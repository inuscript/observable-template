import { ofType, combineEpics } from "redux-observable"
import { ignoreElements, tap, map } from "rxjs/operators"
export const debug = () => (source) =>
  source.pipe(
    tap(console.log),
    ignoreElements()
  )

// ボタンからPINGのActionが来たら中間のTEMP_PINGを発火
const seedEpic = (action$) =>
  action$.pipe(
    ofType("PING"),
    map((action: any) => ({
      type: "TEMP_PING",
      payload: action.payload
    }))
  )

//
const firstEpic = (action$) =>
  action$.pipe(
    ofType("TEMP_PING"),
    map((action: any) => ({
      type: "PONG",
      payload: action.payload
    }))
  )

const secondEpic = (action$) =>
  action$.pipe(
    ofType("TEMP_PING"),
    map((action: any) => ({
      type: "PUNG",
      payload: action.payload
    }))
  )

export const pingEpic = combineEpics(seedEpic, firstEpic, secondEpic)
