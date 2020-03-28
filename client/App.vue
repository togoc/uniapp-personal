<script>
export default {
    onLaunch: function() {},
    onShow: function() {
        console.log("App Show");
        this.autoLogin();
    },
    onHide: function() {
        console.log("App Hide");
    },
    methods: {
        async autoLogin() {
            let res = await this.$http("/user-service/user");
            let data = res.data;

            this.$store.commit("SETUSER", data);
        }
    }
};
</script>

<style lang="scss">
@import "./static/css/icons.scss";
</style>
