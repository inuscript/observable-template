import * as React from "react"
import { generateStore, simpleConnect } from "./store/store"
import { Provider } from "react-redux"
import { Devtool } from "./Devtool"

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
        <div>
          <Main />
          <Devtool />
        </div>
      </Provider>
    )
  }
}
export default App
