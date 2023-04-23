const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    title: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    //Refereced from the User Sche
});

module.exports = mongoose.model("todo", todoSchema);