var express = require('express')
var bodyParser = require('body-parser')
const dot = require('dotenv')
const indexRouter = require('./routes/index')
var app = express()
dot.config()


app.set('views', __dirname+'/views');
app.set('view engine' , 'ejs');
app.set('html',require('ejs').renderFile )
app.use(bodyParser.urlencoded({extended:false }))
app.use('/' ,indexRouter)
var urlPort = process.env.PORT;
app.listen(urlPort, ()=>{
    console.log('Server is Starting at http://localhost:'+urlPort)
})