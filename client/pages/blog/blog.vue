<template>
    <view class="blog">
        <view class="head">
            <view class="title"> {{ blog.title }}</view>
            <view class="date">{{ blog.updatedAt | date1 }}</view>
            <view class="user">
                <view class="header-img"
                    ><image
                        :src="headIMGSrc"
                        alt="头像"
                /></view>
                <view class="user-name">
                    <text>{{ auth.name || blog.username }}</text>
                    <text>{{ auth.name || blog.name }}</text>
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
            blog: {},
            auth: {}
        };
    },
    onLoad(options) {
        let blogID = options.blogID;
        this.getBlog(blogID);
    },
    computed: {
        htmlData() {
            return this.blog.html || "";
        },
        headIMGSrc() {
            return this.auth.avatar ? this.auth.avatar + "?w=50&h=50" : "../../static/default.png";
        }
    },
    methods: {
        async getBlog(id) {
            let data = await this.$http(
                "/blog-service/get-index-blog?id=" + id,
                "GET"
            );
            this.blog = data;
            this.auth = await this.$http(
                "/user-service/user?id=" + data.userid
            );
        }
    }
};
</script>

<style lang="scss">
.blog {
    width: 750rpx;
    user-select: text;
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
        word-wrap: break-word;
        letter-spacing: 1px;
        font-size: 16px;
    }
}
</style>
