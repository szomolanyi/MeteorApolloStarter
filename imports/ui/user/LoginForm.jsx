import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { loginWithPassword } from 'meteor-apollo-accounts'

import { withApollo } from 'react-apollo'

class LoginForm extends Component {
  state = {
    redirectToReferrer: false
  }

  loginUser = (e) => {
    e.preventDefault()
    const {email, password} = this

    loginWithPassword({ email: email.value, password: password.value }, this.props.client)
      .then(response => {
        this.props.client.resetStore()
        this.setState({ redirectToReferrer: true })
      }) 
      .catch(error => {
        console.log(error)
      }) 
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
