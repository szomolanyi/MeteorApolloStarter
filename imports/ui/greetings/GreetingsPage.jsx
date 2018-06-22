import React, { Component } from 'react'

import { graphql, compose } from 'react-apollo'

import { withUserProtected } from '/imports/hocs'

import { getGreetings } from '/imports/queries'
import DeleteGreetingButton from './DeleteGreetingButton'
import GreetingForm from './GreetingForm'

const ViewGreeting = ({greeting, toggleForm}) => (
  <div>
    {greeting.text + ' '}
    <button onClick={toggleForm}>Edit</button>
    <DeleteGreetingButton id={greeting._id} />
  </div>
)

class Greeting extends Component {
  state = {
    editMode: false
  }

  toggleForm = () => {
    this.setState({editMode: !this.state.editMode})
  }

  render() {
    const GreetingComponent = this.state.editMode ? GreetingForm : ViewGreeting
    return (
      < GreetingComponent
        greeting={this.props.greeting}
        toggleForm={this.toggleForm}
      />
    )
  }
}


const GreetingsPage = ({ data }) => {
  const { loading, error, greetings } = data
  if (loading) return null
  if (error) {
    console.log(error)
    return null
  }
  return (
    <div>
      <h1>Greetings</h1>
      <ul>
        {greetings.map(greeting => (
          <li key={greeting._id}>
            <Greeting greeting={greeting} />
          </li>))}
      </ul>
      <GreetingForm />
    </div>
  )
}

export default compose(
  graphql(getGreetings),
  withUserProtected
)(GreetingsPage)

