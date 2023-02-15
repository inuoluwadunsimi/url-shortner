const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()



const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine','ejs')
app.set('views','views')


app.get('/',(req,res,next)=>{
    res.render('index')
})


app.listen(process.env.PORT || 5000)