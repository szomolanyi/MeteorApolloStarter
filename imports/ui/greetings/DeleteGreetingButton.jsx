import React, {Component} from 'react'
import { graphql } from 'react-apollo'

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

const deleteOptions = {
  options: (props) => {
    return {
      update: (cache, { data }) => {
        const deleted = data.deleteGreeting
        if (deleted) {
          const { greetings } = cache.readQuery({ query: getGreetings })
          cache.writeQuery({
            query: getGreetings,
            data: { greetings: greetings.filter(greeting => greeting._id != props.id) }
          })
        }
      },
    }
  },
  name: "deleteGreeting"
}
export default graphql(deleteGreeting, deleteOptions)(DeleteGreetingButton)
