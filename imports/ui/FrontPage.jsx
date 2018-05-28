import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const hello_query = gql`
  {
    demo {
      _id
      text
    }
    user {
      _id
      email
    }
  }
`

const FrontPage = () => {
  return (
    <Query query={hello_query}>
      {({loading, error, data}) => { //eslint-disable-line
        console.log(data)
        //console.log(`User: ${data.user._id}`)
        return (
          <div>
            <h1>FrontPage</h1>
            <h2>{data.demo.text}</h2>
          </div>
        )
      }}
    </Query>
  )
}

export default FrontPage
