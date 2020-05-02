<template>
    <view class="my-blog" scroll-y>
        <!-- <view class="btn-container">
            <button class="btn" @click.stop="handleBtn">
                <text class="iconfont icon-bianji" />
                写博客
            </button>
        </view> -->
        <blog-item
            v-for="(item, index) in myBlogs"
            @handleClickItem="handleClickItem"
            :key="index"
            :item="item"
        />
    </view>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            pageIndex: 0,
            lastPage: false
        };
    },
    computed: {
        ...mapState(["myBlogs"])
    },
    methods: {
        ...mapActions(["getMyBlog"]),
        async handleClickItem(id) {
            uni.navigateTo({
                url: "../blog/blog?blogID=" + id
            });
        },
        handleBtn() {
            if (this.isLogin) {
                uni.navigateTo({
                    url: "../editor/editor?type=add"
                });
            } else {
                this.showToast("请先登录!");
            }
        }
    },
    onReady() {
        this.$store.dispatch("getMyBlog");
    },
    async onPullDownRefresh() {
        this.lastPage = false;
        await this.$store.dispatch("getMyBlog", "REFRESHMYBLOGS");
        uni.stopPullDownRefresh();
    },
    onReachBottom() {
        this.$store.dispatch("getMyBlog");
    }
};
</script>

<style lang="scss" scope>
page {
    width: 100%;
    height: 100%;
}
.my-blog {
    padding: 0 $uni-spacing-col-base;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
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
            background-color: $uni-bg-color-grey;
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
