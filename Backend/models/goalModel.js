const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        text: {
            type: String, //Usuário
            required: [true, 'Please add a text value']
        },

    },

    {
        timestamps: true, //Carimbo de data e hora
    }
)

module.exports = mongoose.model('Goal', goalSchema)