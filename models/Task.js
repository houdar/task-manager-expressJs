const mongoose = require('mongoose')

taskSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true , 'please specify a task name '],
        trim:true
    } , completed:{
        tupe:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Task', taskSchema) 