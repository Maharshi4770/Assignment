const express = require('express')
const app = express()

require('dotenv').config()
app.use(express.json());
const mongoose = require('mongoose')
const {buyerRouter} = require('./Routes/buyer')
const {farmerRouter} = require('./Routes/Farmer')
const {transactionRouter} = require('./Routes/transaction')


app.use("/farmer",farmerRouter);
app.use("/buyer",buyerRouter)
app.use("/transaction",transactionRouter)


async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("Listening on port 3000")
}

main()