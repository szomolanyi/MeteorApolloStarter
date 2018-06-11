import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import { withApollo } from 'react-apollo'


const setToken = () => {
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
}

class LoginForm extends Component {
  state = {
    redirectToReferrer: false
  }

  loginUser = (e) => {
    e.preventDefault()
    Meteor.loginWithPassword(
      this.email.value,
      this.password.value,
      ((error) => {
        if (!error) {
          this.props.client.resetStore().then(()=>{
            setToken()
            this.setState({ redirectToReferrer: true });
          })
        }
        console.log(error)
      })
    )
  }

  render() {
    if (this.state.redirectToReferrer) {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      return <Redirect to={from} />
    }
    return (
      <form onSubmit={this.loginUser}>
        <input
          type="email"
          ref={input => (this.email = input)}
        />
        <input
          type="password"
          ref={input => (this.password = input)}
        />
        <button type="submit">Login user</button>
      </form>
    )
  }
}

export default withApollo(LoginForm)
