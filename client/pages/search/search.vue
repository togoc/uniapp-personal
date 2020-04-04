<template>
    <view class="search">
        <Item v-for="(item, index) in blogs" :item="item" :key="index"></Item>
    </view>
</template>

<script>
import Item from "../../components/index-list-item/index-list-item";
export default {
    components: {
        Item
    },
    data() {
        return {
            blogs: []
        };
    },
    methods: {
        async searchBlog(keyword) {
            let blogs = await this.$http(
                "/blog-service/search?keyword=" + encodeURI(keyword),
                "GET"
            );
        
			this.blogs = blogs;
			
			this.$showToast('已载入')
        }
    },
    onNavigationBarSearchInputConfirmed(v) {
        this.searchBlog(v.text);
    }
};
</script>

<style lang="scss" scope>
.search {
    box-sizing: border-box;
    padding-top: 44px;
    width: 100%;
}
</style>
