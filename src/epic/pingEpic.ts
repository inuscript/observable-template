import { ofType } from "redux-observable"
import { ignoreElements, tap } from "rxjs/operators"
export const pingEpic = (action$) =>
  action$.pipe(
    ofType("PING"),
    tap(console.log),
    ignoreElements()
  )
