import React from 'react'

import gql from 'graphql-tag'
import {Query} from 'react-apollo'

import { withUserProtected } from '/imports/hocs'
import NewGreeting from "./NewGreeting"

const greetings_query = gql`
query greetings  {
    greetings {
      _id
      text
    }
  }
`

const GreetingsPage = () => (
  <Query query={greetings_query} >
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
            {greetings.map(greeting => (<li key={greeting._id}>{greeting.text}</li>))}
          </ul>
          <NewGreeting client={client} />
        </div>
      )
    }}
  </Query>
)
  
export default withUserProtected(GreetingsPage)
