import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const hello_query = gql`
  {
    demo
  }
`

const FrontPage = () => {
  return (
    <Query query={hello_query}>
      {({loading, error, data}) => {
        return (
          <div>
            <h1>FrontPage</h1>
            <h2>{data.demo}</h2>
          </div>
        )
      }}
    </Query>
  )
}

export default FrontPage
