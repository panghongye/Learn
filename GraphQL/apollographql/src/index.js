import 'regenerator-runtime/runtime' // for use of async / await
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import schema from 'schema'
import { connectmysql } from 'connectors/mysql'

const start = async () => {
  const mysql = await connectmysql()

  const app = express()

  // API
  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
      context: { mysql },
      schema,
    }),
  )

  // GUI
  app.use(
    '/g',
    graphiqlExpress({
      endpointURL: '/graphql',
    }),
  )

  app.listen(777, () => {
    console.log(`Running on port ${777}.`)
  })
}

start()
