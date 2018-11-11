const express = require('express')
const userRouter = express.Router();

const mysql = require('mysql');
const config = require('../config')
const con = mysql.createConnection(config);
con.connect((err) => {
    if (err) console.log(err)
    else console.log('connect to db success!')
})

userRouter.use('/', (req, res, next) => {
    console.log('user router middleware!');
    next();
})


userRouter.get('/', getAllUser)
userRouter.get('/:userName', getUserByName)
userRouter.put('/:userName', changePassWord)
userRouter.post('/', createUser)



function getAllUser(req, res) {
    const sql = `SELECT * FROM customers`;
    con.query(sql, (err, dataFound) => {
        if (err) res.status(500).send(err)
        else if (!dataFound) res.status(404).send({ success: 0, message: 'user not found!' })
        else res.status(200).send({ success: 1, dataFound })
    })

}

function getUserByName(req, res) {
    const sql = `SELECT * FROM customers WHERE name ='${req.params.userName}' `;
    con.query(sql, (err, dataFound) => {
        if (err) res.status(500).send(err)
        else if (!dataFound) res.status(404).send({ success: 0, message: 'user not found!' })
        else res.status(200).send({ success: 1, dataFound })
    })
}

function changePassWord(req, res) {
    const { password } = req.body;
    let sql = `UPDATE customers SET address ='${password}' WHERE name = '${req.params.userName}'; SELECT * FROM customers WHERE name ='${req.params.userName}'  `;
    // let data = [false, 1];

    con.query(sql, (error, results, fields) => {
        if (error) res.send({ success: 0, error })
        else {
            let data = {
                firstQuery: results[0],
                secondQuery: results[1]
            }
            let userAfterUpdate = data.secondQuery[0]
            console.log(data.secondQuery)
            res.status(200).send({ success: 1 ,userAfterUpdate })
        }
    })
}

function createUser(req, res) {
    const { username, password } = req.body;
    let sql = `INSERT INTO customers(name, address) VALUES('${username}','${password}');SELECT * FROM customers WHERE name ='${username}'`;
    let todo = ['Insert a new row with placeholders', false];
    con.query(sql, todo, (err, results, fields) => {
        if (err) res.status(500).send(err)
        else {
            let data = {
                firstQuery: results[0],
                secondQuery: results[1]
            }
            let userCreated = data.secondQuery[0]
            console.log(userCreated)
            res.status(200).send({ success: 1, userCreated})
        }
    });
}

module.exports = userRouter;