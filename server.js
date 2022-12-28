const express = require('express');


const db  = require('./config/mongoose')
const app = express();
const port = 8000;


app.use(express.urlencoded());



//   router 
app.use('/',require('./routes/index'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});