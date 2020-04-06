<template>
    <view class="blog">
        <view class="head">
            <view class="title"> {{ blog.title }}</view>
            <view class="date">{{ blog.updatedAt | date1 }}</view>
            <view class="user">
                <view class="header-img"
                    ><image :src="headIMGSrc" alt="头像"
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
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
        </view>
        <view :class="['foot', { 'on-input': onInput }]">
            <view :class="['input']">
                <textarea
                    fixed
                    :class="{ none: commentValue === '' }"
                    v-model.trim="commentValue"
                    placeholder-class="placeholder"
                    placeholder="有什么想说的?"
                    @blur="handleBlur"
                    @focus="handleFocus"
                />
                <template v-if="commentValue !== ''">
                    <view class="clean" @tap.stop="clean">
                        <text class="iconfont icon-qingchu"></text>
                    </view>
                </template>
            </view>

            <template v-if="onInput">
                <button
                    type="primary"
                    @tap.stop="handleAddComment"
                    v-if="onInput"
                >
                    留言
                </button>
            </template>
            <template v-else>
                <view class="handle">
                    <view class="comments">
                        <text>评论</text>
                        <text>{{ commentsLength }}</text>
                    </view>
                    <view class="like">
                        <text class="iconfont icon-zannor">{{ likeNum }}</text>
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            blog: {},
            auth: {},
            commentValue: "",
            onInput: false
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
        commentsLength() {
            return this.blog.comments ? this.blog.comments.length : 0;
        },
        likeNum() {
            return this.blog.likes ? this.blog.likes.length : 0;
        },
        headIMGSrc() {
            return this.auth.avatar
                ? this.auth.avatar + "?w=50&h=50"
                : "../../static/default.png";
        }
    },
    methods: {
        async getBlog(id) {
            let data = await this.$store.dispatch("getItemBlogByID", id);

            this.blog = data;

            this.auth = await this.$store.dispatch("getUser", data.userid);
        },
        async handleAddComment() {
            console.log(1);
            console.log(this.commentValue);
        },
        handleBlur() {
            if (this.commentValue === "") {
                this.onInput = false;
            }
        },
        handleFocus() {
            this.onInput = true;
        },
        clean() {
            this.commentValue = "";
            this.onInput = false;
        }
    }
};
</script>

<style lang="scss" scope>
.blog {
    width: 750rpx;
    user-select: text;
    padding-bottom: 2.5rem;
    box-sizing: border-box;
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
    .on-input {
        height: 4.5rem !important;
        width: 100% !important;
    }

    .foot {
        width: 100%;
        position: fixed;
        left: 0;
        padding: 0.25rem 1rem;
        bottom: 0;
        height: 2.5rem;
        background-color: #fff;
        border-top: 1px solid #e6e6e6;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        align-items: center;
        & > button {
            width: 5rem;
            max-height: 2rem;
            background-color: green;
            line-height: 2rem;
            text-align: center;
            margin: 0.25rem;
        }
        .input {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            .clean {
                height: 100%;
                display: flex;
                width: 1.75rem;
                text-align: center;
                background-color: #f1f0f5;
                justify-content: center;
                border-radius: 0 6px 6px 0px;
                align-items: center;
                color: rgb(255, 73, 73);
            }
            textarea {
                border-radius: 6px 0 0 6px;
                height: 100%;
                width: 100%;
                padding-left: 0.25rem;
                box-sizing: border-box;
                background-color: #f1f0f5;
            }
            .none {
                border-radius: 6px !important;
            }
            .placeholder {
                line-height: 2rem;
                text-indent: 6px;
                font-size: 0.875rem;
            }
        }
        .handle {
            display: flex;
            width: 50%;

            .comments {
                width: 50%;
                display: flex;
                padding: 0.25rem 0rem;
                box-sizing: border-box;
                font-size: 0.75rem;
                flex-direction: column;
                text-align: center;
                text {
                    &:last-of-type {
                        color: red;
                        font-weight: bold;
                    }
                }
            }

            .like {
                width: 50%;
                text-align: center;
                padding: 0.25rem 0rem;
                box-sizing: border-box;
                line-height: 2rem;
                .icon-zannor {
                    color: red;
                }
            }
        }
    }
}
</style>

