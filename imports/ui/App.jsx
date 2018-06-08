import React from "react"

import DefaultLayout from './layout/default'

export const AppContext = React.createContext({})

const App = () => (
  <DefaultLayout />
)

export default App
