import { makeExecutableSchema } from "graphql-tools"
import merge from "lodash/merge"

import User from './user/User.graphql'
import DemoSchema from "./demo/Demo.graphql"
import GreetingSchema from "./greetings/Greetings.graphql"

import UserResolvers from "./user/resolvers"
import DemoResolvers from "./demo/resolvers"
import GreetingResolvers from "./greetings/resolvers"

//hilfe hiiiiiiiiii

//only fake Query and Mutation, to allow real always extend
const basicTypeDefs = `
type Query {
  Basic: String
}
type Mutation {
  BasicM: String
}
`
const typeDefs = [
  basicTypeDefs,
  User,
  DemoSchema,
  GreetingSchema,
  //add schemas here
]

const resolvers = merge(
  UserResolvers,
  DemoResolvers,
  GreetingResolvers,
  //add resolvers here
)


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema