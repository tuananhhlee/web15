const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./userRouter')


apiRouter.use("/", (req, res, next) => {
    console.log('api router middleware!');
    next();
})

apiRouter.use('/users', userRouter)


module.exports = apiRouter;