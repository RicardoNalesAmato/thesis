import React from 'react'
import { render } from 'react-dom'

// Routing
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { renderRoutes } from 'react-router-config'

// Browser history -- allows to go back and forth
let createBrowserHistory = function () { require('history/createBrowserHistory') }
const history = createBrowserHistory()

import Routes from '../common/routes'

const AppRouter = () => {
  return (
    <BrowserRouter history={history}>
      {renderRoutes(Routes)}
    </BrowserRouter>
  )
}

render(<AppRouter />, document.getElementById('root'))
