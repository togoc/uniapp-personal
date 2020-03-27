/**
 * 不区分http - https 设置
 */
const prompts = require("prompts");
const fs = require("fs");
const crypto = require("crypto");
const path = require('path')

const initServer = async () => {

    console.log("Initializing Server...\n");

    await fs.mkdir(path.resolve(__dirname, '../config'), async () => {
        // 域名路径
        const getServerUrl = await prompts({
            type: 'text',
            message: `\n请输入域名 (Include Port If Needed, Default localhost):`,
            name: "value"
        })
        const serverURL = getServerUrl.value || "localhost";

        // 端口
        const getClientPortNumber = await prompts({
            type: 'text',
            message: "\n请输入端口值 :",
            name: "value",
            // 1025~65534
            validate: value => value > 1024 && value < 65535 ? true : '有效值1025~65534之间'
        })
        const clientPortNumber = getClientPortNumber.value || "3000";

        //数据库地址
        const getSeverMongoURL = await prompts({
            type: 'text',
            message: "\nEnter MongoDB URL (Default mongodb://127.0.0.1:27017/personal-drive):",
            name: "value",
            validate: value => value.slice(0, 10) === 'mongodb://' ? true : '请输入有效值'
        })

        const serverMongoURL = getSeverMongoURL.value || "mongodb://127.0.0.1:27017/personal-drive"

        const fullServerInfo = "MONGODB_URL=" + serverMongoURL + "\n"
            + "PORT=" + clientPortNumber + "\n"
            + "URL=" + serverURL + "\n"

        await fs.writeFile(path.resolve(__dirname, "../config/prod.env"), fullServerInfo, (err) => {
            if (err) {
                console.log("Error", err);
                process.exit();
            }
        })

    });
}

initServer();