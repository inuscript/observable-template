import { fromEvent, Observable, concat } from "rxjs"

import { takeUntilHotReload } from "./hotReload"

import { pluck, scan, map, filter, publish, tap } from "rxjs/operators"

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
  const source = fromEvent(document, "keydown")
  const ex = source.pipe(
    takeUntilHotReload(),
    pluck("key"),
    filter(convertVisible),
    map(convertVisible),
    scan<string>((curr, next) => [...curr, next], []),
    map((cmd: string[]) => cmd.slice(-1 * command.length)),
    publish()
  )
  const subscribe = ex.pipe(tap((i) => console.log("sub 1", i)))
  // @ts-ignore
  ex.connect()
  return source
  // return concat(stream$.pipe(map(detectSuccess)), stream$.pipe(map(logging)))
}
