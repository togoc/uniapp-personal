<script>
export default {
    onLaunch: function() {},
    onShow: function() {
        this.$store.dispatch("getUser");
    },
    onHide: function() {}
};
</script>

<style lang="scss">
@import "./static/css/icons.scss";

page {
    font-family: Tahoma, "Microsoft Yahei", "Simsun";
    background-color: $uni-bg-color-grey;
    width: 100%;
    height: 100%;
    color: $uni-text-color;
}
</style>
