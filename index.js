const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const authRoute = require('./routes/AuthRoutes')
dotenv.config()

const app = express();

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}

mongoose.connect(process.env.DB_CONNECT, options)
        .catch((err) => console.log(err, 'initial DB conneciton error'))

mongoose.connection.on('error', () => {
    console.log('There was an error after the intial connection of mongoDB')
})

mongoose.connection.once('open', () => {
    console.log('MongoDB is running')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/api/user', authRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})