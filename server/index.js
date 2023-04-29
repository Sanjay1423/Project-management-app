const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT 
const schema = require('./schema/schema')
const connectDB = require('./config/database')

//Connect to Database
connectDB()

app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.get('/',(req,res) => {
    res.send('<h1>How are you</h1>')
})

app.listen(port,() => console.log(`Server is running at port ${port}`))