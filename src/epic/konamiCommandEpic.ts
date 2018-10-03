import { fromEvent } from "rxjs"

import { takeUntilHotReload } from "./hotReload"

import {
  pluck,
  scan,
  map,
  filter,
  tap,
  ignoreElements,
  mapTo
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

export const konamiCommandEpic = () => {
  return fromEvent(document, "keydown").pipe(
    takeUntilHotReload(),
    pluck("key"), // ==> map(({ key }) => key),
    filter(convertVisible),
    map(convertVisible),
    scan((curr, next) => [...curr, next], []),
    map((cmd) => cmd.slice(-1 * command.length)),
    filter((latestCmd) => {
      console.log(latestCmd)
      return command.join("") === latestCmd.join("")
    }),
    tap((_) => console.log("success!")),
    mapTo({
      type: "KONAMI_COMMAND"
    })
  )
}
