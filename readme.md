# Meteor + Apollo + React starter kit


## Setup & run :
1. Clone repo
2. cd MeteorApolloStarter
3. meteor npm install
4. meteor


## Features :
* Apollo 2.0
* React Router 4
* Accounts: password and google, login & registration in GraphQL
* SSR


## Credits :
* https://github.com/apollographql/meteor-integration/issues/122
* https://github.com/apollographql/meteor-integration/issues/116
* https://github.com/orionsoft/meteor-apollo-accounts
* https://github.com/janikvonrotz/meteor-apollo-accounts-example
* https://github.com/anthonyjgrove/react-google-login
* https://www.apollographql.com
* https://github.com/CaptainN/meteor-react-starter
* https://github.com/fede-rodes/meteor-apollo-starter-kit
* https://github.com/jkrup/meteor-now

## Deploy to zeit :
### Install zeit and meteor-now
* npm install -g now
* npm install -g meteor-now

### Deploy
* meteor-now -e MONGO_URL=mongodb://<mongo_url> -e ROOT_URL=https://<root_url>
* now alias https://<zeit_dynamic_url> https://<root_url>
