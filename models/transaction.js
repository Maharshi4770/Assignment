const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const itemSchema = new Schema({
    itemName: String,
    totalWeight: Number,        
    pricePer20Kg: Number,       
    totalBags: Number           
});


const transactionSchema = new Schema({
    farmerId: { type: ObjectId, ref: 'farmer', required: true },
    buyerId: { type: ObjectId, ref: 'buyer', required: true },
    items: [itemSchema],
    totalItemPrice: Number,
    userCharge: Number,
    labourCharge: Number,
    weightMachineCharge: Number,
    totalPayable: Number
})

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = {
    transactionModel
}