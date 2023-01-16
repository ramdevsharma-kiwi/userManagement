const express = require('express');
const bodyParser=require('body-parser')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./api.yaml')
const db  = require('./config/mongoose')

const app = express();
const port = 8000;

// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))



//   router 
app.use('/',require('./routes/index'));


app.get('/string',(req,res)=>res.send("This is a string.."))



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});