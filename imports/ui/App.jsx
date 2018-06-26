import React from 'react'
import { Helmet } from 'react-helmet'

import DefaultLayout from './layout/default'

export const AppContext = React.createContext({})

const App = () => (
  <div>
    <Helmet title="MeteourApolloReact starter">
      <meta name="Description" content="Meter-Apollo-React starter KIT., React Router 4, Apollo 2, Graphql, Accounts through graphql" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Weather PWA" />

      <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png" />
      <meta name="msapplication-TileColor" content="#2F3BA2" />

      <meta name="theme-color" content="#2F3BA2" />

      <link rel="apple-touch-icon" href="images/icons/icon-152x152.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>

    <DefaultLayout />
  </div>
  
)

export default App
