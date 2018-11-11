const express = require('express')
const bodyParser = require('body-parser')
let app = express();


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json({ extended: false}))

// const mysql = require('mysql');
// const config = require('./config')
// const con = mysql.createConnection(config);

app.use("/api", require('./routers/apiRouter'))

const port = 1010;
app.listen(port, (err) => {
    if(err) console.log(err)
    else console.log(`server is listenning at port ${port}`)
})


