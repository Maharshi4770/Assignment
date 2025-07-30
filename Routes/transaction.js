const { Router } = require('express');
const {createTransaction} = require('../controller/transaction')
const transactionRouter = Router();

transactionRouter.post("/",createTransaction);

module.exports = {
    transactionRouter
}