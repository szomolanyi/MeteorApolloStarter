import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import { loadSchema, getSchema } from 'graphql-loader'
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts'


import User from './user/User.graphql'
import GreetingSchema from './greetings/Greetings.graphql'

import UserResolvers from './user/resolvers'
import GreetingResolvers from './greetings/resolvers'

//reload me 12345678

//User Query anf Mutations are considered as "base", all other schemas are extended
const basicTypeDefs = User

const typeDefs = [
  basicTypeDefs,
  //add schemas here
  GreetingSchema,
]
const resolvers = merge(
  UserResolvers,
  GreetingResolvers,
)

const options = {
  loginWithFacebook: false,
  loginWithGoogle: true,
  loginWithLinkedIn: false,
  loginWithPassword: true
}
// Load all accounts related resolvers and type definitions into graphql-loader
initAccounts(options)
// Load all your resolvers and type definitions into graphql-loader
loadSchema({ typeDefs, resolvers })

const schema = makeExecutableSchema(getSchema({
  typeDefs,
  resolvers,
}))

export default schema
