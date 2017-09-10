import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../client/app'
import template from './template'

const server = express()

server.use('/assets', express.static('assets'))
server.use('/code', express.static(path.join('assets', 'code')))

server.get('/', (req, res) => {
  const appString = renderToString(<App />)

  res.send(template({
    body: appString,
    title: 'Front-end'
  }))
})

let port = 9090
server.listen(port)
console.log('listening on port:', port)
