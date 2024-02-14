const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel') //chama o modulo do modelo.

//funções modularizadas - apis definidas pelo controlador.

//@desc Get Goals
//@route GET /api/goals
//@acess Private
const getGoals =  asyncHandler(async(req, res) => {
    const goals = await Goal.find() //no momento buscando todos os dados.
    // res.status(200).json({ message: `Get goals`})
    res.status(200).json({goals})
})

//@desc Set Goals
//@route POST /api/goals
//@acess Private
const setGoals =  asyncHandler(async (req, res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
        // res.status(400).json({ message: 'Please add a text field'})
    }
    // res.status(200).json({ message: 'Set goals'})
    const goal = await Goal.create({
        text: req.body.text,
    })

    res.status(200).json({goal})
})

//@desc Update Goals
//@route PUT /api/goals
//@acess Private
const updateGoals =  asyncHandler(async (req, res)=> {
    const goal = await Goal.findById(req.params.id) //procura pelo id

    if(!goal) { //se nao encontra o id
        res.status(400)
        throw new Error('Goal not found')
    }
    
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
        {new: true,}) //se existir o id lança novo conteúdo
    
    // res.status(200).json({ message: `Update goals ${req.params.id}`})
    res.status(200).json(updatedGoal)
})

//@desc Delete Goals
//@route DELETE /api/goals
//@acess Private
const deleteGoals =  asyncHandler(async (req, res)=> {
    const goal = await Goal.findById(req.params.id) //procura pelo id

    if(!goal) { //se nao encontra o id
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.deleteOne() //achado o id, deleta dados.
    
    // res.status(200).json({ message: `Delete goals ${req.params.id}`})
    res.status(200).json({ id: req.params.id })
})

//exportar
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}
