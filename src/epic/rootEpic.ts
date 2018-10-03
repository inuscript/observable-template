import { combineEpics } from "redux-observable"
import { registerDisposeHandler } from "./hotReload"
import { pingEpic } from "./pingEpic"
import { konamiCommandEpic } from "./konamiCommandEpic"

// const shoryukenCommand = (action$) => {
//   return fromEvent(document, "keydown").pipe(
//     takeUntilHotReload(),
//     bufferTime(60),
//     filter((item) => item.length > 0),
//     scan<any>((a, b) => [...a, b], []),
//     map((a) => {
//       console.log(a)
//     }),
//     ignoreElements()
//   )
// }

export const rootEpic = combineEpics(pingEpic, konamiCommandEpic)

registerDisposeHandler(module)
