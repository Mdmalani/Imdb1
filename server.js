// https://www.npmjs.com/package/imdb-node-api#imdb-api-definition
const express=require('express')
const app=express();
const router=express.Router()
const path=require('path')
const mongoose=require('mongoose')
const PORT=process.env.PORT||8000
const{MONGOURI}=require('./keys')
const imdb = require('imdb-node-api');
mongoose.connect(MONGOURI,{ useFindAndModify: false })

mongoose.connection.on('connected',()=>{
    console.log("connected")
})

mongoose.connection.on('error',(err)=>{
    console.log("error",err)
})


app.use(express.json())

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


if(process.env.NODE_ENV === 'production'){
    //set a static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client' , 'build' , 'index.html'));
    });
}


app.listen(PORT,()=>{
    console.log("server running",PORT)
})