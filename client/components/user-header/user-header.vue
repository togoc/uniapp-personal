<template>
    <view class="head">
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
        </view>
    </view>
</template>

<script>
export default {
    props: {
        header: Boolean,
        quickLoginOptions: Array
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
        }
    }
};
</script>

<style lang="scss">
.head {
    width: 750rpx;
    height: 100%;
    flex-direction: column;
    background-color: #efebe8;
    display: flex;
    margin-bottom: 0.5rem;

    .header {
        display: flex;
        flex-direction: row;
        width: 750rpx;
        height: 25%;
        box-sizing: border-box;
        padding: calc((2.25rem - 1.3333rem) / 2) 1rem;
        .head-item {
            width: 100%;
        }
    }
    view.content {
        background-color: rgb(235, 179, 179);
        width: calc(750rpx - 2rem);
        height: 75%;
        box-sizing: border-box;
        display: flex;
        border-radius: 6px;
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
    }
}
</style>
