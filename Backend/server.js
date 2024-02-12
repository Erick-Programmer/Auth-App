const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./errorMiddleware/errorMiddleware')
const port = process.env.PORT || 8000

const app = express() 

app.use(express.json()) //reconhece arquivos
app.use(express.urlencoded({extended: false})) //reconhece arquivo string

app.use('/api/goals', require('./routes/goalRoutes')) //chamamos metodo router

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))



