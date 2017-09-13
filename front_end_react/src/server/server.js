import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'

import template from './template'
import routes from '../common/routes'

const server = express()

server.use('/assets', express.static('assets'))
server.use('/code', express.static(path.join('assets', 'code')))

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

let port = 9090
server.listen(port)
console.log('listening on port:', port)
