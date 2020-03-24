<template>
    <view @click.stop="handleClickItem" class="content">
        <listItem v-for="(item, index) in blogList" :key="index" :item="item" />
    </view>
</template>

<script>
import listItem from "../../components/index-list-item/index-list-item";
export default {
    components: {
        listItem
    },
    data() {
        return {
            title: "Hello",
            text: "text",
            blogList: [
                {
                    title: "socket网络编程",
                    detail:
                        "我Lorem ipsum dolor sit amet consectetur 我adipisicing elit. Vero earum ratione consectetur ipsa architecto delectus, veritatis eligendi doloremque voluptates laboriosam cum esse tempora corrupti dignissimos unde nisi exercitationem amet illum.",
                    userName: "togoc",
                    commont_count: 10,
                    support: 10
                },
                {
                    title: "socket网络编程",
                    detail:
                        "我Lorem ipsum dolor sit amet consectetur 我adipisicing elit. Vero earum ratione consectetur ipsa architecto delectus, veritatis eligendi doloremque voluptates laboriosam cum esse tempora corrupti dignissimos unde nisi exercitationem amet illum.",
                    userName: "togoc",
                    commont_count: 10,
                    support: 10
                },
                {
                    title: "socket网络编程",
                    detail:
                        "我Lorem ipsum dolor sit amet consectetur 我adipisicing elit. Vero earum ratione consectetur ipsa architecto delectus, veritatis eligendi doloremque voluptates laboriosam cum esse tempora corrupti dignissimos unde nisi exercitationem amet illum.",
                    userName: "togoc",
                    commont_count: 10,
                    support: 10
                },
                {
                    title: "socket网络编程",
                    detail:
                        "我Lorem ipsum dolor sit amet consectetur 我adipisicing elit. Vero earum ratione consectetur ipsa architecto delectus, veritatis eligendi doloremque voluptates laboriosam cum esse tempora corrupti dignissimos unde nisi exercitationem amet illum.",
                    userName: "togoc",
                    commont_count: 10,
                    support: 10
                },
                {
                    title: "socket网络编程",
                    detail:
                        "我Lorem ipsum dolor sit amet consectetur 我adipisicing elit. Vero earum ratione consectetur ipsa architecto delectus, veritatis eligendi doloremque voluptates laboriosam cum esse tempora corrupti dignissimos unde nisi exercitationem amet illum.",
                    userName: "togoc",
                    commont_count: 10,
                    support: 10
                },
                {
                    title: "socket网络编程",
                    detail:
                        "我Lorem ipsum dolor sit amet consectetur 我adipisicing elit. Vero earum ratione consectetur ipsa architecto delectus, veritatis eligendi doloremque voluptates laboriosam cum esse tempora corrupti dignissimos unde nisi exercitationem amet illum.",
                    userName: "togoc",
                    commont_count: 10,
                    support: 10
                },
                {
                    title: "socket网络编程",
                    detail: "我Lorem ipsum dolor si",
                    userName: "togoc",
                    commont_count: 10,
                    support: 10
                }
            ]
        };
    },
    onLoad() {},
    onNavigationBarSearchInputClicked() {
        uni.navigateTo({
            url: "../search/search",
            animationType: "fade-in"
        });
    },
    methods: {
        handleClickItem(e) {
            let { type } = e.target.dataset;
            console.log(type);
        }
    }
};
</script>

<style lang="scss" scoped>
// 750/x= 360/15
.content {
    width: 750rpx;
    /* #ifndef MP-WEIXIN */
    padding-top: 44px;
    margin-top: var(--status-bar-height);
    /* #endif */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
