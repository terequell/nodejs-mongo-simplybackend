const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://terequell:Nokia32rus@cluster0-bjmoz.mongodb.net/test', {useNewUrlParser : true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error,', e => console.log(e))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server has been started...'))