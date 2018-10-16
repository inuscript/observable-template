// import * as React from "react"
import { generateStore, simpleConnect } from "./store/store"
import { Provider } from "react-redux"
import { Devtool } from "./Devtool"
import * as React from "react"

const store = generateStore()

const Button = ({ dispatch }) => (
  <button onClick={(e) => dispatch({ type: "PING", payload: 3 })}>Ping</button>
)

const MainInner = (props) => {
  return (
    <div>
      hello
      <Button {...props} />
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
