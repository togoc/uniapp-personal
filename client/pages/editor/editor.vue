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
            let html = context.html.replace(
                /(?<=src="|src=').*?(?="|')/gi,
                e => {
                    for (let i = 0; i < this.tags.length; i++) {
                        if (this.tags[i].path === e) {
                            console.log(1);
                            console.log(this.tags[i].thumbnailID);
                            return this.tags[i].thumbnailID;
                        }
                    }
                }
            );

            context.html = html;
            let data = { context, tags: this.tags };
            let res = await this.$http("/blog-service/add-blog", "POST", data);
            console.log(res);
        },
        async editBlog(context) {
            console.log(context);
        },
        uploadImg(path, fn) {
            let token = uni.getStorageSync("BLOG_TOKEN");
            uni.uploadFile({
                url: "/blog/file-service/upload?type=blogIMG",
                filePath: path,
                name: "file",
                header: {
                    Authorization: token
                },
                success: res => {
                    let thumbnailID = JSON.parse(res.data)._id;
                    let tag = {
                        path,
                        thumbnailID
                    };

                    this.tags = [...this.tags, tag];

                    fn(path);
                    // function toArrayBuffer(buf) {
                    //     var ab = new ArrayBuffer(buf.length);
                    //     var view = new Uint8Array(ab);
                    //     for (var i = 0; i < buf.length; ++i) {
                    //         view[i] = buf[i];
                    //     }
                    //     return ab;
                    // }

                    // let blob = new Blob([toArrayBuffer(res.data.data)], {
                    //     type: "image/*"
                    // });

                    // let url = URL.createObjectURL(blob);
                    // if (res.statusCode === 200) {
                    //     console.log(this)
                    //     fn(JSON.parse(res.data));
                    // }
                }
            });
        }
    }
};
</script>

<style lang="scss">
</style>
