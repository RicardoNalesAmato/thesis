import React, { Component } from 'react'
import { createGraph } from './graphs'
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Panel,
  FormGroup,
  Radio,
  ControlLabel,
  FormControl,
  Button,
  Label,
  Breadcrumb
} from 'react-bootstrap'

const cvss3 = (
  <h4>CVSS3 Base Scores</h4>
)

const nodeData = (
  <h4>Node Data</h4>
)

let code = require('../resources/reference_code/input-tga.c')
let program

export default class GraphsAndFeedback extends Component {
  componentWillMount () {
    program = require('../resources/graphs/blueZ.json')
  }
  componentDidMount () {
    // Loading the graph
    createGraph(program)
  }
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
            <svg width='800' height='600' />
          </Col>
          <Col xs={6} md={4}>
            <Panel header={nodeData} bsStyle='info'>
              <div id='nodeData' className='hidden'>
                <Col xs={6} md={4}>
                  <Row>
                    <Label>Name</Label>
                    <div id='nodeName' style={{marginLeft: 20}} />
                  </Row>
                  <Row>
                    <Label>Clustering Coefficient</Label>
                    <div id='nodeClustering' style={{marginLeft: 20}} />
                  </Row>
                  <Row>
                    <Label>Distance to interface</Label>
                    <div id='nodeDistance' style={{marginLeft: 20}} />
                  </Row>
                  <Row>
                    <Label>Vulnerabilities found by Macke</Label>
                    <div id='nodeMackeVul' style={{marginLeft: 20}} />
                  </Row>
                  <Row>
                    <Label>Macke bug chain length</Label>
                    <div id='nodeMackeChain' style={{marginLeft: 20}} />
                  </Row>
                  <Row>
                    <Label>Node degree</Label>
                    <div id='nodeDegree' style={{marginLeft: 20}} />
                  </Row>
                  <Row>
                    <Label>Node path length</Label>
                    <div id='nodePathLength' style={{marginLeft: 20}} />
                  </Row>
                  <Row>
                    <Label>CVSS3 Data available</Label>
                    <div id='nodeHasCvss' style={{marginLeft: 20}} />
                  </Row>
                </Col>
              </div>
            </Panel>
            <Panel header={<Button>Code</Button>} bsStyle='success' collapsible>
              <Breadcrumb>
                <Breadcrumb.Item href={code.toString()} target='_blank'>
                  input-tga.c
                </Breadcrumb.Item>
              </Breadcrumb>
            </Panel>
          </Col>
        </Row>
        <Row className='show-grid'>
          <form>
            <Row>
              <Col md={9}>
                <Panel header={cvss3} bsStyle='primary' id='cvssPanel'>
                  {/* First Row*/}
                  <Row className='show-grid'>
                    <Col md={6}>
                      <h4>Attack Vector (AV)</h4>
                      <FormGroup>
                        <Radio name='AV' inline id='AV_N' value='N'>
                          Network (N)
                        </Radio>
                        {''}
                        <Radio name='AV' inline id='AV_A' value='A'>
                          Adjacent (A)
                        </Radio>
                        {' '}
                        <Radio name='AV' inline id='AV_L' value='L'>
                          Local (L)
                        </Radio>
                        <Radio name='AV' inline id='AV_P' value='P'>
                          Physical (P)
                        </Radio>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <h4>Scope (S)</h4>
                      <FormGroup>
                        <Radio name='S' inline id='S_U' value='U'>
                          Unchanged (U)
                        </Radio>
                        {' '}
                        <Radio name='S' inline id='S_C' value='C'>
                          Changed (C)
                        </Radio>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className='show-grid'>
                    <Col md={6}>
                      <h4>Attack Complexity (AC)</h4>
                      <FormGroup>
                        <Radio name='AC' inline id='AC_N' value='N'>
                          None (N)
                        </Radio>
                        {' '}
                        <Radio name='AC' inline id='AC_L' value='L'>
                          Low (L)
                        </Radio>
                        {' '}
                        <Radio name='AC' inline id='AC_H' value='H'>
                          High (H)
                        </Radio>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <h4>Confidentiality (C)</h4>
                      <FormGroup>
                        <Radio name='C' inline id='C_N' value='N'>
                          None (N)
                        </Radio>
                        {' '}
                        <Radio name='C' inline id='C_L' value='L'>
                          Low (L)
                        </Radio>
                        {' '}
                        <Radio name='C' inline id='C_H' value='H'>
                          High (H)
                        </Radio>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className='show-grid'>
                    <Col md={6}>
                      <h4>Privileges Required (PR)</h4>
                      <FormGroup>
                        <Radio name='PR' inline id='PR_N' value='N'>
                          None (N)
                        </Radio>
                        {' '}
                        <Radio name='PR' inline id='PR_L' value='L'>
                          Low (L)
                        </Radio>
                        {' '}
                        <Radio name='PR' inline id='PR_H' value='H'>
                          High (H)
                        </Radio>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <h4>Integrity (I)</h4>
                      <FormGroup>
                        <Radio name='I' inline id='I_N' value='N'>
                          None (N)
                        </Radio>
                        {' '}
                        <Radio name='I' inline id='I_L' value='L'>
                          Low (L)
                        </Radio>
                        {' '}
                        <Radio name='I' inline id='I_H' value='H'>
                          High (H)
                        </Radio>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className='show-grid'>
                    <Col md={6}>
                      <h4>User Interaction (UI)</h4>
                      <FormGroup>
                        <Radio name='UI' inline id='UI_N' value='N'>
                          None (N)
                        </Radio>
                        {' '}
                        <Radio name='UI' inline id='UI_R' value='R'>
                          Required (R)
                        </Radio>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <h4>Availability (A)</h4>
                      <FormGroup>
                        <Radio name='A' inline id='A_N' value='N'>
                          None (N)
                        </Radio>
                        {' '}
                        <Radio name='A' inline id='A_L' value='L'>
                          Low (L)
                        </Radio>
                        {' '}
                        <Radio name='A' inline id='A_H' value='H'>
                          High (H)
                        </Radio>
                      </FormGroup>
                    </Col>
                  </Row>
                </Panel>
              </Col>
              <Col md={3}>
                <Panel header='CVSS3 Score' bsStyle='danger' id='cvssScorePanel'>
                  <h2>
                    <p id='cvssScore' />
                  </h2>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Panel header='Feedback' bsStyle='warning' id='feedbackPanel'>
                  <Row>
                    <Col md={12}>
                      <FormGroup controlId='feedbackText'>
                        <ControlLabel>Since you have made changes to our original calculation, please let us know the
                          reasoning behind your changes.</ControlLabel>
                        <FormControl componentClass='textarea' placeholder='Thanks!' />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Row>
                        <Col md={8}>
                          <ControlLabel>The nodes you have worked with are: </ControlLabel>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8}>
                          <div id='visitedNodes' />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md={12}>
                      <Button type='submit'>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Panel>
              </Col>
            </Row>
          </form>
        </Row>
      </Grid>
    )
  }
}
