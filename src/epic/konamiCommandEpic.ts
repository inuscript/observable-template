import { fromEvent } from "rxjs"

import { takeUntilHotReload } from "./hotReload"

import { pluck, scan, map, filter, tap, ignoreElements } from "rxjs/operators"

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

export const konamiCommandEpic = () => {
  return fromEvent(document, "keydown").pipe(
    takeUntilHotReload(),
    pluck("key"), // map(({ key }) => key),
    scan<string>((curr, next) => [...curr, next], []),
    map((cmd) => {
      return cmd.slice(-1 * command.length)
    }),
    filter((latestCmd) => {
      console.log(latestCmd)
      return command.join("") === latestCmd.join("")
    }),
    tap((_) => console.log("success!")),
    ignoreElements()
  )
}
