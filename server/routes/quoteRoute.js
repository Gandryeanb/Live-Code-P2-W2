const route = require('express').Router()
const isLogin = require('../middlewares/isLogin')
const QuoteController = require('../controllers/quoteControllers')

route.post('/', isLogin,QuoteController.createQuote)
route.get('/', QuoteController.findAll)
route.delete('/:id',isLogin, QuoteController.deleteQuote)

module.exports = route