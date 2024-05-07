const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

//* get tasks  ... */
const getAllItems =  asyncWrapper( async(req,res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})

//* get single task ... */
const getSingleItem = asyncWrapper( async(req,res) => {
        const {id:taskId} =req.params
        const task = await Task.findOne({_id :taskId})
       if(!task){
        return res.status(404).json({msg:`no task with the id  ${taskId}`})
       }
        res.status(200).json({task})
})

//* create a new task */
const createTask = asyncWrapper (async (req,res) => {
        const task = await Task.create(req.body)
        res.status(200).json({task})
  })
//* update task  ... */
const updateTask = asyncWrapper( async (req,res) => {
        const {id:taskId} = req.params
        const task = await Task.findOneAndUpdate({_id:taskId}, req.body,{
            new:true ,runValidators:true,
        })
        if(!task){
            return res.status(404).json({msg:`no task with the id  ${taskId}`})
           }
        res.status(200).json({task})
})


//* delete task  ... */
const deleteTask = asyncWrapper(async(req,res) => {
        const {id:taskId} =req.params
        const task = await Task.findOneAndDelete({_id :taskId})
       if(!task){
        return res.status(404).json({msg:`no task with the id  ${taskId}`})
       }
      
        res.status(200).json({task})
        /* res.status(200).json({task:null , status:'success'}) */
       /*  res.status(200).send() */
}
)
module.exports = {getAllItems ,getSingleItem ,createTask ,updateTask, deleteTask}
