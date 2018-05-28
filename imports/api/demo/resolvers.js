export default {
  Query: {
    demo: () => {
      return "Hello world"
    }
  },
  Mutation: {
    demoMutation: (obj, { text }) => {
      return {
        _id: -1,
        text
      }
    }
  }
}
