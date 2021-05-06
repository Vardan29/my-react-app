
const {Schema, model, Types} = require('mongoose')

const schema= new Schema({
    owner:{type:Types.ObjectId,ref:'User'},
    date:{type:Date, default:Date.now},
    text:{type:String,required:true}
})

module.exports = model('Todo',schema)