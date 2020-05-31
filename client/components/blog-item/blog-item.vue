<template>
    <view
        class="blog-item"
        hover-class="hover-item"
        @click.stop="handleClickItem"
    >
        <view class="title f2">{{ item.title }}</view>
        <view class="detail f2">
            {{ item.markdown ? item.markdown.replace(/\s/g, "") : "" }}
        </view>
        <view class="img-container" v-show="item.thumbnails.length">
            <image
                mode="aspectFit"
                v-for="(item, index) in item.thumbnails"
                :key="index"
                :src="item.src"
            />
        </view>
        <view class="nav">
            <text>{{ item.username }}</text>
            <text @click.stop="handleLiked" class="last2 iconfont icon-zan">{{
                item.likes ? item.likes.length : 0
            }}</text>
            <text class="last2 iconfont icon-pinglun">{{
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
            this.$emit("handleClickItem", this.item._id);
        },
        handleLiked() {
            this.$emit("handleLiked", this.item._id);
        }
    }
};
</script>

<style lang="scss" >
// .hover-item {
//     transform: scale(1.025);
// }
.blog-item {
    transition: all 0.15s linear;
    padding: 0.5rem;
    background-color: $uni-bg-color;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: $uni-border-radius-base;
    width: 100%;
    margin-top: 2px;

    .title {
        width: 100%;
        height: 1.33rem;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .img-container {
        width: 100%;
        padding: 3px;
        z-index: -1;
        image {
            max-height: 2.25rem;
            width: 2.25rem;
            margin: 3px;
            height: 2.25rem;
            border-radius: $uni-border-radius-base;
        }
    }
    .detail {
        font-size: 0.875rem;
        line-height: 1.115rem;
        max-height: 2.25rem;
        overflow: hidden;
        @extend .over2;
    }
    .f2 {
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
