import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from 'react-router-dom/Link'
import { renderRoutes } from 'react-router-config'
import {
  PageHeader
} from 'react-bootstrap'

class App extends Component {

  componentWillMount () {
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <PageHeader>
          Callgraph severity assessments
          <nav className='mdl-navigation'>
            <Link className='mdl-navigation__link' to='/graphs/:program'> AutoTrace </Link>
          </nav>
        </PageHeader>
        <main className=''>
          {renderRoutes(this.props.route.routes)}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  route: PropTypes.object
}

export default App
