const express = require('express');
const bodyParser=require('body-parser')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./api.yaml')

const app = express();
const port = 8000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

app.use(bodyParser.urlencoded({ extended: true }));

//   router 
app.use('/',require('./routes/index'));


app.get('/string',(req,res)=>res.send("This is a string.."))



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});