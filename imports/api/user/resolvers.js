export default {
  Query: {
    user: (obj, args, context) => {
      return context.user || {}
    }
  },
  User: {
    email: (user) => {
      return user.emails ? user.emails[0].address : null
    }
  }
}
