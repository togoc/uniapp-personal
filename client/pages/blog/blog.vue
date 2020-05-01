<template>
    <view class="blog-outer">
        <scroll-view
            scroll-y="true"
            scroll-with-animation
            :class="['blog', { isoninput: onInput }]"
            :scroll-into-view="viewTarget"
            @scroll="onScroll"
        >
            <view id="head" class="head">
                <view class="title"> {{ blog.title }}</view>
                <view class="date">{{ blog.updatedAt | date1 }}</view>
                <view class="user">
                    <view class="header-img"
                        ><image :src="headIMGSrc" alt="头像"
                    /></view>
                    <view class="user-name">
                        <text>{{ blog.username || "" }}</text>
                        <text>{{ blog.username || "" }}</text>
                    </view>
                    <!-- <view class="focus">
                        <text>私信</text>
                        <text>关注</text>
                    </view> -->
                </view>
            </view>
            <view id="preview" class="preview" v-html="htmlData">
                <rich-text :nodes="htmlData" class="previewNodes"></rich-text>
            </view>
            <view id="comment" class="comment-container">
                <view class="comment-title">评论</view>
                <comment-item
                    v-for="(item, index) in comments"
                    :commentItme="item"
                    :key="index"
                />
            </view>
            <view id="end"></view>
        </scroll-view>
        <view id="foot" :class="['foot', { 'on-input': onInput }]">
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
                    <view class="comments" @tap.stop="linkToComments">
                        <text>评论</text>
                        <text>{{ commentsLength }}</text>
                    </view>
                    <view class="like" @tap.stop="toggleLike">
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
            blogID: "",
            blog: {
                likes: []
            },
            commentValue: "",
            onInput: false,
            viewTarget: "head"
        };
    },
    onLoad(options) {
        let blogID = options.blogID;
        this.blogID = blogID;
        this.getBlog(blogID);
    },
    computed: {
        htmlData() {
            return this.blog.html || "";
        },
        commentsLength() {
            return this.blog.comments ? this.blog.comments.length : 0;
        },
        comments() {
            return this.blog.comments || [];
        },
        likeNum() {
            return this.blog.likes ? this.blog.likes.length : 0;
        },
        headIMGSrc() {
            let url =
                this.$store.state.baseAvatarURL +
                this.blog.userid +
                "?byuserid=1&w=50&h=50";
            return this.blog.userid ? url : "../../static/default.png";
        }
    },
    async onPullDownRefresh() {
        await this.getBlog(this.blogID);
        uni.stopPullDownRefresh();
    },
    methods: {
        onScroll(e) {
            this.viewTarget = "";
        },
        async getBlog(id) {
            let data = await this.$store.dispatch("getItemBlogByID", id);
            this.blog = data;
        },
        async handleAddComment() {
            if (this.commentValue === "") {
                return;
            }
            let body = { context: this.commentValue, blogID: this.blog._id };
            this.blog = await this.$store.dispatch("addComment", body);
            this.onInput = false;
            this.commentValue = "";
            this.viewTarget = "end";
        },
        async toggleLike() {
            await this.$store.dispatch("toggleLike", this.blog._id);
            let likes = this.blog.likes;
            let userID = this.$store.state.user._id;
            //更新视图
            if (this.blog.likes.includes(userID)) {
                this.blog.likes.splice(this.blog.likes.indexOf(userID), 1);
            } else {
                this.blog.likes.push(userID);
            }
        },
        linkToComments() {
            this.viewTarget = "comment";
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
.blog-outer {
    height: 100%;
    width: 100%;
    .isoninput {
        padding-bottom: 4.5rem !important;
    }
    .blog {
        background-color: $uni-bg-color;
        height: 100%;
        width: 100%;
        user-select: text;
        padding-bottom: 2.5rem;
        box-sizing: border-box;

        .head {
            padding: $uni-spacing-col-base;
            width: 100%;
            box-sizing: border-box;
            background-color: $uni-bg-color-grey;
            border-bottom: 2px solid #fbfbfc;

            .title {
                width: 100%;
                font-weight: bold;
                font-size: 1.125rem;
            }

            .date {
                padding: 0.5rem 0;
                font-size: 0.75rem;
                line-height: 2rem;
                padding: 0;
                margin: 0;
                color: $uni-text-color-grey;
            }

            .user {
                display: flex;
                flex-direction: row;
                box-sizing: border-box;
                align-items: center;
                border-radius: $uni-border-radius-base;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
                width: 100%;
                height: 2.91rem;
                .header-img {
                    width: 12.5%;
                    image {
                        width: calc(2.91rem / 2);
                        height: calc(2.91rem / 2);
                        border-radius: 50%;
                    }
                }

                .user-name {
                    width: 7.65rem;
                    display: flex;
                    max-width: 7.65rem;
                    box-sizing: border-box;
                    flex-direction: column;
                    & > text {
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 0.875rem;
                        &:first-of-type {
                            font-size: 1rem;
                        }
                    }
                }

                .focus {
                    width: 7rem;
                    position: absolute;
                    text-align: center;
                    right: $uni-spacing-col-base;
                    padding: 0.125rem $uni-spacing-col-base;
                    display: flex;
                    white-space: nowrap;
                    flex-direction: row;
                    justify-content: space-around;
                    & > text {
                        width: 3rem;
                        color: #000000;
                        padding: 0.125rem;
                        font-weight: bold;
                        font-size: 0.85rem;
                        border-radius: $uni-border-radius-sm;
                        border: 1px solid $uni-border-color;
                        background-color: $uni-bg-color;
                        &:last-of-type {
                            color: red;
                        }
                    }
                }
            }
        }
        .preview {
            box-sizing: border-box;
            padding: $uni-spacing-col-lg;
            word-wrap: break-word;
            letter-spacing: 1px;
            font-size: 0.85rem;
        }
        .comment-container {
            .comment-title {
                font-size: 0.875rem;
                padding: 0.25rem 0;
                border-top: 1px solid $uni-bg-color-grey-more;
            }
            padding: 0 $uni-spacing-col-base;
            box-sizing: border-box;
            width: 100%;
        }
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
            background-color: $uni-color-error;
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

