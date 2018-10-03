import { ofType, combineEpics } from "redux-observable"
import {
  mapTo,
  ignoreElements,
  tap,
  take,
  map,
  scan,
  reduce
} from "rxjs/operators"
import { fromEvent, Observable } from "rxjs"
import { takeUntilHotReload } from "./observableStop"

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

const konamiCommand = (action$) => {
  return fromEvent(document, "keydown").pipe(
    takeUntilHotReload(),
    // take(2),
    scan<Event>((a, b) => [...a, b], []),
    map((a) => {
      console.log(a)
    }),
    ignoreElements()
  )
}

export const rootEpic = combineEpics(pingEpic, konamiCommand)
