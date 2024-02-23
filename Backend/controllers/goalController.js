const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel') //chama o modulo do modelo.
const User = require('../models/userModel')

//funções modularizadas - apis definidas pelo controlador.

//@desc Get Goals
//@route GET /api/goals
//@acess Private
const getGoals =  asyncHandler(async(req, res) => {
    const goals = await Goal.find({ user: req.user.id }) //no momento buscando todos os dados.
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
        user: req.user.id, //fornecer o id.
    })



    res.status(200).json(goal)
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

    const user = await User.findById(req.user.id) //ao logar temos o usuario

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not Found')
    }
    
    //Make Sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){ //ao logar foi recebido o id do usuario e compara com o existente se for diferente
        res.status(401)
        throw new Error('User not authorized')
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

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not Found')
    }
    
    //Make Sure the looged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
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
