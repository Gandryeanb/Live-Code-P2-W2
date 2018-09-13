const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt =  require('bcrypt')

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        validate: function (doc) {
            if (doc.length >= 6) {
                return true
            } else {
                return false
            }
        }
    }
});

userSchema.post('validate', function (doc) {
    doc.password = bcrypt.hashSync(doc.password, Number(process.env.SALT_ENCRYPT));
})

const User = mongoose.model('User', userSchema);

module.exports = User