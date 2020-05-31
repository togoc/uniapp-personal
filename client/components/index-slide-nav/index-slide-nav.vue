<template>
    <view class="outer">
        <view class="head">
            <text :class="{ 'is-active': current === 0 }" @click="toA"
                >最新</text
            >
            <text :class="{ 'is-active': current === 1 }" @click="toB"
                >最热</text
            >
        </view>
        <swiper
            class="swiper"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            :current="current"
            @change="change"
            @transition="transition"
            @animationfinish="animationfinish"
        >
            <slot name="item"></slot>
        </swiper>
    </view>
</template>
<script>
export default {
    data() {
        return {
            background: ["color1", "color2", "color3"],
            autoplay: false,
            interval: 2000,
            duration: 500,
            current: 0
        };
    },
    methods: {
        changeIndicatorDots(e) {
            this.indicatorDots = !this.indicatorDots;
        },
        changeAutoplay(e) {
            this.autoplay = !this.autoplay;
        },
        intervalChange(e) {
            this.interval = e.target.value;
        },
        durationChange(e) {
            this.duration = e.target.value;
        },
        change(e) {
            // this.current = e.detail.current;
        },
        transition(e) {
            // console.log(e);
        },
        animationfinish(e) {
            this.current = e.detail.current;
        },
        toA() {
            this.current = 0;
        },
        toB() {
            this.current = 1;
        }
    }
};
</script>


<style lang="scss" scoped>
view.outer {
    width: 100%;
    .head {
        width: 100%;
        display: flex;
        position: fixed;
        flex-direction: row;
        background-color: $uni-color-primary;
        height: 40px;
        box-sizing: border-box;
        transition: all 0.5s;
        font-size: 0.75rem;
        color: rgb(204, 204, 204);
        left: 0;
        z-index: 5;
        text {
            width: 100%;
            transition: all 0.5s;
            text-align: center;
            font-weight: bold;
            line-height: 40px;
            letter-spacing: 1px;
        }
    }
    .swiper {
        width: 100%;
        height: 100%;
    }
    .is-active {
        font-size: 0.875rem;
        color: #ffffff;
    }
}
</style>





   