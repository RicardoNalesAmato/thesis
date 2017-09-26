import React from 'react'
import express from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'

import template from './template'
import routes from '../common/routes'

const server = express()
let bodyParser = require('body-parser')
let mysql = require('mysql')

let connection = mysql.createConnection({
  host: process.env.DB_PORT_3306_TCP_ADDR,
  user: 'root',
  password: 'root',
  database: 'tum_feedback'
})

// Establishing the MYSQL DB Connection
connection.connect(function (err) {
  if (err) throw err
  console.log('MYSQL DB Connection successful...')
})

server.use('/assets', express.static('assets'))
server.use('/code', express.static(path.join('assets', 'code')))

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())

// GET General Handler
server.get('*', (req, res) => {
  const content = renderToString(
    <StaticRouter location={req.url} context={{}}>
      {renderRoutes(routes)}
    </StaticRouter>
  )

  res.send(template({
    body: content,
    title: 'Front-end'
  }))
})

// POST Feedback Handler
server.post('/feedback', (req, res) => {
  let name = typeof req.body.name !== 'undefined' ? req.body.name : ''
  let email = typeof req.body.email !== 'undefined' ? req.body.email : ''
  let AV = typeof req.body.AV !== 'undefined' ? req.body.AV : ''
  let S = typeof req.body.S !== 'undefined' ? req.body.S : ''
  let AC = typeof req.body.AC !== 'undefined' ? req.body.AC : ''
  let C = typeof req.body.C !== 'undefined' ? req.body.C : ''
  let PR = typeof req.body.PR !== 'undefined' ? req.body.PR : ''
  let UI = typeof req.body.UI !== 'undefined' ? req.body.UI : ''
  let I = typeof req.body.I !== 'undefined' ? req.body.I : ''
  let A = typeof req.body.A !== 'undefined' ? req.body.A : ''

  let insertArray = [req.body.programName, name, email, req.body.feedbackText, req.body.visitedNodes, AV, S, AC, C, PR, UI, I, A]
  connection.query('INSERT INTO feedback (program, name, email, comment, selected_nodes, AV, S, AC, C, PR, I, UI, A) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', insertArray, function (err, result) {
    if (err) throw err
    res.send(result)
  })
})

let port = 9090
server.listen(port)
console.log('listening on port:', port)
