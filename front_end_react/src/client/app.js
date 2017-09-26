import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'

require('./css/styles.css')

import { renderRoutes } from 'react-router-config'
import {
  Image,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'

class App extends Component {

  componentWillMount () {
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Row>
              <Col xs={2} md={1}>
                <Link className='mdl-navigation__link' to='/'>
                  <Image src='https://distributed-campus.org/tumwelcomeguide/images/uni_logos/uni_logo.png' style={{marginTop: '2rem'}} responsive />
                </Link>
              </Col>
              <Col xs={8} md={9}>
                <h2>
                  <small>
                    <div>
                      Callgraph Severity Assessment Tool
                    </div>
                    <div>
                      Assessment of bugs found via compositional symbolic execution
                    </div>
                  </small>
                </h2>
              </Col>
              <Col xs={2} md={1}>
                <a href='mailto:ognawala@in.tum.de?subject=Feedback&cc=ricardo.nales@tum.de'>
                  <img width={50} height={50} src='https://furtaev.ru/preview/mail_3_small.png' style={{marginTop: '2rem'}} alt='Image' />
                </a>
              </Col>
            </Row>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href='/'>
                <small>Main Page</small>
              </NavItem>
              <NavItem eventKey={2} href='/program_selection'>
                <small>Program Selection</small>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
