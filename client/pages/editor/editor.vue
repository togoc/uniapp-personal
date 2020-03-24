<template>
    <view>
        <myeditor
            class="editor"
            @cancel="hideEditor"
            @save="saveEditor"
            :html="html"
            :imageUploader="uploadImg"
            :muiltImage="true"
        >
        </myeditor>
    </view>
</template>

<script>
import myeditor from "@/components/robin-editor/editor.vue";
export default {
    components: {
        myeditor
    },
    data() {
        return {
            html: ''
        };
    },
    methods: {
        hideEditor(e) {
            console.log(1);
        },
        saveEditor(e) {
            console.log(e);
        },
        uploadImg(path, fn) {
            fn(path)
        }
    }
};
</script>

<style lang="scss">
</style>
