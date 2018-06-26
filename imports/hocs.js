import React from "react"
import { Accounts } from 'meteor/accounts-base'
import {Query} from 'react-apollo'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

const user_query = gql`
query user  {
    user {
      _id
      emails {
        address
      }
    }
  }
`
export function withUser(Component) {
  return function WithUserHOC(props) {
    return (
      <Query query={user_query} >
        {({ loading, error, client, data }) => {
          const { user } = data
          const isLogged = (Accounts._storedLoginToken && Accounts._storedLoginToken() || user._id) ? true: false
          return (
            <Component {...props} user={{...user, isLogged, error}} />
          )
        }}
      </Query>
    )
  }
}


export function withUserProtected(Component) {
  return function WithUserProtectedHOC(props) {
    return (
      <Query query={user_query} >
        {({ loading, error, client, data }) => {
          const { user } = data
          const isLogged = (Accounts._storedLoginToken && Accounts._storedLoginToken() || user._id) ? true : false
          if (isLogged) { 
            return (
              <Component {...props} user={{ ...user, isLogged, error }} />
            )
          }
          else {
            return (
              <Redirect to={
                {
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          } 
        }}
      </Query>
    )
  }
}
