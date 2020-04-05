<template>
    <view>
        <myeditor
            class="editor"
            @cancel="hideEditor"
            @save="saveEditor"
            :html="html"
            :imageUploader="uploadImg"
            :muiltImage="true"
        >
        </myeditor>
    </view>
</template>

<script>
import myeditor from "@/components/robin-editor/editor.vue";
import { mapGetters } from "vuex";
export default {
    components: {
        myeditor
    },
    data() {
        return {
            html: "测试",
            doType: "",
            tags: []
        };
    },
    onLoad(options) {
        const type = options.type;
        this.doType = type;
    },
    computed: {
        ...mapGetters(["isLogin"])
    },
    onShow() {
        let timer = setTimeout(() => {
            if (!this.isLogin) {
                uni.switchTab({
                    url: "../myblog/myblog"
                });
            }
            clearTimeout(timer);
        }, 1000);
    },
    methods: {
        hideEditor(e) {
            console.log(1);
        },
        saveEditor(context) {
            this.doType === "add" && this.addBlog(context);
            this.doType === "edit" && this.editBlog(context);
        },
        async addBlog(context) {
            delete context.errMsg;
            let data = { context, tags: this.tags };
            let res = await this.$http("/blog-service/add-blog", "POST", data);
            uni.switchTab({
                url: "../myblog/myblog"
            });
        },
        async editBlog(context) {
            console.log(context);
        },
        async uploadImg(path, fn) {
            let token = uni.getStorageSync("BLOG_TOKEN");
            let data = await this.$upload(path, "blogIMG");
            let { _id, src } = data;
            let tag = { _id, src };

            // #ifndef MP-WEIXIN
            this.tags = [...this.tags, tag];
            // #endif

            // #ifdef MP-WEIXIN
            this.$parent.tags.push(tag);
            // #endif

            fn(src);
        }
    }
};
</script>

<style lang="scss">
</style>
