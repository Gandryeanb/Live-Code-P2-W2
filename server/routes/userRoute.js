const route = require('express').Router()
const UserController = require('../controllers/userControllers')

route.post('/register',UserController.createUser)
route.post('/login',UserController.loginUser)

module.exports = route