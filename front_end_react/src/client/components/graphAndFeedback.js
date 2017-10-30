import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createGraph } from '../graphs'
import swal from 'sweetalert'

const cvss3 = (
  <h4>CVSS3 Base Scores</h4>
)

import {
  Grid,
  Row,
  Col,
  Panel,
  FormGroup,
  Radio,
  ControlLabel,
  FormControl,
  Button,
  Label,
  Breadcrumb,
  Form
} from 'react-bootstrap'

class GraphsAndFeedback extends Component {
  constructor (props) {
    super(props)
    this.state = {
      program: this.props.program,
      openCode: false,
      openNodeAttributes: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
  }

  componentDidMount () {
    createGraph(this.state.program)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    let $ = require('jquery')

    $.ajax({
      type: 'POST',
      url: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/feedback',
      data: $('#feedbackForm').serialize(),
      success: function (data) {
        swal({
          title: 'Success',
          text: 'Thanks a lot!',
          icon: 'success',
          closeOnClickOutside: false,
          closeOnConfirm: true
        }).then(result => {
          console.log(result)
        })
      },
      dataType: 'json'
    })
  }

  render () {
    let code = require('../../resources/reference_code/' + this.props.programName + '.c')
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={8}>
            <svg width='800' height='600' />
          </Col>
          <Col xs={6} md={4}>
            <Panel header={'Vulnerability Color Coding'} bsStyle='info'>
              <Row>
                <Col md={1}>
                  <p className='circle' style={{backgroundColor: '#53aa33'}} />
                </Col>
                <Col md={5}>
                  <p>
                    0.0 None
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <p className='circle' style={{backgroundColor: '#ffcb0d'}} />
                </Col>
                <Col md={5}>
                  <p>
                    0.1 - 3.9 Low
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <p className='circle' style={{backgroundColor: '#f9a009'}} />
                </Col>
                <Col md={5}>
                  <p>
                    4.0 - 6.9 Medium
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <p className='circle' style={{backgroundColor: '#df3d03'}} />
                </Col>
                <Col md={5}>
                  <p>
                    7.0 - 8.9 High
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <p className='circle' style={{backgroundColor: '#cc0500'}} />
                </Col>
                <Col md={5}>
                  <p>
                    9.0 - 10.0 Critical
                  </p>
                </Col>
              </Row>
            </Panel>
            <Panel header={<Button onClick={() => this.setState({ openCode: !this.state.openCode })}>Code</Button>} bsStyle='success' collapsible expanded={this.state.openCode}>
              <Breadcrumb>
                <Breadcrumb.Item href={code.toString()} download>
                  Download code
                </Breadcrumb.Item>
              </Breadcrumb>
            </Panel>
            <Panel header={<Button onClick={() => this.setState({ openNodeAttributes: !this.state.openNodeAttributes })}>Node Attributes</Button>} bsStyle='info' collapsible expanded={this.state.openNodeAttributes}>
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
          </Col>
        </Row>
        <Row className='show-grid'>
          <Form action='' onSubmit={this.handleSubmit} id='feedbackForm'>
            <FormGroup>
              <Row>
                <Col md={9}>
                  <Panel header={cvss3} bsStyle='primary' id='cvssPanel'>
                    {/* First Row*/}
                    <Row className='show-grid'>
                      <Col md={6}>
                        <h4>Attack Vector (AV)</h4>
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
                      </Col>
                      <Col md={6}>
                        <h4>Scope (S)</h4>
                        <Radio name='S' inline id='S_U' value='U'>
                          Unchanged (U)
                        </Radio>
                        {' '}
                        <Radio name='S' inline id='S_C' value='C'>
                          Changed (C)
                        </Radio>
                      </Col>
                    </Row>
                    <Row className='show-grid'>
                      <Col md={6}>
                        <h4>Attack Complexity (AC)</h4>
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
                      </Col>
                      <Col md={6}>
                        <h4>Confidentiality (C)</h4>
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
                      </Col>
                    </Row>
                    <Row className='show-grid'>
                      <Col md={6}>
                        <h4>Privileges Required (PR)</h4>
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
                      </Col>
                      <Col md={6}>
                        <h4>Integrity (I)</h4>
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
                      </Col>
                    </Row>
                    <Row className='show-grid'>
                      <Col md={6}>
                        <h4>User Interaction (UI)</h4>
                        <Radio name='UI' inline id='UI_N' value='N'>
                          None (N)
                        </Radio>
                        {' '}
                        <Radio name='UI' inline id='UI_R' value='R'>
                          Required (R)
                        </Radio>
                      </Col>
                      <Col md={6}>
                        <h4>Availability (A)</h4>
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
                      </Col>
                    </Row>
                  </Panel>
                </Col>
                <Col md={3}>
                  <Panel header='CVSS3 Score' bsStyle='danger' id='cvssScorePanel'>
                    <h3>
                      <p id='cvssScore' />
                    </h3>
                  </Panel>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Panel header='Feedback' bsStyle='warning' id='feedbackPanel'>
                    <Row>
                      <Col md={12}>
                        <ControlLabel>Please leave us feedback about our calculations. For example, let us know why you changed base score values, if you did. Or what did you think about the calculated values.</ControlLabel>
                        {' '}
                        <FormControl name='feedbackText' componentClass='textarea' placeholder='...' required />
                        {' '}
                        <ControlLabel>Name ( Your name and e-mail are optional, but by filling them out you have the chance to win Amazon prizes!)</ControlLabel>
                        {' '}
                        <FormControl name='name' type='text' placeholder='Type your name here' />
                        {' '}
                        <ControlLabel>Email</ControlLabel>
                        {' '}
                        <FormControl name='email' type='email' placeholder='email@example.com' />
                        {' '}
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
              <input hidden type='text' id='visitedNodes' name='visitedNodes' />
              <input hidden type='text' id='programName' name='programName' value={this.props.programName} readOnly />
            </FormGroup>
          </Form>
        </Row>
      </Grid>
    )
  }
}

GraphsAndFeedback.propTypes = {
  program: PropTypes.object,
  programName: PropTypes.string
}

export default GraphsAndFeedback
