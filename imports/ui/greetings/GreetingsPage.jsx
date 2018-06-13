import React from 'react'

import {Query} from 'react-apollo'

import { withUserProtected } from '/imports/hocs'
import NewGreeting from "./NewGreeting"

import { getGreetings } from '/imports/queries'

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
            {greetings.map(greeting => (<li key={greeting._id}>{greeting.text}</li>))}
          </ul>
          <NewGreeting client={client} />
        </div>
      )
    }}
  </Query>
)
  
export default withUserProtected(GreetingsPage)
