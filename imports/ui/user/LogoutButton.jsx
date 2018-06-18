import React from 'react'
import { withRouter } from 'react-router-dom'

import { logout } from 'meteor-apollo-accounts'

import { withApollo } from 'react-apollo'

const LogoutButton = ({ history, client }) => (
  <button onClick={() => {
    logout(client).then(() => {
      client.resetStore().then(()=>{
        history.push('/login')
      })
    })
  }}>
    Logout
  </button>
)

export default withApollo(withRouter(LogoutButton))
