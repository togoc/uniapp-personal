<template>
    <view class="file">
        <uni-fab
            :content="content"
            horizontal="right"
            @trigger="trigger"
        ></uni-fab>
        <uni-popup ref="popup" type="center">
            <view class="add-new-folder">
                <view class="input-context">
                    <text>新建文件夹</text>
                    <view class="input-container"
                        ><input
                            type="text"
                            value=""
                            v-model.trim="folderName"
                            clean-abled
                            placeholder="请输入文件名称"
                            :cursor-spacing="60"/>
                        <text class="blank"></text>
                        <text
                            v-if="folderName !== ''"
                            @click.stop="clear"
                            class="iconfont icon-qingchu"
                        ></text
                    ></view>
                </view>
                <view class="add-btn" @click.stop="handleAddFolder">
                    <button class="add-folder-btn" data-type="cancel">
                        取消
                    </button>
                    <button class="add-folder-btn" data-type="build">
                        创建
                    </button>
                </view>
            </view>
        </uni-popup>
        <view class="files">
            <file-item></file-item>
            <file-item></file-item>
            <file-item></file-item>
        </view>
        <tki-file-manager ref="filemanager" @result="resultPath"
            >上传</tki-file-manager
        >
    </view>
</template>

<script>
export default {
    data() {
        return {
            pattern: {
                color: ""
            },
            content: [
                { iconPath: "", selectedIconPath: "", text: "上传文件" },
                { iconPath: "", selectedIconPath: "", text: "新文件夹" }
            ],
            fileList: [],
            folderName: ""
        };
    },
    onLoad() {
        uni.setNavigationBarTitle({
            title: "我的文件"
        });
    },
    onReady() {},
    methods: {
        trigger(e) {
            let { index } = e;

            if (index === 0) {
                // #ifdef APP-PLUS
                this.$refs.filemanager._openFile();
                // #endif
            }
            if (index === 1) {
                this.show = false;
                this.$refs.popup.open();
            }
            console.log(index);
        },
        resultPath(path) {
            console.log(path);
        },
        open() {
            this.$refs.popup.open();
        },
        clear() {
            this.folderName = "";
        },
        handleAddFolder(e) {
            let { type } = e.target.dataset;

            if (type === "cancel") {
                this.$refs.popup.close();
            }

            if (type === "build") {
                console.log(type);
            }
        }
    }
};
</script>

<style lang="scss" scope>
.file {
    width: 100%;
    .add-new-folder {
        display: flex;
        flex-direction: column;
        text-align: center;
        background-color: $uni-bg-color;
        border-radius: $uni-border-radius-lg;

        .input-context {
            padding: $uni-spacing-row-sm $uni-spacing-col-base 0
                $uni-spacing-col-base;
            box-sizing: border-box;
            flex-direction: column;
            display: flex;
            text {
                font-weight: bold;
                font-size: 0.85rem;
            }

            .input-container {
                display: flex;
                flex-direction: row;
                background-color: $uni-bg-color-grey-more;
                margin: $uni-spacing-row-sm 0;
                border-radius: $uni-border-radius-base;
                height: 2rem;
                input {
                    text-align: left;
                    text-indent: 5px;
                    width: 100%;
                    height: 100%;
                }
                .blank {
                    width: 2rem;
                    height: 1rem;
                }
                .iconfont {
                    width: 2rem;
                    right: $uni-spacing-col-base;
                    position: absolute;
                    line-height: 2rem;
                }
            }
        }

        .add-btn {
            flex-direction: row;
            display: flex;
            border-top: 1px solid $uni-border-color;
            width: 100%;
            .add-folder-btn {
                width: 100%;
                border: none;
                outline: none;
                background-color: #fff;
                font-weight: bold;
                font-size: 0.85rem;
                &::after {
                    border: none;
                }
                &:last-of-type {
                    color: $uni-color-primary;
                }
            }
        }
    }
    .files {
        padding: 0 $uni-spacing-col-base;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
}
</style>
