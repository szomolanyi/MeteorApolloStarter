import { ApolloServer } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'

import schema from '../../api/schema'

const server = new ApolloServer({schema})

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
})
