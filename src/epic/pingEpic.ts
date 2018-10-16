import { ofType, combineEpics } from "redux-observable"
import { ignoreElements, tap, map, mergeMap, partition, auditTime, bufferTime, filter } from "rxjs/operators"
import { merge, concat, of } from "rxjs";

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

export const pingEpic = (action$) => {
  const source$ = action$.pipe(
    ofType("PING"),
  )
  return merge(
    source$.pipe( // こっちはLOG出力だけ
      map((action: any) => ({
        type: "LOG",
        payload: action.payload
      })),
    ),
    source$.pipe(
      bufferTime(1000), // 連打
      filter((items: any[]) => items.length > 0),
      map((actions: any[]) => { // 受け取ったactionが配列になる
        return {
          type: "MASH",
          payload: actions.length
        }
      })
    )
  )
}