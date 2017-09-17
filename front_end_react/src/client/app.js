import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'

import { renderRoutes } from 'react-router-config'
import {
  PageHeader,
  Image,
  Row,
  Col
} from 'react-bootstrap'

class App extends Component {

  componentWillMount () {
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        <PageHeader>
          <small>
            <Row>
              <Col xs={2} md={1}>
                <Link className='mdl-navigation__link' to='/'>
                  <Image src='https://distributed-campus.org/tumwelcomeguide/images/uni_logos/uni_logo.png' responsive />
                </Link>
              </Col>
              <Col>
                <div>
                  Callgraph Severity Assessment Tool
                </div>
                <div>
                  Assessment of bugs found via compositional symbolic execution
                </div>
              </Col>
            </Row>
          </small>
        </PageHeader>
        <main>
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
