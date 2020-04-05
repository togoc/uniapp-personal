<template>
    <view class="container">
        <view class="desc">
            <view>本示例为简易登录示例</view>
        </view>
        <view class="login-form">
            <input type="text" value="" placeholder="邮箱" v-model="email" />
            <input
                type="text"
                value=""
                placeholder="密码"
                password="true"
                v-model="password"
            />
            <button type="warn" @click.stop="signUp">注册</button>
            <button type="warn" @click.stop="signIn">登录</button>
            <!-- #ifdef MP-WEIXIN -->
            <button type="warn" @click.stop="loginMp">微信登录</button>
            <!-- #endif -->
            <!-- <button type="warn" @click="validateToken">token验证</button> -->
        </view>
    </view>
</template>


<script>
export default {
    data() {
        return {
            email: "togoc@xx.com",
            password: "123456"
        };
    },
    onShow() {
        this.$store.commit("LOGOUT");
    },
    methods: {
        async signUp() {
            try {
                let body = { email: this.email, password: this.password };
                let data = await this.$http(
                    "/user-service/create-user",
                    "POST",
                    body
                );

                let { user, token } = data;

                uni.setStorageSync("BLOG_TOKEN", token);
                await this.$store.commit("SETUSER", user);

                uni.switchTab({
                    url: "../myhome/myhome"
                });
            } catch (error) {
                throw new Error(error);
            }
        },
        async signIn() {
            try {
                let body = { email: this.email, password: this.password };
                let data = await this.$http(
                    "/user-service/login",
                    "POST",
                    body
                );

                let { user, token } = data;

                uni.setStorageSync("BLOG_TOKEN", token);
                await this.$store.commit("SETUSER", user);

                uni.switchTab({
                    url: "../myhome/myhome"
                });
            } catch (error) {
                throw new Error(error);
            }
        },
        // #ifdef MP-WEIXIN
        loginMp() {
            uni.showLoading({
                title: "登录中..."
            });
            this.getCode()
                .then(code => {
                    console.log("code", code);
                    return uniCloud.callFunction({
                        name: "login",
                        data: {
                            code
                        }
                    });
                })
                .then(res => {
                    uni.hideLoading();
                    console.log(res);
                    if (res.result.status !== 0) {
                        return Promise.reject(new Error(res.result.msg));
                    }
                    uni.setStorageSync("token", res.result.token);
                    uni.showModal({
                        content: "登录成功，token已存储",
                        showCancel: false
                    });
                })
                .catch(err => {
                    console.log(err);
                    uni.hideLoading();
                    uni.showModal({
                        content: "出现错误，请稍后再试." + err.message,
                        showCancel: false
                    });
                });
        },
        getCode() {
            return new Promise((resolve, reject) => {
                uni.login({
                    provider: "weixin",
                    success(e) {
                        if (e.code) {
                            resolve(e.code);
                        } else {
                            reject(new Error("微信登录失败"));
                        }
                    },
                    fail(e) {
                        reject(new Error("微信登录失败"));
                    }
                });
            });
        }
        // #endif
    }
};
</script>

<style>
.container {
    padding: 30px;
}

.desc {
    padding: 10px 0px;
    font-size: 14px;
    line-height: 22px;
    color: #999999;
}

.login-form input {
    height: 40px;
    border: solid 1px #dddddd;
    text-indent: 10px;
}

.login-form input,
.login-form button {
    width: 100%;
    margin-bottom: 10px;
}
</style>
