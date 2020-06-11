<template>
    <view>
        <view
            class="progress-item"
            v-for="(item, index) in downLoadStateArr"
            :key="index"
        >
            <view class="progress-item-name">
                <text>{{ item.fileName }}</text>
            </view>
            <progress :percent="item.progress" show-info stroke-width="3" />
        </view>
    </view>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            downLoadArr: []
        };
    },
    computed: {
        ...mapState(["downLoadStateArr"])
    }
};
</script>

<style lang="scss">
.progress-item {
    box-sizing: border-box;

    padding: $uni-spacing-col-base;
    border-bottom: 1px solid $uni-border-color;
}
</style>
