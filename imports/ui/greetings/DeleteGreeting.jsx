import React, {Component} from 'react'
import { Mutation } from 'react-apollo'

import { deleteGreeting, getGreetings } from '/imports/queries'

class DeleteGreetingButton extends Component {
  deleteGreeting = (e) => {
    e.preventDefault()
    this.props.deleteGreeting({
      variables: {
        id: this.props.id
      }
    })
    .catch ((error) => {
      console.log(error)
    })
  }
  render() {
    return (
      <button onClick={this.deleteGreeting}>
        Delete
      </button>
    )
  }
}

const DeleteGreeting = ({id}) => (
  <Mutation mutation={deleteGreeting}
    update={(cache, { data }) => {
      const deleted =  data.deleteGreeting
      if (deleted) {
        const { greetings } = cache.readQuery({ query: getGreetings })
        cache.writeQuery({
          query: getGreetings,
          data: { greetings: greetings.filter(greeting => greeting._id != id) }
        })
      }
    }}
  >
    {
      (deleteGreeting) => (
        <DeleteGreetingButton deleteGreeting={deleteGreeting} id={id} />
      )
    }
  </Mutation>
)

export default DeleteGreeting
