const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Register new user
//@route POST /api/users
//@acess Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){ //caso nao tenha nome, email e password, sejam falses.
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    // res.json({ message: 'Register User'})
})

//@desc Authentic a user
//@route POST /api/users/login
//@acess Public
const loginUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){ //se bater email com senha(token) e senha colocada
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    // res.json({ message: 'Login User'})
})

//@desc Get user data
//@route GET /api/users/me
//@acess Private
const getMe = asyncHandler(async(req, res) => {
    res.json({ message: 'User data display'}) //ate o momento sem token na solicitação!
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}

