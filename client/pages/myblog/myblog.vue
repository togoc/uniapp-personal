<template>
    <view class="my-blog">
        <button class="btn" @click.stop="handleBtn" plain type="warn">
            + 写博客
        </button>
        <listItem v-for="(item, index) in myBlogs" :key="index" :item="item" />
    </view>
</template>

<script>
import listItem from "../../components/index-list-item/index-list-item";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
    components: {
        listItem
    },
    data() {
        return {
            pageIndex: 0,
            lastPage: false
        };
    },
    computed: {
        ...mapGetters(["isLogin"]),
        ...mapState(["myBlogs"])
    },
    methods: {
        ...mapActions(["getMyBlog"]),
        handleBtn() {
            if (this.isLogin) {
                uni.navigateTo({
                    url: "../editor/editor?type=add"
                });
            } else {
                uni.showToast({
                    title: "请先登录!",
                    duration: 2000,
                    icon: "none"
                });
            }
        }
    },
    onReady() {
        this.getMyBlog();
    },
    async onPullDownRefresh() {
        this.lastPage = false;
        await this.getMyBlog();
        uni.stopPullDownRefresh();
    },
    onReachBottom() {
        this.getMyBlog();
    }
};
</script>

<style lang="scss" scope>
view.my-blog {
    width: 750rpx;
    .btn {
        line-height: 2;
        width: 88%;
    }
}
</style>
