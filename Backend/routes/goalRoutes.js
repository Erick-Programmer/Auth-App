const express = require('express')
const router = express.Router()
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalController') //chamar módulos

router.route('/').get(getGoals).post(setGoals) //metodo get e post
router.route('/:id').put(updateGoals).delete(deleteGoals) //metodo put e delete

// router.get('/', getGoals)

// router.post('/', setGoals)

// router.put('/:id', UpdateGoals)

// router.delete('/:id', deleteGoals)

module.exports = router