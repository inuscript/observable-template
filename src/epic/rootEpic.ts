import { combineEpics } from "redux-observable"
import { registerDisposeHandler } from "./hotReload"
import { pingEpic } from "./pingEpic"
import { konamiCommandEpic } from "./konamiCommandEpic"

export const rootEpic = combineEpics(pingEpic, konamiCommandEpic)

registerDisposeHandler(module)
