const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const isLogin = (req,res,next) => {

    let token = req.headers.token

    if (token) {

        let decoded = jwt.verify(token, process.env.SALT_TOKEN)

        User.find({
            email : decoded.email
        })
        .then(data => {
            
            if(data.length == 1) {
                
                req.decoded = decoded
                next()

            } else {
                res.status(403).json({
                    status : false,
                    message : `you need to login first2`
                })        
            }

        })
        .catch(err => {
            res.status(500).json({
                status : false,
                message : err.message
            })    
        })

    } else {
        res.status(403).json({
            status : false,
            message : `you need to login first1`
        })
    }

}

module.exports = isLogin