import { ofType, combineEpics } from "redux-observable"
import {
  mapTo,
  ignoreElements,
  tap,
  take,
  map,
  scan,
  reduce,
  bufferTime,
  filter
} from "rxjs/operators"
import { fromEvent, Observable } from "rxjs"
import { takeUntilHotReload } from "./hotReload"

export const pingEpic = (action$) =>
  action$.pipe(
    ofType("PING"),
    tap(console.log),
    ignoreElements()
  )

const debug = (tapFn = console.log) => <T>(source: Observable<T>) =>
  source.pipe(
    tap(tapFn),
    ignoreElements()
  )

// const shoryukenCommand = (action$) => {
//   return fromEvent(document, "keydown").pipe(
//     takeUntilHotReload(),
//     bufferTime(60),
//     filter((item) => item.length > 0),
//     scan<any>((a, b) => [...a, b], []),
//     map((a) => {
//       console.log(a)
//     }),
//     ignoreElements()
//   )
// }

const konamiCommandEpic = (action$) => {
  const command = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
  ]
  return fromEvent(document, "keydown").pipe(
    takeUntilHotReload(),
    map(({ key }) => key), // pluckでも良い
    scan((a, b) => [...a, b], []),
    map((a) => {
      console.log(a)
    }),
    ignoreElements()
  )
}

export const rootEpic = combineEpics(pingEpic, konamiCommandEpic)
