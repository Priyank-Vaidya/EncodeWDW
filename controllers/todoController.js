const express = require("express");
const router = express.Router();
const todo = require("../models/todo");
const { $where } = require("../models/users");


async function addTask(req, res) {
    let { user, title } = req.body;
    if (!user) return res.status(400).json({ message: "User ID is required" });

    // check if user exists in db
    try {
        const userExists = await User.find({ _id: user })
        if (!userExists) return res.status(400).json({ message: "User does not exist" });

        // let {title, isCompleted} = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });
        
        //adding to the todo-list
        const add = await todo.insertMany($where (todo.find({user: userExists._id})))

        const savedTodo = await add.save();
        res.json(savedTodo);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
}

async function getTasks(req, res) {
    const { user } = req.body;
    try {

        const userExists = await User.find(user);
        if (!userExists) return res.status(400).json({ message: "User does not exist" })

        const todos = await todoSchema.find({
            user: user
        })


        .then(console.log('Todo fetched'))
        .catch(err)(console.log(err))


        res.json(todos);
    } catch (err) {
        res.json({ message: err });
    }
}


exports.getAll = async(req, res) => {
    try {

        //Applying the concept of pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;


        //Find if the required user is present or not
      const todos = await todo.findOne({ user: req.user.id })
      .then(console.log('Todo fetched'))
      .catch(err)(console.log(err))

        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const count = await todo.countDocuments({ user: req.user.id });
      res.json({
        data: todos,
        page,
        limit,
        total: count,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
}


module.exports = {getTasks,addTask}