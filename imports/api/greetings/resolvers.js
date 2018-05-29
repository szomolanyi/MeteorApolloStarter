import Greetings from './greetings'

export default {
  Query: {
    greetings: () => {
      return Greetings.find().fetch()
    }
  },
  Mutation: {
    createGreeting: (obj, { text }) => {
      const greetingId = Greetings.insert({
        text
      })
      return Greetings.find({_id: greetingId})
    }
  }
}
