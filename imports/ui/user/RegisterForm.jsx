import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { withApollo } from 'react-apollo'

import { createUser } from 'meteor-apollo-accounts'

class RegisterForm extends Component {

  registerUser = (e) => {
    e.preventDefault()
    createUser({
      email: this.email.value,
      password: this.password.value,
    }, this.props.client)
    .then ((response) => {
      console.log(`createUSer ${response}`)
      this.props.client.resetStore().then(() => {
        this.props.history.push("/")
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <form onSubmit={this.registerUser}>
        <input
          type="email"
          ref={input => (this.email = input)}
        />
        <input
          type="password"
          ref={input => (this.password = input)}
        />
        <button type="submit">Register user</button>
      </form>
    )
  }
}

export default withApollo(RegisterForm)
