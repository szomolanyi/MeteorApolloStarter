import gql from 'graphql-tag'

export const createGreeting = gql`
    mutation createGreeting($text: String!) {
        createGreeting(text: $text) {
            _id
            text
        }
    }
`
export const editGreeting = gql`
    mutation editGreeting($text: String!, $id: String!) {
        editGreeting(text: $text, id: $id) {
            _id
            text
        }
    }
`
export const deleteGreeting = gql`
    mutation deleteGreeting($id: String!) {
        deleteGreeting(id: $id)
    }
`
export const getGreetings = gql`
query greetings  {
    greetings {
      _id
      text
    }
  }
`

