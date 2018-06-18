import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { loginWithPassword, loginWithGoogle  } from 'meteor-apollo-accounts'

import {GoogleLogin} from 'react-google-login'

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

  successGoogle = ({ accessToken}) => {
    loginWithGoogle({accessToken}, this.props.client)
      .then(response => {
        this.props.client.resetStore().then(()=> {
          this.setState({ redirectToReferrer: true })
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  failedGoogle = (error) => {
    console.log(error)
  }

  render() {
    if (this.state.redirectToReferrer) {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      return <Redirect to={from} />
    }
    return (
      <div>
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
        <hr />
        <GoogleLogin
          clientId="938137181914-hqo6f8v4oe4f02ebmemgue9jmmdo6r5b.apps.googleusercontent.com"
          buttonText="Google Login"
          onSuccess={this.successGoogle}
          onFailure={this.failedGoogle}
        />
      </div>
    )
  }
}

export default withApollo(LoginForm)
