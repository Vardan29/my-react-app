  
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name:{type:String,required:true},
  surname:{type:String,required:true},
  gender:{type:String,required:true},
  birth:{type:String,required:true},
  phone:{type:String,required:true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  links: [{ type: Types.ObjectId, ref: 'Link' }],
  todos: [{ type: Types.ObjectId, ref: 'Todo' }]
})

module.exports = model('User', schema)