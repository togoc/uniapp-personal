const crypto = require('crypto');
const env = require('../enviroment/env')
const UserServices = require('../services/user')

const userServices = new UserServices()


class UserController {
    constructor() {
    }

    // 获取用户排名关注粉丝信息
    async getUserBlogViewsCount(req, res) {
        try {
            let { id } = req.query
            let count = await userServices.getUserBlogViewsCount(id)

            res.status(200).send(count);

        } catch (error) {
            res.status(500).send(error.toString());
        }
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

            user.tokens = undefined
            user.password = undefined
            user.__v = undefined

            res.status(200).send(user);

        } catch (error) {
            res.status(500).send('获取用户信息失败!' + '(' + error.toString() + ')');
        }

    }

    async changePassword(req, res) {
        try {
            let user = req.user
            let { prevpassword, newpasswprd } = req.body
            let newUser = await userServices.changePassword(user, prevpassword, newpasswprd)

            res.status(200).send({ message: '修改成功!' });
            
        } catch (error) {
            res.status(500).send('(' + error.toString() + ')');
        }
    }



    async changeUser(req, res) {
        try {
            let user = req.user
            let body = req.body
            let newUser = await userServices.changeUser(user, body)

            newUser.tokens = undefined
            newUser.password = undefined
            newUser.__v = undefined

            res.status(200).send(newUser);
        } catch (error) {
            res.status(500).send('(' + error.toString() + ')');
        }
    }
}



module.exports = UserController