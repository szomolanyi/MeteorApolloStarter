import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const front_page_query = gql`
query FrontPage  {
    user {
      _id
      emails {
        address
      }
    }
  }
`
const FrontPage = () => {
  return (
    <Query query={front_page_query}>
      {({loading, error, client, data}) => { //eslint-disable-line
        return (
          <div>
            <h1>FrontPage</h1>
          </div>
        )
      }}
    </Query>
  )
}

export default FrontPage