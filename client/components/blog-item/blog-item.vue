<template>
    <view class="blog-item" @click.stop="handleClickItem" :data-id="item._id">
        <view :data-id="item._id" class="title f2">{{ item.title }}</view>
        <view :data-id="item._id" class="detail f2">{{
            item.text.replace(/\s/g, "")
        }}</view>
        <view class="nav">
            <text :data-id="item._id" data-type="user">{{
                item.username
            }}</text>
            <text
                :data-id="item._id"
                data-type="like"
                class="last2 iconfont icon-zan"
                >{{ item.likes ? item.likes.length : 0 }}</text
            >
            <text data-type="commont" class="last2 iconfont icon-pinglun">{{
                item.comments ? item.comments.length : 0
            }}</text>
            <text class="last2 iconfont icon-zhiboguankanshu">{{
                item.views
            }}</text>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        item: Object
    },
    data() {
        return {};
    },
    methods: {
        handleClickItem(e) {
            this.$emit("handleClickItem", e);
        }
    }
};
</script>

<style lang="scss" >
.blog-item {
    padding: 0.5rem;
    max-height: 8rem;
    background-color: $uni-bg-color-grey;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: $uni-border-radius-base;
    width: 100%;
    margin-top: $uni-spacing-row-sm;
    &:last-of-type {
        margin-bottom: $uni-spacing-row-sm;
    }
    .title {
        height: 1.33rem;
        font-weight: bold;
    }
    .detail {
        font-size: 0.875rem;
        line-height: 1.115rem;
        max-height: 2.25rem;
        min-height: 1.33rem;
        overflow: hidden;
        @extend .over2;
    }
    .f2 {
        margin-bottom: 0.5rem;
    }
    .nav {
        height: 1rem;
        font-size: 0.77rem;
        line-height: 1rem;

        .last2 {
            font-size: 0.77rem;
            margin-left: 1rem;
            letter-spacing: 1px;
        }
    }
}
</style>
