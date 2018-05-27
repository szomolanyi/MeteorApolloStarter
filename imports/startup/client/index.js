import React from "react"
import ReactDOM from "react-dom"
import { Switch } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { onPageLoad } from "meteor/server-render"
import { ApolloProvider } from "react-apollo"

import client from "./create-client"

import App from "../../ui/App"

console.log(client)

const Main = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
)

onPageLoad(() => {
  ReactDOM.render(<Main />, document.getElementById("app"))
})
