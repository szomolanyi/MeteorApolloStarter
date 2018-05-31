import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken()
  operation.setContext(() => ({
    headers: {
      'meteor-login-token': token,
    }
  }))
  return forward(operation)
})
  
const client = new ApolloClient({
  
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    authLink,
    new HttpLink({
      uri: Meteor.absoluteUrl("graphql"), 
      credentials: 'same-origin',
    })
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

export default client
