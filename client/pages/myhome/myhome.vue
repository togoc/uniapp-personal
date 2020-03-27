<template>
    <view class="my-home">
        <userHeader
            class="user-header"
            :header="true"
            :quickLoginOptions="quickLoginOptions"
            @userMethod="userMethod"
        >
            <template v-slot:left>
                <view class="head-top-item left">
                    <text class="iconfont icon-AddFriend"></text>
                </view>
            </template>
            <template v-slot:right>
                <view class="head-top-item right">
                    <text class="iconfont icon-setting"></text>
                </view>
            </template>
        </userHeader>
        <text>{{ this.name }}</text>
    </view>
</template>

<script>
import userHeader from "../../components/user-header/user-header";
import { mapState } from "vuex";
export default {
    components: {
        userHeader
    },
    computed: {
        ...mapState(["name"])
    },
    data() {
        return {
            quickLoginOptions: [
                {
                    icon: "icon-shouji",
                    handleClickMethod: "phoneLogin"
                },
                {
                    icon: "icon-qq",
                    handleClickMethod: "qqLogin"
                },
                {
                    icon: "icon-weixin",
                    handleClickMethod: "weixinLogin"
                }
            ]
        };
    },
    methods: {
        qqLogin() {
            console.log("qqLogin");
            uni.showToast({
                title: "暂不支持",
                duration: 2000
            });
        },
        weixinLogin() {
            console.log("weixinLogin");
            uni.showToast({
                title: "暂不支持",
                duration: 2000
            });
        },
        phoneLogin() {
            console.log("phoneLogin");
            uni.showToast({
                title: "暂不支持",
                duration: 2000
            });
        },
        userMethod() {
            console.log("login");
            uni.navigateTo({
                url: "../login/login"
            });
        }
    }
};
</script>

<style lang="scss">
.my-home {
    width: 750rpx;
    .user-header {
        width: 750rpx;
        height: 10rem;
        .head-top-item {
            .iconfont::before {
                font-size: 1.333rem;
            }
        }
        .right {
            float: right;
        }
    }
}
</style>
