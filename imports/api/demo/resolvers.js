export default {
  Query: {
    demo: (obj, params, context) => {
      return "Hello world"
    }
  },
  Mutation: {
    demoMutation: (obj, { text }, context) => {
      return {
        _id: -1,
        text
      }
    }
  }
}
