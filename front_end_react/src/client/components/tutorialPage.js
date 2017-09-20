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
require('../../resources/images/tutorial2.png')
require('../../resources/images/tutorial3.png')
require('../../resources/images/tutorial4.png')
require('../../resources/images/tutorial5.png')

class tutorialPage extends Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Panel header={<h4>Welcome!</h4>} bsStyle='primary'>
              <Row>
                <Col xs={12} md={12}>
                  <p>
                    Thank you for agreeing to participating in our interactive survey on severity analysis of vulnerabilities in C programs.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <p>
                    We have analyzed some C programs using our in-house compositional analysis tool, that uses static analysis and <a href='https://en.wikipedia.org/wiki/Symbolic_execution'>symbolic execution</a>, to look for <i>buffer-overflow vulnerabilities</i>. However, we would like to have experts, like yourself, assess these vulnerabilities in order of priorities that you might fix them.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <p>
                    To make this task easier, we have analyzed each vulnerable C function based on features such as the vulnerabile instructions found, the incoming parameters, the way this function interacts with the rest of the program etc. Then, using machine learning, we have predicted CVSS3 base score values based on these features. <a href='https://www.first.org/cvss/calculator/3.0'>CVSS3</a> is a common vulnerability scoring system, that is widely used by practitioners to rate vulnerabilities in real-world programs.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <p>
                    Your task in this exercise is to select one or more programs of your choice, look at color-coded call-graphs where we have discovered and (automatically) rated vulnerabilities, and give us feedback on whether you agree with the CVSS3 base scores. You may also, of course, change the suggested values based on your experience.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <p>
                    For a refresher on what CVSS3 base score values are, please refer back to their <a href='https://www.first.org/cvss/user-guide'>quick guide</a>.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <div>
                    Here are some helpful tips to carry out this task:
                    <ol>
                      <li>
                        Not all functions in the call-graph contain vulnerabilities. If the CVSS3 base scores values are not visible upon clicking on a function, that means our tools could not find a vulnerbility in them.
                      </li>
                      <li>
                        The directions on the arrows denote the direction of function call, i.e. they originate from the parent function (caller) and point to the child function (callee).
                      </li>
                      <li>
                        We realize that in many cases, the user needs more information than just the call-graph of the program. Therefore, when you click on a function node in the graph, an option to download the (partial) source code file containing the function is shown. We recommend that you look at the source, search for the function definition, and see if the incoming parameters need to be sanitized to prevent a buffer overflow.
                      </li>
                      <li>
                        If two "connected" functions, A->B, have reported vulnerabilities, then our suggestion is to fix the callee, B, first. Our prediction mechanism tries its best to assign higher CVSS base score values to the callee in such cases but, depending on the other function attributes, it might not match the real severity of the vulnerability. We ask our user to use their best judgement in such cases.
                      </li>
                      <li>
                        If, after a careful analysis, you do not agree with our CVSS3 base score values, please change them appropriately and leave us a short note on how we may have gotten it wrong. You may leave us as many feedback points for as many functions as you like. You won't be taken away from the analysis page if you click on "Submit".
                      </li>
                      <li>
                        You may click on the Back button in your browser to see the list of available programs, once you're done analyzing the current program.
                      </li>
                      <li>
                        Finally, if you agree to participate non-anonymously in the survey, we would love to enter you in an Amazon gift-coupon giveaway. This, however, is not necessary and you may also participate anonymously.
                      </li>
                    </ol>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <p>
                    We would like to thank you again for your time and valuable feedback. Please don't hesitate to contact us using the link above, in case you have difficulties navigating the system or have any other questions or suggestions.
                  </p>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Panel header={<h4>Instructions</h4>} bsStyle='info'>
              <Row>
                <Col xs={4} md={4}>
                  <h3>Step 1: Select a program to analyze</h3>
                  <Thumbnail src='/assets/images/tutorial1.png' alt='242x200'>
                    <p>
                      Please select a program from the list shown, read the description, and click on "View Callgraph" when you are ready.
                    </p>
                  </Thumbnail>
                </Col>
                <Col xs={8} md={8}>
                  <h3>Step 2: Analyze the callgraph</h3>
                  <Thumbnail src='/assets/images/tutorial2.png' alt='242x200'>
                    <p>
                      A callgraph will show you the interaction between all functions, and their respective graph attributes if you click on them. <br /><br />
                      You can move all nodes around, in case you want to focus in just one subsection of it. Each node's color represents the severity of the vulnerability found in it.
                    </p>
                  </Thumbnail>
                </Col>
                <Col xs={8} md={8}>
                  <h3>Step 3: Analyze the Code</h3>
                  <Thumbnail src='/assets/images/tutorial3.png' alt='242x200'>
                    <p>
                      If you want to access the source code that was run through our internal symbolic execution program, you can access it by clicking on "Code" followed by "To code".
                    </p>
                  </Thumbnail>
                </Col>
                <Col xs={12} md={12}>
                  <h3>Step 4: Change the CVSS3 base scores if you need to</h3>
                  <Thumbnail src='/assets/images/tutorial4.png' alt='242x200'>
                    <p>
                      We will show you (if there is a vulnerability in a specific node) the CVSS3 base scores for it, which have been automatically generated by us. Please change anything that you think is wrong.
                    </p>
                  </Thumbnail>
                </Col>
                <Col xs={12} md={12}>
                  <h3>Step 5: Send us your feedback!</h3>
                  <Thumbnail src='/assets/images/tutorial5.png' alt='242x200'>
                    <p>
                      Please let us know how our tool could improve, and if you have found an error in our calculations, let us know! (please make sure you leave your new CVSS3 Scores selected).
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
