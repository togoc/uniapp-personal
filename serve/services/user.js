const ObjectID = require('mongodb').ObjectID
const User = require('../models/user')

class UserServices {
    constructor() {

    }

    async login(body) {
        console.log('login')

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

        return { token, user }
    }

    async getUser(id) {

        return await User.findOne({ _id: ObjectID(id) })

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