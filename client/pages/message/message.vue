<template>
    <view> </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    onReady() {
        uni.getLocation({
            // #ifdef APP-PLUS
            geocode: true, //是否解析位置
            // #endif
            success(e) {
                const { latitude, longitude, address } = e;
                console.log(address);
            }
        });
    }
};
</script>

<style lang="scss">
</style>
