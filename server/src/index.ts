import express from 'express'
import bodyParser from 'body-parser'

import interestRoutes from './routes/interest'

const app = express()

app.set("port", process.env.PORT || 3001)

app.use(bodyParser.json())


app.use('/interest', interestRoutes)

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})