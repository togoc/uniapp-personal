<template>
    <view class="my-home">
        <user-header
            class="user-header"
            :header="true"
            :quickLoginOptions="quickLoginOptions"
            @userMethod="userMethod"
            @changeAvatar="changeAvatar"
            :user="user"
            :favoriteIfo="favorite"
        >
            <template v-slot:left>
                <view @click.stop="handleAddFriend" class="head-top-item left"><text class="iconfont icon-AddFriend"></text></view>
            </template>
            <template v-slot:middle>
                <text>我的</text>
            </template>
            <template v-slot:right>
                <view @click.stop="handleSetting" class="head-top-item right"><text class="iconfont icon-setting"></text></view>
            </template>
        </user-header>
        <view class="edit-nav">
            <navigator redirect hover-class="className" class="edit-item" :url="item.url" v-for="(item, index) in editFormat" :key="index">
                <view :class="['iconfont', item.icon]"></view>
                <view class="edit-context">{{ item.title }}</view>
                <button :data-value="item.value" class="edit-blank-btn"></button>
            </navigator>
        </view>
    </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            quickLoginOptions: [
                {
                    icon: 'icon-shouji',
                    handleClickMethod: 'phoneLogin'
                },
                {
                    icon: 'icon-qq',
                    handleClickMethod: 'qqLogin'
                },
                {
                    icon: 'icon-weixin',
                    handleClickMethod: 'weixinLogin'
                }
            ],
            favoriteIfo: [
                {
                    count: 0,
                    value: 'focus',
                    title: '关注'
                },
                {
                    count: 0,
                    value: 'fans',
                    title: '粉丝'
                },
                {
                    count: 0,
                    value: 'blog_read_count',
                    title: '访问'
                },
                {
                    count: 0,
                    value: 'rank',
                    title: '排名'
                }
            ],
            editFormat: [
                {
                    title: '我的文件',
                    icon: 'icon-wenjianjia',
                    value: 'rename',
                    url: '../mydrive/mydrive'
                }
                // {
                //     title: "下载",
                //     icon: "icon-xiazai",
                //     value: "download",
                //     url: "../download/download"
                // }
            ]
        };
    },
    computed: {
        ...mapState(['user']),
        favorite() {
            return this.favoriteIfo.map(v => {
                v.count = Array.isArray(this.user[v.value]) ? this.user[v.value].length : this.user[v.value];
                return v;
            });
        }
    },
    methods: {
        changeAvatar() {
            this.$store.dispatch('changeAvatar');
        },
        handleAddFriend() {
            uni.navigateTo({
                url: '../await/await'
            });
            // uni.showToast({
            //     title: "暂不支持",
            //     icon: "none",
            //     duration: 2000
            // });
        },
        handleSetting() {
            uni.navigateTo({
                url: '../setting/setting'
            });
        },
        qqLogin() {
            console.log('qqLogin');
            uni.showToast({
                title: '暂不支持',
                icon: 'none',
                duration: 2000
            });
        },
        weixinLogin() {
            console.log('weixinLogin');
            uni.showToast({
                title: '暂不支持',
                icon: 'none',
                duration: 2000
            });
        },
        phoneLogin() {
            console.log('phoneLogin');
            uni.showToast({
                title: '暂不支持',
                icon: 'none',
                duration: 2000
            });
        },
        userMethod() {
            console.log('login');
            uni.navigateTo({
                url: '../login/login'
            });
        }
    }
};
</script>

<style lang="scss">
.my-home {
    width: 100%;
    .user-header {
        width: 750rpx;
        height: 10rem;
        background-image: linear-gradient($uni-color-primary, #fff);
        .head-top-item {
            .iconfont::before {
                font-size: 1.333rem;
            }
        }
        .right {
            float: right;
        }
    }
    .edit-nav {
        margin-top: $uni-spacing-row-lg;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        background-color: $uni-bg-color-grey;
        box-sizing: border-box;
        padding: 0 $uni-spacing-col-base;
        text-align: center;
        .edit-item {
            width: 100%;
            font-size: 16px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            flex-direction: column;
            font-weight: bold;
            .iconfont {
                font-size: 15px;
                width: 100%;
                height: calc(14px * 1.33);
            }
            .edit-context {
                font-size: 12px;
                height: calc(14px * 1.33);
                width: 100%;
            }
            .edit-blank-btn {
                width: 100%;
                height: 100%;
                position: absolute;
                opacity: 0;
            }
        }
        .edit-btn {
            opacity: $uni-opacity-disabled;
            background-color: $uni-bg-color-grey-more;
            color: #000;
        }
    }
}
</style>
