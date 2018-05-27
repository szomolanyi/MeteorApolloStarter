import { makeExecutableSchema } from "graphql-tools"
import merge from "lodash/merge"

import DemoSchema from "./demo/Demo.graphql"

import DemoResolvers from "./demo/resolvers"

//hilfe hiiiii

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
  DemoSchema,
  //add schemas here
]

const resolvers = merge(
  DemoResolvers
  //add resolvers here
)


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema