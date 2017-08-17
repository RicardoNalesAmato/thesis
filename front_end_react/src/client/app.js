import React, { Component } from 'react'
import { createGraph } from './graphs'
import { Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap'

const cvss3 = (
  <h3>CVSS3 Base Scores</h3>
)

const nodeData = (
  <h3>Node Data</h3>
)

export default class App extends Component {

  // componentWillMount () {
//
//  }
  render () {
    return (
      <Grid>
        <Row>
          <PageHeader>
            Callgraph severity assessments
          </PageHeader>
        </Row>
        <Row className='show-grid'>
          <Col xs={12} md={8}>
            <svg width='700' height='700' />
          </Col>
          <Col xs={6} md={4}>
            <Panel header={nodeData} bsStyle='info'>
              <p id='nodeData' />
            </Panel>
          </Col>
        </Row>
        <Row className='show-grid'>
          <Row>
            <Panel header={cvss3} bsStyle='primary'>
              <p id='cvssScore' />
            </Panel>
          </Row>
        </Row>
      </Grid>
    )
  }

  componentDidMount () {
    // Loading the graph
    createGraph()
  }
}
