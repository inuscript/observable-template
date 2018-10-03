import { fromEvent, Observable, of, concat } from "rxjs"

import { takeUntilHotReload } from "./hotReload"

import { pluck, scan, map, filter, tap, mergeMap } from "rxjs/operators"

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

const detectSuccess = (latestCmd: string[]) => ({
  type: "KONAMI_COMMAND",
  payload: command.join("") === latestCmd.join("")
})
const detectSuccessEpic = (source$: Observable<string[]>) =>
  source$.pipe(map(detectSuccess))

const logging = (cmd: string[]) => {
  return { type: "KEY_EVENTS", payload: cmd.join(",") }
}
const loggingEpic = (source$: Observable<string[]>) =>
  source$.pipe(map(logging))

export const konamiCommandEpic = () => {
  return fromEvent(document, "keydown").pipe(
    takeUntilHotReload(),
    scanValidKeymap(),
    mergeMap((cmd) => concat(of(logging(cmd)), of(detectSuccess(cmd))))
    // map((a) => console.log(a))
  )
}