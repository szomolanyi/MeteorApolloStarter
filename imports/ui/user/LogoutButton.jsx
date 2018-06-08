import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withRouter } from 'react-router-dom'

import { withApollo } from 'react-apollo'
import Cookie from 'js-cookie'

const LogoutButton = ({ history, client }) => (
  <button onClick={() => {
    Meteor.logout()
    client.resetStore().then(() => {
      Cookie.remove('loginToken')
      history.push('/login')
    })
  }}>
    Logout
  </button>
)

export default withApollo(withRouter(LogoutButton))
