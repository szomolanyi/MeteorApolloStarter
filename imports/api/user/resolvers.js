export default {
  Query: {
    user: (obj, args, context) => {
      return context.user || {}
    }
  },
  User: {
    email: (user) => {
      console.log(`User resolver ${user}`)
      console.log(user)
      return user.emails ? user.emails[0].address : null
    }
  }
}
