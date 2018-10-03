import { fromEvent, Observable, of, from, Subject, EMPTY, iif } from "rxjs"

import { takeUntilHotReload } from "./hotReload"

import {
  pluck,
  scan,
  map,
  filter,
  tap,
  ignoreElements,
  mapTo,
  mergeMap,
  merge,
  concat,
  multicast,
  share,
  concatAll,
  mergeAll,
  combineAll
} from "rxjs/operators"

const command = ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"]

const visibleMap = {
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→"
}

const convertVisible = (key) => {
  if (key.length === 1) {
    return key.toUpperCase()
  }
  if (visibleMap[key]) {
    return visibleMap[key]
  }
  return false
}

const scanValidKeymap = () => (stream$): Observable<string[]> =>
  stream$.pipe(
    pluck("key"),
    filter(convertVisible),
    map(convertVisible),
    scan<string>((curr, next) => [...curr, next], []),
    map((cmd: string[]) => cmd.slice(-1 * command.length))
  )

const detectSuccess = (source$: Observable<string[]>) =>
  source$.pipe(
    map((latestCmd: string[]) => ({
      type: "KONAMI_COMMAND",
      payload: command.join("") === latestCmd.join("")
    }))
  )

const logging = (source$: Observable<string[]>) =>
  source$.pipe(
    map((cmd: string[]) => {
      return { type: "KEY_EVENTS", payload: cmd.join(",") }
    })
  )

export const konamiCommandEpic = () => {
  return fromEvent(document, "keydown").pipe(
    takeUntilHotReload(),
    scanValidKeymap(),
    mergeMap((cmd) =>
      EMPTY.pipe(merge(detectSuccess(of(cmd)), logging(of(cmd))))
    )
  )
}
