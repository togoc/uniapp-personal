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

            res.status(500).send(e.toString());

        }
    }

    async logout(req, res) {
        try {
            if (!req.user) {
                throw new Error('Not A User')
            }

            const user = req.user
            const token = req.token

            await userServices.logout(user, token);

            res.send('token已删除');

        } catch (e) {
            res.status(500).send(e.toString());
        }

    }

    async logoutAll(req, res) {
        try {
            if (!req.user) {
                throw new Error('Not A User')
            }

            const user = req.user

            await userServices.logoutAll(user);

            res.send('token已删除');

        } catch (e) {
            res.status(500).send(e.toString());
        }

    }

    async createUser(req, res) {
        try {
            const { user, token } = await userServices.createUser(req.body)

            user.tokens = undefined;
            user.password = undefined;

            res.status(201).send({ user, token });

        } catch (e) {

            res.status(500).send('请使用其他用户名' + '(' + e.toString() + ')');

        }
    }

    async getUser(req, res) {

        const user = req.user
        user.tokens = undefined;
        user.password = undefined;

        res.status(200).send(user);

    }

    async changePassword(req,res){
        
    }
}


module.exports = UserController