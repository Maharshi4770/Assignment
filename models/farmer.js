const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
    username: String,
    password: String,
    Addresss: String
})


const farmerModel = mongoose.model("farmer",farmerSchema);

module.exports = {
    farmerModel
}