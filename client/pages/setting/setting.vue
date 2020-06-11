<template>
    <view class="setting" @click.stop="handle">
        <button data-type="exit" type="warn">退出登录</button>
        <button data-type="exchange" type="warn">切换账号</button>
        <button data-type="clean" type="warn">清除所有token</button>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        async handle(e) {
            const { type } = e.target.dataset;
            switch (type) {
                case "exit":

                    await this.$http("/user-service/logout", "GET");
                    await this.$store.commit("LOGOUT");

                    uni.navigateBack({});
                    break;

                case "exchange":
                    uni.navigateTo({
                        url: "../login/login"
                    });
                    break;
                case "clean":

                    await this.$http("/user-service/logout-all", "GET");
                    await this.$store.commit("LOGOUT");

                    uni.navigateBack({});
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="scss">
.setting {
    width: 750rpx;
    padding: 30px;
    box-sizing: border-box;
    button {
        margin-bottom: 10px;
        width: 100%;
    }
}
</style>
