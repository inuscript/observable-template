import { ofType, combineEpics } from "redux-observable"
import { ignoreElements, tap, map, mergeMap, partition, auditTime, bufferTime, filter } from "rxjs/operators"
import { merge, concat, of, Subject } from "rxjs";

const debug = () => (source) =>
  source.pipe(
    tap(console.log),
    ignoreElements()
  )

// // ボタンからPINGのActionが来たら中間のTEMP_PINGを発火
// const seedEpic = (action$) =>
//   action$.pipe(
//     ofType("PING"),
//     map((action: any) => ({
//       type: "TEMP_PING",
//       payload: action.payload
//     }))
//   )

// //
// const doubleEpic = (action$) =>
//   action$.pipe(
//     ofType("TEMP_PING"),
//     map((action: any) => ({
//       type: "PONG",
//       payload: action.payload * 3
//     }))
//   )

// const tripleEpic = (action$) =>
//   action$.pipe(
//     ofType("TEMP_PING"),
//     map((action: any) => ({
//       type: "PUNG",
//       payload: action.payload * 4
//     }))
//   )

const doubleFromSource = (source$) =>
  source$.pipe(
    map((action: any) => ({
      type: "PONG",
      payload: action.payload * 2
    })),
  )
const tripleFromSource = (source$) =>
  source$.pipe(
    map((action: any) => ({
      type: "PUNG",
      payload: action.payload * 3
    }))
  )

const logSubject = new Subject()

const mainEpic = (action$) => {
  return action$.pipe(
    ofType("PING"),
    tap((action: any) => logSubject.next({ type: "LOG", payload: action.payload })),
    bufferTime(500), // 連打
    filter((items: any[]) => items.length > 0),
    map((actions: any[]) => { // 受け取ったactionが配列になる
      return {
        type: "MASH",
        payload: actions.length
      }
    }),
  )
}
const logEpic = (action$) => {
  return logSubject.asObservable()
}

export const pingEpic = combineEpics(mainEpic, logEpic)