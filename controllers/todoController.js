const express = require("express");
const router = express.Router();
const todo = require("../models/todo");
const user = require('../models/users');
const { $where } = require("../models/users");


exports.addTask = async(req, res) => {
    let { username ,title } = req.body;
    if (!user) return res.status(400).json({ message: "User ID is required" });

    // check if user exists in db
    try {
        //Adding the new Todo todo where Username matches 
      const add = await todo.create($where (todo.find(username)))

      const savedTodo = await add.save();
        res.json(savedTodo);
    } catch (err) {
        res.json({ message: err });
        console.log(err);
    }
}

exports.getTasks = async(req, res) => {
    const { user } = req.params;
    try {
        const todos = await todo.find({
            _id: user
        })
        //Promises
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
      const todos = await todo.find()
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

exports.updateTodo= async (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, isCompleted },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}