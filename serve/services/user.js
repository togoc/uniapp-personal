const ObjectID = require('mongodb').ObjectID
const User = require('../models/user')
const Counts = require('../models/usercount')

class UserServices {
    constructor() {

    }

    // 获取用户排名关注粉丝信息
    async getUserBlogViewsCount(userID) {
        let count = await (await Counts.findOne({ userid: ObjectID(userID) })).toObject()
        let rank = await Counts.find({ blog_read_count: { $gt: count.blog_read_count } }).count() + 1

        count.userid = undefined
        count._id = undefined
        return { ...count, rank }
    }

    async login(body) {

        const user = await User.findUser(body.password, body.email)

        const token = await user.createToken()

        return { user, token }
    }


    async logout(user, token) {
        console.log('logout')

        user.tokens = user.tokens.filter(v => v.token != token)

        await user.save()
    }

    async logoutAll(user, token) {
        console.log('logoutAll')

        user.tokens = []

        await user.save()
    }

    async createUser(body) {
        console.log('Create User')

        const user = new User(body)

        await user.save()

        const token = await user.createToken()

        if (!user || !token) throw new InternalServerError("Could Not Create New User Error");

        //创建统计列表
        await user.addCounts()

        return { token, user }
    }

    async getUser(id) {

        return await User.findOne({ _id: ObjectID(id) }, { tokens: 0, password: 0 })

    }


    async changePassword(user, oldPassword, newPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) throw new NotAuthorizedError("Change Passwords Do Not Match Error");


        user.password = newPassword;

        user.tokens = [];
        user.tempTokens = [];

        await user.save();

        const newToken = await user.createToken()

        return newToken;
    }
}

module.exports = UserServices