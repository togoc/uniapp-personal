const ObjectID = require('mongodb').ObjectID
const Type = require('../models/articleType');
const Blog = require('../models/blog');
const mongoose = require('../db/mongoose');

(async function () {
    let types = await Type.find({})

    for (let i = 0; i < types.length; i++) {
        let count = await Blog.findOne({ types: types[i].name }, { types: 1 }).countDocuments()
        if (count) {
            if (types[i].num !== count) {
                types[i].num = count
                await types[i].save()
            }
            continue
        }
        await Type.deleteOne({ _id: ObjectID(types[i]._id) })
    }

    
    // process.exit(1)

}());