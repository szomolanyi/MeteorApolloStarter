import React from "react"

import { withUser } from '/imports/hocs'

const Page2 = () => {
  return (
    <div>
      <h1>Page2</h1>
    </div>
  )
}

export default withUser(Page2)
