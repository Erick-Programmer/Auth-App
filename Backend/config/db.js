const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) //conexao uri
        
        console.log(`Mongoose Connected: ${conn.connection.host}`.cyan.underline)
    } catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB