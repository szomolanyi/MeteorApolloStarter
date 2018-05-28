export default {
  Query: {
    user: (obj, args, context) => {
      console.log("context")
      console.log(context)
      return context.user || {}
    }
  },
  /*User: {
    email: (user) => user.emails[0].address
  }*/
}
