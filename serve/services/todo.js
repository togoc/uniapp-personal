const Todos = require('../models/todos')
const ObjectID = require('mongodb').ObjectID


class TodoService {
    constructor() {

    }

    async getList(userid) {
        return await Todos.find({ userid: ObjectID(userid) })
    }

    async addTodo(body) {
        let todo = new Todos(body)
        return await todo.save()
    }

    async toggle(id) {
        let item = await Todos.findOne({ _id: ObjectID(id) })
        item.done = !item.done
        return item.save()
    }

    async remove(id) {
        return await Todos.deleteOne({ _id: ObjectID(id) })
    }
}

module.exports = TodoService

