<template>
    <view class="nav-bar">
        <view class="nav-bar-inner">
            <view class="nav-item nav-bar-left">
                <slot name="left"></slot>
            </view>
            <view class="nav-item nav-bar-middle nav-item">
                <slot></slot>
            </view>
            <view class="nav-item nav-bar-right nav-item">
                <slot name="right"></slot>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss">
view.nav-bar {
    $height: calc(750rpx * 50 / 360);
    width: 750rpx;
    margin: 0;
    padding: 0;
    padding-top: var(--status-bar-height);
    view.nav-bar-inner {
        width: 750rpx;
        height: $height;
        background-color: gray;
        display: flex;
        flex-direction: row;
        align-items: center;
        .nav-item {
            height: 100%;
            line-height: $height;
            text-align: center;
        }
        view.nav-bar-left {
            width: 100%;
        }

        view.nav-bar-middle {
            width: 100%;
        }

        view.nav-bar-right {
            background-color: red;
            view {
                height: 100%;
                width: $height;
            }
        }
    }
}
</style>
