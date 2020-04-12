<template>
    <view class="file-item">
        <view class="file-head-img">
            <text
                :class="[
                    'iconfont',
                    { 'icon-wenjianjia': file.type === 'folder' },
                    { 'icon-shipin-tianchong': file.type === 'video' },
                    { 'icon-tupian': file.type === 'image' }
                ]"
            ></text>
        </view>
        <view class="file-name-date" @click.stop="handleFile">
            <view class="file-name">
                {{ file.name || "" }}
            </view>
            <view class="file-date">
                {{ file.createdAt | date1 }}
            </view>
        </view>
        <view class="file-checked">
            <checkbox :checked="checked" />
        </view>
    </view>
</template>

<script>
export default {
    props: {
        file: Object
    },
    data() {
        return {
            checked: false
        };
    },
    methods: {
        longpress(e) {
            this.$showToast("1");
        },
        handleFile() {
            this.$emit("handleFile", this.file);
        }
    }
};
</script>

<style lang="scss" scope>
.file-item {
    display: flex;
    position: relative;
    height: 3rem;
    width: 100%;
    flex-direction: row;
    border-bottom: 1px solid $uni-border-color;
    margin-top: 1px;
    .file-head-img {
        width: 3rem;
        height: 3rem;
        padding: 0.5rem;
        box-sizing: border-box;
        text-align: center;
        .iconfont {
            width: 2rem;
            height: 2rem;
            font-size: calc(2rem / 1.33);
            line-height: 2rem;
            text-align: center;
        }
    }

    .file-name-date {
        width: 13rem;
        height: 3rem;
        font-size: 0.85rem;
        .file-name {
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            height: 1.5rem;
            line-height: 1.65rem;
        }

        .file-date {
            color: $uni-text-color-grey;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 0.75rem;
        }
    }

    .file-checked {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
    }
}
</style>
