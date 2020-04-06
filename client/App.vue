<script>
export default {
    onLaunch: function() {},
    onShow: function() {
        this.$store.dispatch("getUser");
    },
    onHide: function() {
        console.log("App Hide");
    }
};
</script>

<style lang="scss">
@import "./static/css/icons.scss";

page {
    font-family: Tahoma, "Microsoft Yahei", "Simsun";
}
</style>
