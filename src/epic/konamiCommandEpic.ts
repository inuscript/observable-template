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
  return false
}

const keyEventEpic = () => {
  return fromEvent(document, "keydown") // 正式な作法としてはReact側でkeydonw eventを発火させるべきかも
    .pipe(
      map((e) => ({
        type: "KEY_EVENT",
        event: e
      }))
    )
}

const commandEpic = (action$) => {
  return action$.pipe(
    ofType("KEY_EVENT"),
    pluck("key"), // map(({key}) => key) といっしょ
    map(convertVisible), // 十字キーを変換
    filter((value) => !!value), // falseになっている値は除外
    scan((curr, next) => [...curr, next], []), // 配列化
    map((cmd: string[]) => cmd.slice(-1 * command.length)), // 後ろからコマンド数で取得
    tap(console.log), // ログ見る
    map((latestCmd: string[]) => ({
      type: "KONAMI_COMMAND",
      payload: command.join("") === latestCmd.join("") // コナミコマンドの成否判定
    }))
  )
}

export const konamiCommandEpic = combineEpics(keyEventEpic, commandEpic)
