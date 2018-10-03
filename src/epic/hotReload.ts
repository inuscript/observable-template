import { Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"

const disposer = new Subject()

if (module.hot) {
  module.hot.dispose((data) => {
    disposer.next()
  })
}

export const takeUntilHotReload = () => takeUntil(disposer)
