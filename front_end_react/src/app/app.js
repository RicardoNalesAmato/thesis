import React, { Component } from 'react'
import { createGraph } from './graphs'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap'

export default class App extends Component {
  render () {
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={8}>
            <svg width='960' height='600' />
          </Col>
          <Col xs={6} md={4}>
            <Jumbotron>
              <p id='nodeData'>
                Node data
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row className='show-grid'>
          <Jumbotron>
            <p id='cvssData'>
              CVSS3 Data
            </p>
          </Jumbotron>
        </Row>
      </Grid>
    )
  }

  componentDidMount () {
    createGraph()
  }
}
