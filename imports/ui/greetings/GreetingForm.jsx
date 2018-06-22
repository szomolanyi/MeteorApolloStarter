import React, {Component} from 'react'
import { compose, graphql } from 'react-apollo'

import { getGreetings, createGreeting, editGreeting } from '/imports/queries'

class GreetingForm extends Component {

  constructor(props) {
    super(props)
    if (props.greeting) {
      this.createMode = false  
      this.submitFunction = props.editGreeting
      this.greetingId = this.props.greeting._id
    }
    else {
      this.createMode = true
      this.submitFunction = props.createGreeting
      this.greetingId = undefined
    }
  }

  submit = (e) => {
    e.preventDefault()
    this.submitFunction({variables:{
      text: this.greetingText.value,
      id: this.greetingId
    }})
    .then(() => {
      this.greetingText.value = ""
      this.props.toggleForm && this.props.toggleForm()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { greeting, toggleForm } = this.props
    return (
      <div>
        <form onSubmit={this.submit}>
          <input type="text" ref={input => (this.greetingText = input)}
            defaultValue={greeting ? greeting.text:""}
          />
          <button type="submit">{this.createMode?"Create":"Update"}</button>
          {toggleForm && <button onClick={toggleForm}>Cancel</button>}
        </form>
      </div>
    )
  }
}

const createOptions = {
  options: {
    update: (cache, { data: { createGreeting } }) => {
      const { greetings } = cache.readQuery({ query: getGreetings });
      cache.writeQuery({
        query: getGreetings,
        data: { greetings: greetings.concat([createGreeting]) }
      })
    }
  },
  name: "createGreeting"
}

export default compose(
  graphql(createGreeting, createOptions),
  graphql(editGreeting, {name: "editGreeting"}),
)(GreetingForm)
