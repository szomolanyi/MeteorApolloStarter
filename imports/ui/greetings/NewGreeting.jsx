import React, { Component } from 'react'
import { Mutation } from "react-apollo"

import { getGreetings, createGreeting } from '/imports/queries'

class NewGreetingForm extends Component {
  
  state = {
    error: null
  }

  submitGreeting = (e) => {
    e.preventDefault()
    this.props.createGreeting({
      variables: {
        text: this.greeting.value
      }
    })
      .catch(error => {
        console.log(error)
        this.setState({ error: error.message })
      })
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.submitGreeting}>
          <input type="text" ref={input => (this.greeting = input)} />
          <button type="submit">Send greeting</button>
        </form>
      </div>
    )
  }
}

const NewGreeting = ({client}) => (
  <Mutation 
    mutation={createGreeting}
    update={(cache, {data :{createGreeting} }) => {
      const { greetings } = cache.readQuery({ query: getGreetings });
      cache.writeQuery({
        query: getGreetings,
        data: { greetings: greetings.concat([createGreeting]) }
      });
    }}
  >
    {(createGreeting, {data})=>(
      <NewGreetingForm createGreeting={createGreeting} client={client}/>
    )}
  </Mutation>
)
export default NewGreeting
