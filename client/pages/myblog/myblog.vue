<template>
    <view class="my-blog">
        <view class="btn-container">
            <button class="btn" @click.stop="handleBtn">
                <text class="iconfont icon-bianji" />
                写博客
            </button>
        </view>
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
        try {
            this.lastPage = false;
            this.$store.commit("REFRESHMYBLOGS");
            await this.getMyBlog();
        } catch (error) {
            this.$showToast("用户信息无效");
        }
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
    .btn-container {
        width: 100%;
        height: 56px;
        box-sizing: border-box;
        padding: 8px 1rem;
        .btn {
            width: 100%;
            height: 100%;
            line-height: 38px;
            white-space: nowrap;
            background-color: #f8f8f8;
            font-size: 16px;
            border: none;
            &::after {
                border: none;
            }
            text {
                letter-spacing: 3px;
                font-size: 16px;
            }
        }
    }
}
</style>
