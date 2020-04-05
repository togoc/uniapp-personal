<template>
    <view class="my-home">
        <!--  #ifdef APP-PLUS  -->
        <view class="status_bar">
            <!-- 这里是状态栏 -->
        </view>
        <!--  #endif  -->
        <userHeader
            class="user-header"
            :header="true"
            :quickLoginOptions="quickLoginOptions"
            @userMethod="userMethod"
            :user="user"
            :favoriteIfo="favoriteIfo"
        >
            <template v-slot:left>
                <view @click.stop="handleAddFriend" class="head-top-item left">
                    <text class="iconfont icon-AddFriend"></text>
                </view>
            </template>
            <template v-slot:right>
                <view @click.stop="handleSetting" class="head-top-item right">
                    <text class="iconfont icon-setting"></text>
                </view>
            </template>
        </userHeader>
    </view>
</template>

<script>
import userHeader from "../../components/user-header/user-header";
import { mapState, mapGetters } from "vuex";
export default {
    components: {
        userHeader
    },
    computed: {
        ...mapState(["user"])
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
            ],
            favoriteIfo: [
                {
                    count: 0,
                    title: "关注"
                },
                {
                    count: 0,
                    title: "粉丝"
                },
                {
                    count: 0,
                    title: "访问"
                },
                {
                    count: "--",
                    title: "排名"
                }
            ]
        };
    },
    methods: {
        handleAddFriend() {
            uni.showToast({
                title: "暂不支持",
                icon: "none",
                duration: 2000
            });
        },
        handleSetting() {
            uni.navigateTo({
                url: "../setting/setting"
            });
        },
        qqLogin() {
            console.log("qqLogin");
            uni.showToast({
                title: "暂不支持",
                icon: "none",
                duration: 2000
            });
        },
        weixinLogin() {
            console.log("weixinLogin");
            uni.showToast({
                title: "暂不支持",
                icon: "none",
                duration: 2000
            });
        },
        phoneLogin() {
            console.log("phoneLogin");
            uni.showToast({
                title: "暂不支持",
                icon: "none",
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
    /** #ifdef APP-PLUS */
    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }
    /** #endif */

    width: 750rpx;
    background-color: #fafafc;
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
