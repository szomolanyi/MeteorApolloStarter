import React from "react"
import { renderToString } from "react-dom/server"
import { onPageLoad } from "meteor/server-render"
import { StaticRouter } from "react-router"

import { object } from "prop-types"
import { Helmet } from "react-helmet"

import { graphql } from "graphql"
import { ApolloProvider } from "react-apollo"
import { getDataFromTree} from "react-apollo"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { renderToStringWithData } from "react-apollo"
import { SchemaLink } from "apollo-link-schema"

//import "isomorphic-fetch"

import schema from "../../api/schema"
import App from "../../ui/App"

onPageLoad(async sink => { 

  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    /*link: createHttpLink({
      uri: 'http://localhost:3010',
      credentials: 'same-origin',
      headers: {
        cookie: sink.request.headers.cookie,
      },
    }),*/
    cache: new InMemoryCache(),
  });

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
  console.log(client.extract())
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
