import React, { Component } from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

export default class componentName extends Component {
  state = {
    login: true
  }
  render() {
    const { user, client } = this.props
    if (user._id) {
      return (<button onClick={() => {
        Meteor.logout()
        client.resetStore()
      }}>Logout</button>)
    }
    return (
      <div>
        {this.state.login ?
          (<LoginForm client={client} />) :
          (<RegisterForm client={client} />)
        }
        <button onClick={() => this.setState({ login: !this.state.login })}>{this.state.login ? 'Register' : 'Login'}</button>
      </div>
    )
  }
}
