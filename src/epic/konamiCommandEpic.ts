import { fromEvent } from "rxjs"

import { pluck, scan, map, filter, tap } from "rxjs/operators"
import { combineEpics, ofType } from "redux-observable"

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
  return null
}

const keyEventEpic = () => {
  // 正式な作法としてはReact側でkeydonw eventを発火させるべきかも?
  return fromEvent(document, "keydown").pipe(
    pluck("key"), // これはmap(({key}) => key) といっしょ
    map(convertVisible), // 対象となるキーに変換。それ以外の場合はnullに
    filter((value) => !!value), // nullの場合は除外
    map((e) => {
      // KEY_EVENT actionを返す
      return { type: "KEY_EVENT", payload: e }
    })
  )
}

const commandEpic = (action$) => {
  return action$.pipe(
    ofType("KEY_EVENT"), // KEY_EVENT actionが発火したら動く
    pluck("payload"), // 同上、map(({payload}) => payload) といっしょ
    scan((curr, next) => [...curr, next], []), // 配列化
    map((cmd: string[]) => {
      console.log(cmd)
      const latestCmd = cmd.slice(-1 * command.length) // 後ろから10個だけにする
      return {
        type: "KONAMI_COMMAND",
        payload: command.join("") === latestCmd.join("") // コナミコマンドの成否判定
      }
    })
  )
}

export const konamiCommandEpic = combineEpics(keyEventEpic, commandEpic)
