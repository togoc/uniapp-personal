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
            //如果name="" name=email
            const { user, token } = await userServices.createUser({ name: "", ...req.body })

            user.tokens = undefined;
            user.password = undefined;

            res.status(201).send({ user, token });

        } catch (e) {

            res.status(500).send('请使用其他用户名' + '(' + e.toString() + ')');

        }
    }

    async getUser(req, res) {

        try {
            const { id } = req.query

            const user = await userServices.getUser(id) || req.user

            res.status(200).send(user);

        } catch (error) {
            res.status(500).send('获取用户信息失败' + '(' + e.toString() + ')');
        }

    }

    async changePassword(req, res) {

    }
}



module.exports = UserController