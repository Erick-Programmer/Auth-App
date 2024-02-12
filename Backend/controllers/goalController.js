const asyncHandler = require('express-async-handler')

//funções modularizadas - apis definidas pelo controlador.

//@desc Get Goals
//@route GET /apis/goals
//@acess Private
const getGoals =  asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Get goals`})
})

//@desc Set Goals
//@route POST /apis/goals
//@acess Private
const setGoals =  asyncHandler(async (req, res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
        // res.status(400).json({ message: 'Please add a text field'})
    }
    res.status(200).json({ message: 'Set goals'})
})

//@desc Update Goals
//@route PUT /apis/goals
//@acess Private
const updateGoals =  asyncHandler(async (req, res)=> {
    res.status(200).json({ message: `Update goals ${req.params.id}`})
})

//@desc Delete Goals
//@route DELETE /apis/goals
//@acess Private
const deleteGoals =  asyncHandler(async (req, res)=> {
    res.status(200).json({ message: `Delete goals ${req.params.id}`})
})

//exportar
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}
