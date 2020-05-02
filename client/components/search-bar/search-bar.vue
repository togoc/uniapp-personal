<template>
    <view class="search-bar-outer">
        <view class="blank"></view>
        <view class="search-bar">
            <view class="left" @click.prevent.stop="handleLeft">
                <slot name="left"> </slot>
            </view>
            <view class="middle">
                <text class="iconfont icon-sousuo"></text>
                <input
                    class="input"
                    :disabled="disabled"
                    :focus="focus"
                    confirm-type="search"
                    v-model.trim="value"
                    :placeholder="placeholder"
                    @confirm="confirm"
                    type="text"
                />
                <text
                    v-if="value !== ''"
                    @click.stop="clear"
                    class="iconfont icon-qingchu"
                ></text>
            </view>
            <view class="right" @click.prevent.stop="confirm">
                <slot name="right"> </slot>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        disabled: Boolean,
        handleLeft: Function,
        handleRight: Function,
        focus: Boolean
    },
    data() {
        return {
            placeholder: "搜索博文/用户/文章",
            value: ""
        };
    },
    methods: {
        confirm() {
            if (this.value === "") return;
            this.handleRight(this.value);
        },
        clear() {
            this.value = "";
        }
    }
};
</script>

<style lang="scss">
.search-bar-outer {
    width: 100%;
    height: 100%;
    .blank {
        height: var(--status-bar-height);
        width: 100%;
        background-color: $uni-color-primary;
    }

    .search-bar {
        width: 100%;
        height: 100%;
        display: flex;
        background-color: $uni-color-primary;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        box-sizing: border-box;
        padding-right: $uni-spacing-col-base;
        .left {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        .middle {
            width: calc(100% - 3.3rem);
            height: 64%;
            background-color: rgb(255, 255, 255);
            box-sizing: border-box;
            flex-direction: row;
            display: flex;
            border-radius: $uni-border-radius-base;
            align-items: center;
            .iconfont {
                margin: 5px;
                font-size: 16px;
            }
            .input {
                height: 100%;
                width: 100%;
                border-radius: $uni-border-radius-base;
            }
        }
        .right {
            width: 2.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
}
</style>
