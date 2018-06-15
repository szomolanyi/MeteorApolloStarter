import { onTokenChange } from 'meteor-apollo-accounts'
import Cookie from 'js-cookie'


onTokenChange(({token, tokenExpires}) => {
  console.log(`onTokenChange ${token} ${tokenExpires}`)
  if (token) {
    const expireDate = new Date(tokenExpires)
    const today = new Date()
    const days = Math.floor((expireDate - today) / 1000 / 3600 / 24)

    Cookie.set('loginToken', token, { expires: days })
  } else {
    Cookie.remove('loginToken')
  }
})
