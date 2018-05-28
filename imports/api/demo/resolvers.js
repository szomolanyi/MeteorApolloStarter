export default {
  Query: {
    demo: () => {
      return {
        _id: -1, 
        text: "Hello world"
      }
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
