const { Router } = require('express');
const farmerRouter = Router();
const { signup, signin} = require('../controller/farmer')

farmerRouter.post("/signup",signup)
farmerRouter.post("/signin",signin)


module.exports = {
    farmerRouter
}