import React from 'react'
import { Route } from 'react-router-dom'

import DefaultNav from '../components/nav/DefaultNav'

import routes from '/imports/routes'


const mainStyle={
  display:"flex",
  justifyContent:"center"
}

const style={
  width: "1024px"
}


const DefaultLayout = () => (
  <main style={mainStyle}>
    <div style={style}> 
      <DefaultNav />
      <hr style={{ marginBottom: "50px" }} />
      {
        Object.keys(routes).map(key => {
          const route = routes[key].route
          return (
            <Route key={key} {...route} />
          )
        })
      }
    </div>
  </main>
)

export default DefaultLayout
