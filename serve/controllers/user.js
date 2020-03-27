const crypto = require('crypto');
const env = require('../enviroment/env')
const UserServices = require('../services/user')

const userServices = new UserServices()


class UserController {
    constructor() {
        console.log('create')
    }

    async login(req, res) {
        try {

            const body = req.body;

            const { user, token } = await userServices.login(body);

            user.tokens = undefined
            user.password = undefined


            res.status(200).send({ user, token });

        } catch (e) {

            const code = 500;
            res.status(code).send(e);
        }
    }

    async logout(req, res) {
        

    }

    async createUser(req, res) {
        try {
            const { user, token } = await userServices.createUser(req.body)

            user.tokens = undefined;
            user.password = undefined;

            res.status(201).send({ user, token });

        } catch (e) {

            const code = 500;
            res.status(code).json(e);
        }
    }

}


module.exports = UserController