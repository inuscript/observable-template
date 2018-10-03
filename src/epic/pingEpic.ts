import { ofType } from "redux-observable"
import { ignoreElements, tap } from "rxjs/operators"

export const debug = () => (source) =>
  source.pipe(
    tap(console.log),
    ignoreElements()
  )
export const pingEpic = (action$) =>
  action$.pipe(
    ofType("PING"),
    debug()
  )
