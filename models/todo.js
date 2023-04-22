const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
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

    //Refereced from the User Schema
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("todo", todoSchema);