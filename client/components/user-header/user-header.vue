<template>
    <view class="head">
        <!--  #ifdef APP-PLUS  -->
        <view class="status_bar"><!-- 这里是状态栏 --></view>
        <!--  #endif  -->
        <view class="header" v-if="header">
            <view class="left head-item">
                <slot name="left"> </slot>
            </view>
            <view class="middle head-item">
                <slot name="middle"> </slot>
            </view>
            <view class="right head-item">
                <slot name="right"> </slot>
            </view>
        </view>
        <view class="content">
            <template v-if="!isLogin">
                <view class="login-type-btn">
                    <view
                        class="icon-item"
                        v-for="(item, index) in quickLoginOptions"
                        :key="index"
                        @click.stop="handleOptions(item.handleClickMethod)"
                    >
                        <text :class="['iconfont', item.icon]"></text>
                    </view>
                </view>
                <view @click.stop="userMethod" class="login-btn">
                    <text>登录/注册</text>
                </view>
            </template>
            <template v-else>
                <view class="user">
                    <view class="user-name-img">
                        <image
                            @tap.stop="changeAvatar"
                            :src="user1.avatar + '?w=70&h=70'"
                        />
                        <view class="user-name-data">
                            <view class="username">
                                {{ user1.name || "togoc" }}
                            </view>
                            <text>注册时间:{{ user1.data | date }}</text>
                        </view>
                    </view>
                    <view class="user-favorite-info">
                        <view
                            class="info-nav-item"
                            v-for="(item, index) in favoriteIfo"
                            :key="index"
                        >
                            <text class="count">{{ item.count }}</text>
                            <text class="title">{{ item.title }}</text>
                        </view>
                        <text class="iconfont icon-jiantouarrow487">主页</text>
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        header: Boolean,
        quickLoginOptions: Array,
        user1: Object,
        favoriteIfo: Array
    },
    data() {
        return {};
    },
    methods: {
        handleOptions(e) {
            // #ifndef APP-PLUS
            this.$parent.$parent[e]();
            // #endif

            // #ifdef APP-PLUS
            this.$parent[e]();
            // #endif
        },
        userMethod() {
            this.$emit("userMethod");
        },
        changeAvatar() {
            this.$emit("changeAvatar");
        }
    }
};
</script>

<style lang="scss">
.head {
    /** #ifdef APP-PLUS */
    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }
    /** #endif */
    width: 750rpx;
    height: 100%;
    flex-direction: column;
    background-color: $uni-bg-color-grey-more;
    display: flex;
    margin-bottom: 0.5rem;

    .header {
        display: flex;
        flex-direction: row;
        width: 750rpx;
        padding: calc((2.25rem - 1.3333rem) / 2) 1rem;
        height: 25%;
        box-sizing: border-box;
        .head-item {
            width: 100%;
        }
        .middle {
            text-align: center;
            color: #fff;
            font-weight: bold;
            font-size: 16px;
        }
    }
    view.content {
        background-color: $uni-bg-color;
        width: calc(750rpx - 2rem);
        height: 75%;
        box-sizing: border-box;
        display: flex;
        border-radius: $uni-border-radius-base;
        align-items: center;
        margin: 0 1rem;
        transform: translateY(0.5rem);
        flex-direction: column;
        .login-type-btn {
            display: flex;
            width: 100%;
            flex-direction: row;
            max-width: 11rem;
            margin-top: 1rem;
            justify-content: space-around;
            .icon-item {
                width: 2.25rem;
                text-align: center;
                padding: calc((2.25rem - 1.333rem) / 2);
                box-sizing: border-box;
                text: {
                    text-align: center;
                }
                .iconfont::before {
                    font-size: 1.333rem;
                }
            }
        }
        .login-btn {
            margin-top: 1rem;
            width: 100%;
            max-width: 6rem;
            text-align: center;
            background-color: red;
            padding: calc((2.25rem - 1.333rem) / 2);
            font-weight: bold;
            color: #fff;
        }
        .user {
            width: 100%;
            height: 100%;
            padding: 1rem;
            background-color: $uni-bg-color;
            box-sizing: border-box;
            display: flex;
            border-radius: $uni-border-radius-base;
            flex-direction: column;
            justify-content: space-between;
            .user-name-img {
                height: 2.5rem;
                image {
                    border-radius: 50%;
                    width: 2.5rem;
                    height: 2.5rem;
                }

                .user-name-data {
                    width: 12.9rem;
                    height: 2.5rem;
                    float: right;
                    .username {
                        font-weight: bold;
                        line-height: 1.33rem;
                    }

                    text {
                        font-size: 0.75rem;
                        line-height: 1.33rem;
                        color: #8f91a2;
                    }
                }
            }
            .user-favorite-info {
                height: 2.5rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                align-items: flex-end;

                .info-nav-item {
                    display: flex;
                    flex-direction: column;
                    width: 3.33rem;
                    .count {
                        font-weight: bold;
                    }

                    .title {
                        font-size: 0.75rem;
                        line-height: 1.33rem;
                        color: #8f91a2;
                    }
                }

                & > text {
                    font-size: 0.75rem;
                    line-height: 1.33rem;
                    color: #8f91a2;
                }
            }
        }
    }
}
</style>
