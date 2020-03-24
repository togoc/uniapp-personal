<template>
    <view class="blog-item">
        <view class="title f2">{{ item.title }}</view>
        <view class="detail f2">{{ item.detail }}</view>
        <view class="nav">
            <text data-type="user">{{ item.userName }}</text>
            <text data-type="like" class="last2 iconfont icon-zan">{{
                item.commont_count
            }}</text>
            <text data-type="commont" class="last2 iconfont icon-pinglun">{{
                item.support
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
    mounted() {
    }
};
</script>

<style lang="scss" >
.blog-item {
    box-shadow: 0 0 0.125rem #ccc;
    padding: 1rem;
    max-height: 8rem;
    width: 750rpx;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0.25rem 0;
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
            margin-left: 1rem;
        }
    }
}
</style>
