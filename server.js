var express  = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var cors = require('cors');
const { ObjectId } = require('mongodb');

var app =express();
app.use(cors());

var client  = new MongoClient('mongodb+srv://suneel05644:16eiacs080@cluster0.w0ixv.mongodb.net/school?retryWrites=true&w=majority',{useNewUrlParser: true});

var connection;

client.connect((err,db)=>{

    if(!err)
    {
        connection = db;
        console.log("db connected successfully");
    }
    else
    {
        console.log("db could not connect");
    }

})


app.get('/', (req,res)=>{
    res.send("hello from server");
})

app.get('/user', (req,res)=>{
    // console.log(req.query);
    var coll = connection.db('school').collection('student');
    coll.find().toArray((err,data)=>{
        if(!err)
        {
            res.send({status:"ok", data:data});
        }
        else{
            res.send({status:"failed", msg:err});
        }
    })

   
})




app.listen(4000, ()=>{
    console.log("Server is listening on port 4000");
})