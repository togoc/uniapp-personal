const User = require('../models/user')

const TodoService = require('../services/todo')
const todoService = new TodoService()

class TodoController {
    async getList(req, res) {
        try {
            let userid = req.user._id
            let todos = await todoService.getList(userid)

            res.status(200).json(todos);

        } catch (error) {
            res.status(500).send(error.toString());
        }
    }

    async addTodo(req, res) {
        try {
            let userid = req.user._id
            let task = req.body.task
            let todos = await todoService.addTodo({ userid, task })

            res.status(200).json(todos);

        } catch (error) {
            res.status(500).send(error.toString());
        }
    }

    async toggle(req, res) {
        try {
            let itemid = req.query.id

            let todo = await todoService.toggle(itemid)

            res.status(200).json(todo);

        } catch (error) {
            res.status(500).send(error.toString());
        }
    }


    async remove(req, res) {
        try {
            let itemid = req.query.id

            let todo = await todoService.remove(itemid)

            res.status(200).json(todo);

        } catch (error) {
            res.status(500).send(error.toString());
        }
    }
}

module.exports = TodoController