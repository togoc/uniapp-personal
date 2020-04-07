<template>
    <view class="comment-item">
        <view class="img-container">
            <image :src="headIMG" />
        </view>
        <view class="name-container">
            <text class="user-name">{{ commentItme.username || "togoc" }}</text>
            <text class="context">{{ commentItme.context || "" }}</text>
            <text class="data">{{ commentItme.date | date1 }}</text>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        commentItme: Object
    },
    data() {
        return {};
    },
    computed: {
        headIMG() {
            let url =
                this.$store.state.baseAvatarURL +
                this.commentItme.userid +
                "?byuserid=1&w=50&h=50";
            return this.commentItme.userid ? url : "../../static/default.png";
        }
    }
};
</script>

<style lang="scss" scope>
.comment-item {
    border-radius: 0.5rem;
    padding: 0.75rem 0;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    box-sizing: border-box;
    margin: 0.25rem 0;
    .img-container {
        width: 12.5%;
        image {
            width: calc(2.91rem / 2);
            height: calc(2.91rem / 2);
            border-radius: 50%;
        }
    }
    .name-container {
        width: 87.5%;
        display: flex;
        flex-direction: column;

        .user-name {
            height: calc(2.91rem / 2);
            font-weight: bold;
        }

        .context {
            margin-bottom: 0.25rem;
        }

        .data {
            height: 1rem;
            font-size: 0.76rem;
        }
    }
}
</style>
