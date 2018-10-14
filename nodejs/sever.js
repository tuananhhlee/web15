const express = require('express');
const path = require('path');
const app = express();

//http://localhost:3000/
app.use(express.static('btvn'));
app.get('/',(req,res)=>{
    console.log("Hello world");
    res.sendFile(path.resolve(__dirname,'btvn'));
});

app.listen(3000,(err)=>{
    if(err) console.log(err)
    else console.log("Server is listening at port 3000");
})
