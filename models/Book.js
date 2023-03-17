const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description:{
        type: String,
        required: [true, 'please add a description'],
        maxlength: [500, 'description cannot be more than 50 characters']
    },
    author: {
        type: String,
        required: [true, 'please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    phone:{
        type: [String],
        maxlength: [20,'Phone number cannot be more than 20 characters']
    },
    email:{
        type: [String],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            'please add a valid email']
    },
    subjects:{
        type: [String],
            required: true,
    }
})

module.exports = mongoose.model('Book', BootcampSchema);