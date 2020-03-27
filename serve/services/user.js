
const User = require('../models/user')

class UserServices {
    constructor() {

    }

    async login(body) {
        console.log('login: ' + body.name)

        const user = await User.findUser(body.password, body.email)

        const token = await user.createToken()

        return { user, token }
    }

    async createUser(body) {
        console.log('Create User')

        const user = new User(body)

        await user.save()

        const token = await user.createToken()

        if (!user || !token) throw new InternalServerError("Could Not Create New User Error");

        return { token, user }
    }

}

module.exports = UserServices