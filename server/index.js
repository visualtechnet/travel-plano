require('dotenv').config();

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const port = process.env.PORT || 8090


const app = express()
const router = express.Router()

app.use(helmet());
app.use(cor());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('dist'))