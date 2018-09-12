import React from 'react'
import { renderToString } from 'react-dom/server'
import { onPageLoad } from 'meteor/server-render'
import { StaticRouter } from 'react-router'

import { Helmet } from 'react-helmet'

import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
//import { createHttpLink } from 'apollo-link-http'
import { from } from 'apollo-link'
import { getUser } from 'meteor/apollo'

import schema from '../../api/schema'
import {SchemaLink} from 'apollo-link-schema'

import App from '../../ui/App'

onPageLoad(async sink => { 

  const { loginToken } = sink.getCookies()
  let user
  if (loginToken) {
    user = await getUser(loginToken)
  }
  else {
    const user = undefined
  }
  const client = new ApolloClient({
    ssrMode: true,
    link: from([
      new SchemaLink({ 
        schema, 
        //executableSchema,
        context: { user, userId: user ? user._id : undefined },
      }),
      /* if Graphql is remote, access is possible through apollo-link-http
      createHttpLink({
        uri: Meteor.absoluteUrl("graphql"),
        credentials: 'same-origin',
        headers: {
          'meteor-login-token': loginToken
        }, 
      }),*/
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
  sink.appendToHead(helmet.title.toString())
  sink.appendToHead(helmet.meta.toString())
  sink.appendToHead(helmet.link.toString())
  sink.appendToBody(renderToString(
    <script dangerouslySetInnerHTML={{
      __html: `window.__APOLLO_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};`,
    }} />
  ))
})
