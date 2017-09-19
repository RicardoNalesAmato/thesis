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
          <Row>
            <Col xs={2} md={1}>
              <Link className='mdl-navigation__link' to='/'>
                <Image src='https://distributed-campus.org/tumwelcomeguide/images/uni_logos/uni_logo.png' responsive />
              </Link>
            </Col>
            <Col xs={8} md={9}>
              <small>
                <div>
                  Callgraph Severity Assessment Tool
                </div>
                <div>
                  Assessment of bugs found via compositional symbolic execution
                </div>
              </small>
            </Col>
            <Col xs={2} md={1}>
              <a href='mailto:ognawala@in.tum.de?subject=Feedback&cc=rnalesa@gmail.com'>
                <img width={50} height={50} src='https://furtaev.ru/preview/mail_3_small.png' alt='Image' />
              </a>
            </Col>
          </Row>
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
