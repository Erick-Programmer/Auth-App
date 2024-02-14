const express = require('express')
const router = express.Router()
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalController') //chamar módulos
const { protect } = require('../Middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoals) //metodo get e post
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals) //metodo put e delete

// router.get('/', getGoals)

// router.post('/', setGoals)

// router.put('/:id', UpdateGoals)

// router.delete('/:id', deleteGoals)

module.exports = router