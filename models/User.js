const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'please add a valid email']   
     },
     role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
     },
     password: {
        type: String,
        required: [true, 'please add a password'],
        minlength: 6,
        select: false
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date,
     createdAt: {
        type: Date,
        default: Date.now
     }

});
// Encrypt password using bcrypt 
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('User', UserSchema);