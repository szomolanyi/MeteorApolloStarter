import {Meteor} from "meteor/meteor"
import React from "react"
import { renderToString } from "react-dom/server"
import { onPageLoad } from "meteor/server-render"
import { StaticRouter } from "react-router"

import { Helmet } from "react-helmet"

import { ApolloProvider } from "react-apollo"
import { getDataFromTree} from "react-apollo"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { from } from "apollo-link"
import { ApolloLink } from 'apollo-link'

import "isomorphic-fetch"

import App from "../../ui/App"

onPageLoad(async sink => { 

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(() => ({
      headers: {
        'meteor-login-token': "jS_JuDjZ6s7K5pRkhOc0urIhBe0r--HfIn3NxBLe4ZU"//sink.getCookies()["meteor-login-token"],
        //toto funguje,ale token je ulozeny v store na klientovi, otazka ako ho vytiahnut na serever
      }
    }))
    return forward(operation)
  })

  console.log(`ssr token: ${sink.request.headers.cookie}`)
  console.log(sink)
  const client = new ApolloClient({
    ssrMode: true,
    link: from([
      //authLink,
      //new SchemaLink({ schema }),
      createHttpLink({
        uri: Meteor.absoluteUrl("graphql"),
        credentials: 'same-origin',
        headers: {
          'meteor-login-token': "jS_JuDjZ6s7K5pRkhOc0urIhBe0r--HfIn3NxBLe4ZU"//sink.request.headers.cookie,
        }, //aj toto funguje (authLink netreba ... otazka ako ho vytiahnut na serever)
      }),
    ]),
    cache: new InMemoryCache(),
  })

  const context = {}
  const Main = () => (
    <ApolloProvider client={client}>
      <StaticRouter location={sink.request.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  )

  await getDataFromTree(<Main />)
  const state = client.extract()
  sink.renderIntoElementById('app', renderToString(<Main />))

  const helmet = Helmet.renderStatic()
  sink.appendToHead(helmet.meta.toString())
  sink.appendToHead(helmet.title.toString())
  sink.appendToBody(renderToString(
    <script dangerouslySetInnerHTML={{
      __html: `window.__APOLLO_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};`,
    }} />
  ))
  /*
  sink.appendToBody(`
    <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__ = ${ JSON.stringify(state).replace(/</g, '\\u003c') };`,
        }} />
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
  `);*/
})
