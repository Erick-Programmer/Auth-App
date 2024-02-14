const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, //id.
            required: true,
            ref: 'User',
        },
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