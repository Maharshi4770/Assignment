const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    username: String,
    password: String
})


const buyerModel = mongoose.model("buyer",buyerSchema);

module.exports = {
    buyerModel
}
