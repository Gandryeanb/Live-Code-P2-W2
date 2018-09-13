const Quote = require('../models/quoteModel')

class QuoteController {

    static createQuote (req,res) {
        console.log(req.decoded);
        
        let newQuote = {
            likes : [],
            status : req.body.status,
            user : req.decoded._id,
        }

        let quote = new Quote(newQuote)

        quote.save()
        .then(data => {
            
            res.status(201).json({
                data : data
            })

        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message : err.message
            })
        })
    }

    static findAll(req,res) {

        Quote.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                success : false,
                message : err.message
            })
        })
    }

    static deleteQuote(req,res) {

        Quote.deleteOne({ _id: req.params.id, user : req.decoded._id}, function (err) {
            if (!err) {
                res.status(201).json({
                    success : true,
                    message : `Quote with id ${req.decoded._id} deleted`
                })
            } else {
                res.status(500).json({
                    success : false,
                    message : err.message
                })
            }
        });
    }
}

module.exports = QuoteController