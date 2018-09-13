require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const db = mongoose.connection;
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/liveCodeW2');

const userRoute = require('./routes/userRoute')
const quoteRoute = require('./routes/quoteRoute')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(`/users`, userRoute)
app.use(`/quotes`, quoteRoute)

app.get('/', (req, res) => {
    res.status(200).json({
        message: `server ON!`
    })
})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(`> conected to DB`)
});

app.listen(port, () => {
    console.log(`> i'm listening to port ${port}`);
})