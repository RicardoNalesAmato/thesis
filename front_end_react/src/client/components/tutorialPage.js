import React, { Component } from 'react'
import Link from 'react-router-dom/Link'

import {
  Row,
  Col,
  Grid,
  Button,
  Panel,
  Thumbnail
} from 'react-bootstrap'

require('../../resources/images/tutorial1.png')

class tutorialPage extends Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Panel header={<h4>Requirements</h4>} bsStyle='primary'>
              <Row>
                <Col xs={6} md={6}>
                  Part 1
                </Col>
                <Col xs={6} md={6}>
                  Part 2
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  Part 3
                </Col>
                <Col xs={6} md={6}>
                  Part 4
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Panel header={<h4>Instructions</h4>} bsStyle='info'>
              <Row>
                <Col xs={12} md={12}>
                  <Thumbnail src='/assets/images/tutorial1.png' alt='242x200'>
                    <h3>Select a program to analyze</h3>
                    <p>
                      Please select a program from the list shown
                    </p>
                  </Thumbnail>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Thumbnail src='/assets/images/tutorial1.png' alt='242x200'>
                    <h3>Select a program to analyze</h3>
                    <p>
                      Please select a program from the list shown
                    </p>
                  </Thumbnail>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <nav className='mdl-navigation'>
                    <Link className='mdl-navigation__link' to='/program_selection'>
                      <Button bsStyle='success'>
                        Select program
                      </Button>
                    </Link>
                  </nav>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default tutorialPage
