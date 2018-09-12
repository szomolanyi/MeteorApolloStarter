import React from 'react'
import ReactDOM from 'react-dom'
import { Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { onPageLoad } from 'meteor/server-render'
import { ApolloProvider } from 'react-apollo'

import client from './apolloclient'
import './token'
//import './service-worker'

import App from '../../ui/App'

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
  ReactDOM.hydrate(<Main />, document.getElementById("app"))
})

