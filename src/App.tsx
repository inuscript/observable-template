import * as React from "react"
import { generateStore, simpleConnect } from "./store/store"
import { Provider } from "react-redux"

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
        <Main />
      </Provider>
    )
  }
}
export default App
