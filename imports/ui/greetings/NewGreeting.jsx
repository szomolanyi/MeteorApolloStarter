import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

const createGreeting = gql`
    mutation createGreeting($text: String!) {
        createGreeting(text: $text) {
            _id
        }
    }
`

class NewGreetingForm extends Component {
  
  state = {
    error: null
  }

  submitGreeting = () => {
    this.props.createGreeting({
      variables: {
        text: this.greeting.value
      }
    })
      .then(()=>{
        this.props.client.resetStore()
      })
      .catch(error => {
        console.log(error)
        this.setState({ error: error.message })
      })
  }
  
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.greeting = input)} />
        <button onClick={this.submitGreeting}>Create</button>
      </div>
    )
  }
}

const NewGreeting = ({client}) => (
  <Mutation mutation={createGreeting}>
    {(createGreeting, {data})=>(
      <NewGreetingForm createGreeting={createGreeting} client={client}/>
    )}
  </Mutation>
)
export default NewGreeting
