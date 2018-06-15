import { Random } from 'meteor/random'

export default {
  Query: {
    user: (obj, args, context) => {
      return context.user || {}
    }
  },
  User: {
    emails: (user) => {
      return user.emails
    },
    randomString: () => Random.id()
  }
}
