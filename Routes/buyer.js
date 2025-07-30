const { Router } = require('express');
const { buyerModel } = require('../models/buyer')
const buyerRouter = Router();
const {signup, signin } = require('../controller/buyer')

buyerRouter.post("/signup",signup)

buyerRouter.post("/signin",signin)

module.exports = {
    buyerRouter
}