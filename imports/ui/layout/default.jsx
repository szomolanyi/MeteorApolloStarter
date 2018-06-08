import React from "react"
import { Route } from "react-router-dom"

import DefaultNav from '../components/nav/DefaultNav'
import GreetingsPage from "../greetings/GreetingsPage"
import Page2 from "../Page2"
import FrontPage from "../FrontPage"
import LoginForm from "../user/LoginForm"
import RegisterForm from "../user/RegisterForm"

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
      <hr style={{marginBottom:"50px"}}/>
      <Route exact path="/" component={FrontPage} />
      <Route path="/login" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/greetings" component={GreetingsPage} />
      <Route path="/page2" component={Page2} />
    </div>
  </main>
)

export default DefaultLayout
