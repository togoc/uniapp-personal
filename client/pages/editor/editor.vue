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
            html: "",
            doType: ""
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
            if (context.errMsg === "getContents:ok") {
                delete context.errMsg;
                let res = await this.$http(
                    "/blog-service/add-blog",
                    "POST",
                    context
                );

                console.log(res);
            }
            console.log(context);
        },
        async editBlog(context) {
            console.log(context);
        },
        uploadImg(path, fn) {
            let token = uni.getStorageSync("BLOG_TOKEN");

            uni.uploadFile({
                url: "/blog/file-service/blog-img", //仅为示例，非真实的接口地址
                filePath: path,
                name: "file",
                formData: {
                    user: "test"
                },
                header: {
                    Authorization: token
                },
                success: uploadFileRes => {
                    console.log(uploadFileRes);
                    fn(path);
                }
            });
        }
    }
};
</script>

<style lang="scss">
</style>
