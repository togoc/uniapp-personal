<script>
import { mapActions } from "vuex";
export default {
    onLaunch: function() {},
    onShow: function() {
        this.autoLogin();
    },
    onHide: function() {
        console.log("App Hide");
    },
    methods: {
        ...mapActions(['autoLogin'])
    }
};
</script>

<style lang="scss">
@import "./static/css/icons.scss";
</style>
