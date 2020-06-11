<template>
    <view class="head">
        <view class="btn left" @tap="cancel" v-if="labelCancel">{{
            labelCancel
        }}</view>
        <view class="btn right" @tap="save" v-if="labelConfirm">{{
            labelConfirm
        }}</view>
        <slot name="title"></slot>
    </view>
</template>

<script>
export default {
    props: {
        labelCancel: {
            type: String,
            default: "取消"
        },
        labelConfirm: {
            type: String,
            default: "确定"
        }
    },
    methods: {
        cancel() {
            this.$emit("cancel");
        },
        save() {
            this.$emit("save");
        }
    }
};
</script>

<style lang="scss" scoped>
.head {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px #eee solid;
    background: #fff;
    .btn {
        display: block;
        width: 150upx;
        height: 80upx;
        line-height: 80upx;
        font-size: 30upx;
        color: #666;
        padding-left: 20upx;
        text-align: center;
        &.left {
            float: left;
        }
        &.right {
            float: right;
        }
    }
}
</style>
