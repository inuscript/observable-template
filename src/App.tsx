import * as React from "react"
import { generateStore, simpleConnect } from "./store/store"
import { Provider } from "react-redux"
//@ts-ignore
import { createDevTools } from "redux-devtools"
//@ts-ignore
import LogMonitor from "redux-devtools-log-monitor"

const Devtool = createDevTools(<LogMonitor />)
const store = generateStore()

const MainInner = (props) => {
  console.log(props)
  return <div>hello</div>
}

const Main = simpleConnect(MainInner)

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Devtool />
        <Main />
      </Provider>
    )
  }
}
export default App
