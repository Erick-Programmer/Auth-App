const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./Middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express() 

app.use(express.json()) //reconhece arquivos
app.use(express.urlencoded({extended: false})) //reconhece arquivo string

app.use('/api/goals', require('./routes/goalRoutes')) //chamamos metodo router
app.use('/api/users', require('./routes/userRoutes')) //chamamos metodo router


app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))



