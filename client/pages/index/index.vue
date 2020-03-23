<template>
    <view class="content">
        <image src="/static/docs/index.jpg" mode="" />
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "Hello"
        };
    },
    onLoad() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
