import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import GraphsAndFeedback from './graphAndFeedback'

let program

class ProgramSelector extends Component {

  render () {
    program = require('../../resources/graphs/' + this.props.match.params.program + '.json')

    console.log(program)
    return (
      <Route path='/graphs/:program' render={props => (
        <GraphsAndFeedback {...props} program={program} />
      )} />
    )
  }
}

ProgramSelector.propTypes = {
  match: PropTypes.object
}

export default ProgramSelector
