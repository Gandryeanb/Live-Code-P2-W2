const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

class UserController {

    static createUser(req,res) {

        let newUser = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }

        let user = new User(newUser)

        user.save()
        .then(data => {
            res.status(201).json({
                success : true,
                message : `Account ${newUser.name} registered`
            })
        })
        .catch(err => {
            res.status(500).json({
                success : false,
                message : err.message
            })
        })
    }

    static loginUser(req,res) {

        User.find({
            email: req.body.email
        })
        .then(data => {
            if (data.length == 1) {

                let token = jwt.sign({
                    _id : data[0]._id,
                    name : data[0].name,
                    email : data[0].email,
                    password : data[0].password
                }, process.env.SALT_TOKEN);

                res.status(201).json({
                    token : token
                })

            } else {
                res.status(500).json({
                    success : false,
                    message : `Wrong username or password`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success : false,
                message : err.message
            })
        })
    }

}

module.exports = UserController