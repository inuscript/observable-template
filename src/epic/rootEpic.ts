import { combineEpics } from "redux-observable"
import { registerDisposeHandler } from "./hotReload"
import { pingEpic } from "./pingEpic"

export const rootEpic = combineEpics(pingEpic)

registerDisposeHandler(module)
