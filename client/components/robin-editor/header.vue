<template>
    <view class="head">
        <view class="btn left" @tap="cancel" v-if="labelCancel">{{
            labelCancel
        }}</view>
        <view class="btn right" @tap="save" v-if="labelConfirm">{{
            labelConfirm
        }}</view>
        <view class="title">
            <input
                class="input"
                v-model.trim="title"
                :placeholder="Date.now() | date"
            />
        </view>
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
    data() {
        return {
            title: ""
        };
    },
    methods: {
        cancel: function() {
            this.$emit("cancel");
        },
        save: function() {
            this.$emit("setTitle", this.title);
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
    .title {
        height: 100%;
        width: 50%;
        position: absolute;
        transform: translateX(50%);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .input {
            outline: #666;
            border: 1px solid #ccc;
            border-radius: 6px;
            height: 88%;
            font-size: 1rem;
        }
    }
}
</style>
