import React, { Component } from 'react'
import Link from 'react-router-dom/Link'

import {
  Button
} from 'react-bootstrap'

class tutorialPage extends Component {
  render () {
    return (
      <nav className='mdl-navigation'>
        <Link className='mdl-navigation__link' to='/program_selection'>
          <Button bsStyle='success'>
            Select program
          </Button>
        </Link>
      </nav>
    )
  }
}

export default tutorialPage
