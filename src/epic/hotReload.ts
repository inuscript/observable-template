import { Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"

const hmrDisposer = new Subject()

export const registerDisposeHandler = (module) => {
  if (module.hot) {
    module.hot.dispose(() => hmrDisposer.next())
  }
}

export const takeUntilHotReload = () => takeUntil(hmrDisposer)
