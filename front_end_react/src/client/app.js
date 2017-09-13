import React, { Component } from 'react'
import { object } from 'prop-types'

import Link from 'react-router-dom/Link'
import { renderRoutes } from 'react-router-config'

class App extends Component {
  constructor (props) {
    super(props)
    // getting the language from the url param set in the router
    this.program = props.location.url
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <header className='mdl-layout__header'>
          <div className='mdl-layout__header-row'>
            <span className='mdl-layout-title'>React Universal App (SSR + SW)</span>
            <div className='mdl-layout-spacer' />
            <nav className='mdl-navigation'>
              <Link className='mdl-navigation__link' to='/graphs'> Graphs </Link>
            </nav>
          </div>
        </header>
        <div className='mdl-layout__drawer'>
          <span className='mdl-layout-title'>React Universal App (SSR + SW)</span>
          <nav className='mdl-navigation'>
            <Link className='mdl-navigation__link' to='/graphs'> Graphs </Link>
          </nav>
        </div>
        <main className='mdl-layout__content'>
          {renderRoutes(this.props.route.routes)}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  route: object,
  location: object
}

export default App
