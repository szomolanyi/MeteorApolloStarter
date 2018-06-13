import gql from 'graphql-tag'

export const createGreeting = gql`
    mutation createGreeting($text: String!) {
        createGreeting(text: $text) {
            _id
            text
        }
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

