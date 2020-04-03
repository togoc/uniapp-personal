<template>
    <view class="blog">
        <view class="head">
            <view class="title"> {{ blog.title }}</view>
            <view class="date">{{ "三天前" }}</view>
            <view class="user">
                <view class="header-img"
                    ><image src="../../static/default.png" alt=""
                /></view>
                <view class="user-name">
                    <text>{{ blog.username }}</text>
                    <text>{{ blog.username }}</text>
                </view>
                <view class="focus">
                    <text>私信</text>
                    <text>关注</text>
                </view>
            </view>
        </view>
        <view class="preview">
            <rich-text :nodes="htmlData" class="previewNodes"></rich-text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            blog: {}
        };
    },
    onLoad(options) {
        let blogID = options.blogID;
        this.getBlog(blogID);
    },
    computed: {
        htmlData() {
            return this.blog.html || "";
        }
    },
    methods: {
        async getBlog(id) {
            let data = await this.$http(
                "/blog-service/get-index-blog?id=" + id,
                "GET"
            );
            this.blog = data;

            // if (data.thumbnails.length) {
            //     let thumbnails = await this.getThumbnails(data._id);

            //     this.thumbnails = thumbnails;
            // }
        },
        // async getThumbnails(id) {
        //     return await this.$http("/blog-service/thumbnails/" + id, "GET");
        // },
        bufferToURL(buf) {
            function toArrayBuffer(buf) {
                var ab = new ArrayBuffer(buf.length);
                var view = new Uint8Array(ab);
                for (var i = 0; i < buf.length; ++i) {
                    view[i] = buf[i];
                }
                return ab;
            }
            let blob = new Blob([toArrayBuffer(buf.data)], {
                type: "image/*"
            });
            return URL.createObjectURL(blob);
        },
        BufferToBase64(buffer) {
            let bytes = new Uint8Array(buffer.data);
            let data = "";
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                data += String.fromCharCode(bytes[i]);
            }
            return "data:image/png;base64," + window.btoa(data);
        }
    }
};
</script>

<style lang="scss">
.blog {
    width: 750rpx;
    .head {
        width: 750rpx;
        padding: 1rem;
        box-sizing: border-box;
        border-bottom: 2px solid #fbfbfc;

        .title {
            width: 100%;
            font-weight: bold;
            font-size: 1.125rem;
        }

        .date {
            padding: 0.5rem 0;
            font-size: 0.76rem;
            line-height: 2rem;
            padding: 0;
            margin: 0;
        }

        .user {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            border: 2px solid #fbfbfc;
            align-items: center;
            height: 2.91rem;
            .header-img {
                image {
                    width: calc(2.91rem / 2);
                    height: calc(2.91rem / 2);
                    border-radius: 50%;
                }
            }

            .user-name {
                width: 100%;
                display: flex;
                max-width: 7.65rem;
                box-sizing: border-box;
                flex-direction: column;
                padding-left: 0.5rem;
                text {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 0.875rem;
                }
            }

            .focus {
                width: 100%;
                text-align: center;
                padding: 0.125rem 1rem;
                display: flex;
                white-space: nowrap;
                flex-direction: row;
                justify-content: space-around;
                & > text {
                    width: 3rem;
                    border: 2px solid #cfcfcf;
                    border-radius: 3px;
                }
            }
        }
    }
    .preview {
        box-sizing: border-box;
        padding: 1rem;
        text {
            font-size: 0.875rem;
        }
    }
}
</style>
