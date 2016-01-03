# HTTP web server for the sentiment library
# See https://github.com/thisandagain/sentiment
#
# Send POST requests with the text you want to analyse to
# the container IP port 8888 as form data, in the 'text' key.
# The response contains JSON-encoded results from the Sentiment library.
#
# Example request:
# `$ curl --data "text=I%20am%20happy" http://localhost:8888`
# Example response:
# `{"score":3,"comparative":1,"tokens":["i","am","happy"],"words":["happy"],"positive":["happy"],"negative":[]}`

# Import dependencies
sentiment = require 'sentiment'
express = require 'express'
morgan = require 'morgan'
bodyParser = require 'body-parser'

app = express()

# Middleware for decoding incoming POST data
app.use bodyParser.urlencoded({extended: true})

# Log webserver activity to stdout
app.use morgan('combined')

# Accept incoming POST requests to '/'
# Requests should contain the text-to-be-analysed in the 'text' field as POST data
app.post '/', (req, res) ->

  if not req.body.text then res.sendStatus 400
  s = sentiment(req.body.text)
  res.send s

# Start the server
server = app.listen 8888, '0.0.0.0', ->
  host = server.address().address
  port = server.address().port
  console.log 'Sentiment webserver listening at http://%s:%s', host, port
  console.log 'Send POST requests with urlencoded "text" field as the payload.'
