import pkg from 'mongoose';
import mongoose from "mongoose";

const {Schema} = pkg;

const messageScheme = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    sender: {
        type: String,
        required: true
    },
    time: {
        type: String
    }
})

const Message = mongoose.model('message', messageScheme)
export default Message