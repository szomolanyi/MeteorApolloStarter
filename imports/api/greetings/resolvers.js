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
      return Greetings.findOne({ _id: greetingId })
    },
    deleteGreeting: (obj, { id }) => {
      const ret = Greetings.remove(id)
      if (ret === 0) throw Error("Delete failed")
      return ret===1
    },
    editGreeting: (Obj, {id, text}) => {
      const result = Greetings.update(id, {text})
      if (result === 0) throw Error("Update failed")
      return {
        _id: id,
        text: text
      }    
    }
  }
}
