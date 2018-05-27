import React from "react"
import { Route, Link } from "react-router-dom"

import Page1 from "./Page1"
import Page2 from "./Page2"
import FrontPage from "./FrontPage"

const App = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/page1">Page1</Link></li>
      <li><Link to="/page2">Page2</Link></li>
    </ul>
    <Route exact path="/" component={FrontPage} />
    <Route path="/page1" component={Page1} />
    <Route path="/page2" component={Page2} />
    
  </div>
)

export default App
