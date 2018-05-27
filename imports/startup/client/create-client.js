import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: Meteor.absoluteUrl("graphql") // eslint-disable-line
})

export default client
