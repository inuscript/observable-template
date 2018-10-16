import { ofType, combineEpics } from "redux-observable"
import { ignoreElements, tap, map, mergeMap } from "rxjs/operators"
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

export const pingEpic = (action$) =>
  action$.pipe(
    ofType("PING"),
    mergeMap(action => {
      const source$ = of(action)
      return merge(
        source$.pipe(
          map((action: any) => ({
            type: "PONG",
            payload: action.payload * 2
          })),
        ),
        source$.pipe(
          map((action: any) => ({
            type: "PUNG",
            payload: action.payload * 3
          }))
        )
      )
    })
  )

