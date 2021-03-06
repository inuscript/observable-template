// import * as React from "react"
import { generateStore, simpleConnect } from "./store/store"
import { Provider } from "react-redux"
import { Devtool } from "./Devtool"
import * as React from "react"

const store = generateStore()

const MainInner = (props) => {
  return (
    <div>
      hello
      <button>Ping</button>
    </div>
  )
}

const Main = simpleConnect(MainInner)

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div>
          <Main />
          <Devtool />
        </div>
      </Provider>
    )
  }
}
export default App
