import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import UserForm from "./UserForm"
import NewGreeting from "./NewGreeting"

const hello_query = gql`
query HelloAll  {
    demo {
      _id
      text
    }
    user {
      _id
      email
    }
    greetings {
      _id
      text
    }
  }
`

const FrontPage = () => {
  return (
    <Query query={hello_query}>
      {({loading, error, client, data}) => { //eslint-disable-line
        return (
          <div>
            <UserForm client={client} user={data.user} />
            <h1>FrontPage</h1>
            <h2>{data.demo.text}</h2>
            <ul>
              {data.greetings.map(greeting => (<li key={greeting._id}>{greeting.text}</li>))}
            </ul>
            <NewGreeting client={client}/>
          </div>
        )
      }}
    </Query>
  )
}

export default FrontPage
