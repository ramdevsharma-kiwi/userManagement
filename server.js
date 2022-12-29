const express = require('express');
const bodyParser=require('body-parser')
const passport=require('passport');
const cookieParser=require('cookie-parser');


const db  = require('./config/mongoose')
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


//   router 
app.use('/',require('./routes/index'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});