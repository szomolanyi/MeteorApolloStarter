import React, { Component } from 'react'

import {Query, Mutation} from 'react-apollo'

import { withUserProtected } from '/imports/hocs'
import NewGreeting from "./NewGreeting"

import { getGreetings, editGreeting } from '/imports/queries'
import DeleteGreeting from './DeleteGreeting'

const ToggleEditButton = ({toggleEdit, caption}) => (
  <button onClick={toggleEdit}>
    {caption}
  </button>
)

const ViewGreeting = ({greeting, toggleEdit}) => (
  <div>
    {greeting.text + ' '}
    <ToggleEditButton 
      toggleEdit={toggleEdit}
      caption="Edit"
    />
  </div>
)

class EditGreeting extends Component {

  //greetingText = this.props.greeting.text

  render() {
    const { greeting, toggleEdit } = this.props
    return (
      <div>
        <Mutation mutation={editGreeting}>
          {(editGreeting, { data }) => {
            return (
              <form onSubmit={
                (e) => {
                  e.preventDefault()
                  editGreeting({
                    variables: {
                      text: this.greetingText.value,
                      id: greeting._id
                    }
                  })
                  .then(() => {
                    toggleEdit()
                  })
                  .catch((error) => {
                    console.log(error)
                  })
                }
              }
              >
                <input type="text" ref={input => (this.greetingText = input)}
                  defaultValue={this.props.greeting.text}
                />
                <button type="submit">Update</button>
              </form>
            )
          }
          }
        </Mutation>
        <ToggleEditButton
          toggleEdit={toggleEdit}
          caption="Cancel"
        />
        <DeleteGreeting id={greeting._id} />
      </div>
    )
  }
}


class Greeting extends Component {
  state = {
    editMode: false
  }

  toggleEdit = () => {
    this.setState({editMode: !this.state.editMode})
  }

  render() {
    if (this.state.editMode) {
      return (
        <EditGreeting
          greeting={this.props.greeting}
          toggleEdit={this.toggleEdit}
        />
      )
    }
    else {
      return (
        <ViewGreeting
          greeting={this.props.greeting}
          toggleEdit={this.toggleEdit}
        />
      )
    }
  }
}

const GreetingsPage = () => (
  <Query query={getGreetings} >
    {({ loading, error, client, data }) => {
      if (loading) return null
      if (error) {
        console.log(error)
        return null
      }
      const { greetings } = data
      return (
        <div>
          <h1>Greetings</h1>
          <ul>
            {greetings.map(greeting => (
              <li key={greeting._id}>
                <Greeting greeting={greeting} />
              </li>))}
          </ul>
          <NewGreeting client={client} />
        </div>
      )
    }}
  </Query>
)
  
export default withUserProtected(GreetingsPage)
