import * as d3 from 'd3'
import CVSS from './cvss3.js'

let visitedNodes
let $, cvssPanel, cvssScorePanel, selectedNode
let canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

if (canUseDOM) {
  $ = require('jquery')
}

export function createGraph (data) {
  visitedNodes = {}
  if (canUseDOM) {
    cvssPanel = $('#cvssPanel').addClass('hidden')
    cvssScorePanel = $('#cvssScorePanel').addClass('hidden')
  }
  let svg = d3.select('svg')

  let width = svg.attr('width')
  let height = svg.attr('height')

  svg = svg.call(d3.zoom().on('zoom', zoomed)).append('g')

  svg.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 20)
    .attr('refY', 0)
    .attr('markerWidth', 8)
    .attr('markerHeight', 8)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')

  let color = d3.scaleOrdinal(d3.schemeCategory10)

  let simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function (d) { return d.id }).distance(function () { return 200 }))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))

  function createGraph (error, graph) {
    if (error) throw error

    let link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
      .attr('stroke', function (d) { return color(d.type) })
      .attr('marker-end', 'url(#arrow)')

    let node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(graph.nodes)
      .enter().append('circle')
      .attr('r', 10)
      .attr('fill', function (d) {
        // Color of the Node
        if (typeof d.data !== 'undefined') {
          return d.data.faulty ? cvssScoreColor(d.data.cvss3.baseScore) : cvssScoreColor(0)
        } else {
          return '#ffffff'
        }
      })
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    let text = svg.append('g').attr('class', 'labels').selectAll('g')
      .data(graph.nodes)
      .enter().append('g')
    text.append('text')
      .attr('x', 14)
      .attr('y', '.31em')
      .style('font-family', 'sans-serif')
      .style('font-size', '0.7em')
      .text(function (d) {
        // ID of the Node - Just shows labels for Nodes with CVSS3 > 5
        if (typeof d.data !== 'undefined') {
          if (d.data.faulty) {
            return d.data.cvss3.baseScore > 5 ? d.id : ''
          } else {
            return ''
          }
        } else {
          return ''
        }
      })

    node.on('click', function (d) {
      if (canUseDOM) {
        // Handle on click of nodes
        nodeData(d)
      }
    })
    node.append('title')
      .text(function (d) { return d.id })
    simulation
      .nodes(graph.nodes)
      .on('tick', ticked)

    simulation.force('link')
      .links(graph.links)

    function ticked () {
      link
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })

      node
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })

      text
        .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' })
    }
  }

  function dragstarted (d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged (d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  function dragended (d) {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  function zoomed () {
    svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ')' + ' scale(' + d3.event.transform.k + ')')
  }

  createGraph(false, data)
}

function nodeData (node) {
  selectedNode = node
  // Add visited node to the set
  visitedNodes[selectedNode.id] = 'selected'
  let visitedNodesDOM = $('#visitedNodes')
  visitedNodesDOM.val('')
  for (let key in visitedNodes) {
    if (visitedNodes.hasOwnProperty(key)) {
      visitedNodesDOM.val(visitedNodesDOM.val() + key)
    }
  }
  console.log(visitedNodesDOM.val())
  // Displaying the data
  $('#nodeName').text(selectedNode.id)
  $('#nodeClustering').text(selectedNode.data.clustering_coefficient)
  $('#nodeDistance').text(selectedNode.data.distance_to_interface)
  $('#nodeMackeVul').text(selectedNode.data.macke_vulnerabilities_found)
  $('#nodeMackeChain').text(selectedNode.data.macke_bug_chain_length)
  $('#nodeDegree').text(selectedNode.data.node_degree[2])
  $('#nodePathLength').text(selectedNode.data.node_path_length)
  $('#nodeHasCvss').text(selectedNode.data.faulty)
  if (selectedNode.data.faulty || selectedNode.data.macke_vulnerabilities_found > 0) {
    cvssPanel.removeClass('hidden')
    let cvssValues = selectedNode.data.cvss3.vectorString.split('/')
    cvssValues.forEach(function (value) {
      value = value.replace(':', '_')
      $('#' + value).prop('checked', true)
    })
    // Update score
    updateScores()
    // Add listeners to radio buttons
    $('input[type=radio]').change(function () {
      updateScores()
    })
  } else {
    cvssScorePanel.addClass('hidden')
    cvssPanel.addClass('hidden')
  }
  // Display the node data
  $('#nodeData').removeClass('hidden')
}

/* ** updateScores **
 *
 * Updates Base, Temporal and Environmental Scores, and the Vector String (both in the web page and
 * in the fragment of the URL - the part after the "#").
 * If scores and vectors cannot be generated because the user has not yet selected values for all the Base Score
 * metrics, messages are displayed explaining this.
 */
function updateScores () {
  let result = CVSS.calculateCVSSFromMetrics(
    inputValue('input[type="radio"][name=AV]:checked'),
    inputValue('input[type="radio"][name=AC]:checked'),
    inputValue('input[type="radio"][name=PR]:checked'),
    inputValue('input[type="radio"][name=UI]:checked'),
    inputValue('input[type="radio"][name=S]:checked'),

    inputValue('input[type="radio"][name=C]:checked'),
    inputValue('input[type="radio"][name=I]:checked'),
    inputValue('input[type="radio"][name=A]:checked'),

    inputValue('input[type="radio"][name=E]:checked'),
    inputValue('input[type="radio"][name=RL]:checked'),
    inputValue('input[type="radio"][name=RC]:checked'),

    inputValue('input[type="radio"][name=CR]:checked'),
    inputValue('input[type="radio"][name=IR]:checked'),
    inputValue('input[type="radio"][name=AR]:checked'),
    inputValue('input[type="radio"][name=MAV]:checked'),
    inputValue('input[type="radio"][name=MAC]:checked'),
    inputValue('input[type="radio"][name=MPR]:checked'),
    inputValue('input[type="radio"][name=MUI]:checked'),
    inputValue('input[type="radio"][name=MS]:checked'),
    inputValue('input[type="radio"][name=MC]:checked'),
    inputValue('input[type="radio"][name=MI]:checked'),
    inputValue('input[type="radio"][name=MA]:checked'))
  if (result.success === true) {
    $('#cvssScore').text(result.baseMetricScore + ' ' + result.baseSeverity)
    cvssScorePanel.removeClass('hidden').css('background-color', cvssScoreColor(result.baseMetricScore)).css('color', 'white')
  }
}

function cvssScoreColor (score) {
  let color = '#53aa33'
  if (score > 0 && score < 4) {
    color = '#ffcb0d'
  } else if (score >= 4 && score < 7) {
    color = '#f9a009'
  } else if (score >= 7 && score < 9) {
    color = '#df3d03'
  } else if (score >= 9) {
    color = '#cc0500'
  }
  return color
}

function inputValue (q) {
  let e = document.querySelector(q)
  if (!e || e.nodeName.toLowerCase() !== 'input') return
  return e.value
}

