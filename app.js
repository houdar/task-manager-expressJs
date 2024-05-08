const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const db = require('./db/connection')
const notFound = require('./middleware/not_found')
const errorHandler =require('./middleware/error')

require('dotenv').config()

//* Json middleware  */
app.use(express.json())
app.use(express.static('./public'))

//*routes

app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandler)
const port =process.env.PORT || 4000


const startConnection = async () =>{
    try{
        await db(process.env.MONGO_URI)
        app.listen(port , ()=>{
            console.log(`server running on port ${port}`);
        })
        
    }
    catch(err){
     console.log(err);
    }
}
startConnection()
//*need to be done 
//app.get('api/v1 /tasks')        -get all tasks 
//app.post('api/v1 /tasks')       -create a new task 
//app.get('api/v1 /tasks/:id')    -get single task
//app.patch('api/v1 /tasks/:id')  -update task 
//app.delete('api/v1 /tasks/:id') -delete task


