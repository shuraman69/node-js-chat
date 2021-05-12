import pkg from 'mongoose';
import mongoose from "mongoose";

const {Schema} = pkg;

const userScheme = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ''
    }
})

const User = mongoose.model('user', userScheme)
export default User