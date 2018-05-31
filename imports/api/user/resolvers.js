export default {
  Query: {
    user: (obj, args, context) => {
      return context.user || {}
    }
  },
  /*User: {
    email: (user) => user.emails[0].address
  }*/
}
