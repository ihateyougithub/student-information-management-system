
var express =require('express')

var bodyParser = require('body-parser')

var mongoose = require('mongoose');

var web = express();

web.use(express.static('public'))

web.use(bodyParser.urlencoded({extended:false}))

var mongoDB = mongoose.connect('mongodb://localhost/studentDB')

var db = mongoDB.connection ;

db.on('error',function(err){
    console.log('数据库打开失败:' + err)
})
db.once('open',function(){
    console.log('数据库打开成功')
})
var schema = mongoose.Schema({
    name : String ,
    age : Number ,
    phone :String ,
    email :String ,
    intro : String 
})
var Students = mongoose.model('students',schema);

web.post('/add',function(req ,res){
    console.log(req.body);

    var stu = new Students(req.body);

    stu.save(function(err ,data){
        if(!err)
        {
            console.log('数据添加成功')
            res.json({result:'200'})
        }else{
            res.json({result:'0'})
        }
    })
})

web.get('/show',function(req,res){
    Students.find().exec(function(err,data){
        if(!err){
            res.send(data);
        }
    })
})

web.get('/remove',function(req,res){
    Students.findByIdAndRemove(req.query.ID).exec(function(err,data){
        if(!err){
            res.json({result:'200'});
        }else{
            res.json({result:'1'});
        }
    })
})

web.post('/update',function(req,res){

    console.log(req.body); 
    // console.log(req.body.)

    // {name:req.body.data.name,age:req.body.data.age,email:req.body.data.email}
    Students.findByIdAndUpdate(req.body.id,req.body,function(err){
        
        if(!err){
            res.json({result:'200'})
        }else{
            res.json({result:'2'})
        }
    })
})
web.listen('3000',function(){
    console.log('服务器启动')
})
