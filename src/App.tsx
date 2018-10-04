// import * as React from "react"
import { generateStore, simpleConnect } from "./store/store"
import { Provider } from "react-redux"
import { Devtool } from "./Devtool"
import * as React from "react"
import { Shake } from "reshake"
const store = generateStore()

const Konami = () => {
  return (
    <Shake
      h={74}
      v={80}
      r={0}
      dur={130}
      int={6.3}
      max={100}
      fixed={true}
      fixedStop={false}
      freez={false}
    >
      <h1>Konami Command Succeed</h1>
    </Shake>
  )
}
const MainInner = (props) => {
  return <div>{props.konami ? <Konami /> : "please key type"}</div>
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
