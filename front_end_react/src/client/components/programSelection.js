import React, { Component } from 'react'
import { Redirect } from 'react-router'

import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Panel
} from 'react-bootstrap'

class programSelection extends Component {

  constructor (props) {
    super(props)

    this.state = {
      redirect: false
    }
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={'/graphs/' + this.state.redirect} />
    } else {
      return (
        <Grid>
          <Row className='show-grid'>
            <Col xs={3} md={3}>
              <ListGroup>
                <ListGroupItem onClick={() => this.setState({redirect: 'blueZ'})}>
                  BlueZ 5.42
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'autoTrace'})}>
                  AutoTrace 0.31.1
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'graphicsMagic'})}>
                  GraphicsMagic 1.3.25
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'icoutils'})}>
                  Icoutils 0.31.1
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'imageMagic'})}>
                  ImageMagic 6.0.4-8
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'jasper'})}>
                  Jasper 1.900.27
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'autoTrace'})}>
                  Jasper 2.0.10
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'libarchive'})}>
                  Libarchive 3.2.1
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'libass'})}>
                  Libass 0.13.3
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'libmad'})}>
                  Libmad 0.15.1
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'libplist'})}>
                  Libplist 1.12
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'libsndfile'})}>
                  Libdsndfile 1.0.28
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'libxml2'})}>
                  Libxml2 2.9.4
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'lrzip'})}>
                  Lrzip 0.631
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'openslp'})}>
                  Openslp 2.0.0
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'potrace'})}>
                  Potrace 1.12
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'rzip'})}>
                  Rzip 2.1
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'tcpdump'})}>
                  Tcpdump 4.9.0
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'tifDirread'})}>
                  Tif Dirread
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'virglrenderer'})}>
                  Virglrenderer 0.5.0
                </ListGroupItem>
                <ListGroupItem onClick={() => this.setState({redirect: 'ytnef'})}>
                  Ytnef 1.9.2
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs={9} md={9}>
              <Panel header='Program Info' bsStyle='info'>
                <div id={'programInfo'}>
                  DATA
                </div>
              </Panel>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

export default programSelection
