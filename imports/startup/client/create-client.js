import { Meteor } from 'meteor/meteor'
import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: Meteor.absoluteUrl("graphql") 
})

export default client
