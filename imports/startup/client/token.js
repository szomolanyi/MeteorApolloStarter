import { Accounts } from 'meteor/accounts-base'
import Cookie from 'js-cookie'

Accounts.onLogin(() => {
  const token = Accounts._storedLoginToken()
  const expires = Accounts._storedLoginTokenExpires()

  console.log(`onLogin: token=${token}`)
  if (token) {
    const expireDate = new Date(expires)
    const today = new Date()
    const days = Math.floor((expireDate - today) / 1000 / 3600 / 24)

    Cookie.set('loginToken', token, { expires: days })
  } else {
    Cookie.remove('loginToken')
  }
})

