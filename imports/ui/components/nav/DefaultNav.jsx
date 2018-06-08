
import React from 'react'
import { Link } from 'react-router-dom'

import { withUser } from '/imports/hocs'

import LogoutButton from '/imports/ui/user/LogoutButton'

const style={
  display: "flex",
  justifyContent: "space-between"
}

const leftNav={
  display: "flex",
  justifyContent: "flex-start"
}

const rightNav = {
  display: "flex",
  justifyContent: "flex-right"
}

const linkStyle={
  margin: "0 5px"
}

const LoggedUser = ({user}) => (
  <LogoutButton />
)

const NotLogged = () => (
  <div>
    <Link to="/register" style={linkStyle}>Register</Link>
    <Link to="/login" style={linkStyle}>Login</Link>
  </div>
)

const DefaultNav = ({user}) => (
  <nav style={style}>
    <div style={leftNav}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/greetings" style={linkStyle}>Greetings</Link>
      <Link to="/page2" style={linkStyle}>Page2</Link>
    </div>
    <div style={rightNav}>
      {
        user.isLogged ? <LoggedUser user={user} /> : <NotLogged />
      }
    </div>
  </nav>
)

export default withUser(DefaultNav)
