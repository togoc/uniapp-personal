<template>
    <view class="my-blog">
        <button class="btn" @click.stop="handleBtn" plain type="warn">
            + 写博客
        </button>
        <listItem
            v-for="(item, index) in myBlogList"
            :key="index"
            :item="item"
        />
    </view>
</template>

<script>
import listItem from "../../components/index-list-item/index-list-item";
import { mapGetters, mapState } from "vuex";
export default {
    components: {
        listItem
    },
    data() {
        return {
            myBlogList: [
                {
                    title: "socket网络编程",
                    detail:
                        "我Lorem ipsum dolor sit amet consectetur 我adipisicing elit. Vero earum ratione consectetur ipsa architecto delectus, veritatis eligendi doloremque voluptates laboriosam cum esse tempora corrupti dignissimos unde nisi exercitationem amet illum.",
                    userName: "togoc",
                    commont_count: 10,
                    support: 10
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["isLogin"]),
        ...mapState(["myBlogs"])
    },
    methods: {
        handleBtn() {
            if (this.isLogin) {
                uni.navigateTo({
                    url: "../editor/editor"
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
    onShow() {
        console.log(this.isLogin);
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
