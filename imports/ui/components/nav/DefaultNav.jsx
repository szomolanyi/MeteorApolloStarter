
import React from 'react'
import { Link } from 'react-router-dom'

import { withUser } from '/imports/hocs'

import LogoutButton from '/imports/ui/user/LogoutButton'

import routes from '/imports/routes'

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

const LinkGroup = ({keys}) => (
  <div>
    {
      keys.map(key => (
        <Link key={key} to={routes[key].link.to} style={linkStyle}>
          {routes[key].link.text}
        </Link>
      ))
    }
  </div>
)

const NotLogged = () => (
  <LinkGroup keys={["register", "login"]} />
)

const DefaultNav = ({user}) => (
  <nav style={style}>
    <div style={leftNav}>
      <LinkGroup keys={["home", "greetings", "page2"]} />
    </div>
    <div style={rightNav}>
      {
        user.isLogged ? <LoggedUser user={user} /> : <NotLogged />
      }
    </div>
  </nav>
)

export default withUser(DefaultNav)
