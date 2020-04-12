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
                    <view class="input-container">
                        <input
                            type="text"
                            value=""
                            v-model.trim="folderName"
                            clean-abled
                            placeholder="请输入文件名称"
                            :cursor-spacing="60"
                        />
                        <text class="blank"></text>
                        <text
                            v-if="folderName !== ''"
                            @click.stop="clear"
                            class="iconfont icon-qingchu"
                        ></text>
                    </view>
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
            <template v-if="fileList.length">
                <file-item
                    v-for="(item, index) in filesList"
                    :file="item"
                    :key="index"
                    @handleFile="handleFile"
                ></file-item>
            </template>
            <template v-else>
                <view class="emty">无文件</view>
            </template>
        </view>
        <uni-popup ref="videoPopup">
            <view class="video">
                <video ref="video" autoplay :src="videoSrc"></video>
            </view>
        </uni-popup>
        <uni-popup ref="imagePopup">
            <view class="image">
                <image :src="imageSrc" />
            </view>
        </uni-popup>
        <!-- <tki-file-manager ref="filemanager" @result="resultPath">
            暂时不支持对非媒体内容进行选择
        </tki-file-manager> -->
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
                { iconPath: "", selectedIconPath: "", text: "上传图片" },
                { iconPath: "", selectedIconPath: "", text: "上传视频" },
                { iconPath: "", selectedIconPath: "", text: "新文件夹" }
            ],
            fileList: [],

            folderName: "新文件夹",
            folderPath: "/",
            folderID: "",
            videoSrc: "",
            imageSrc: ""
        };
    },
    computed: {
        filesList() {
            let arr = [];
            let arr1 = [];
            this.fileList.forEach((v, i) => {
                if (v.type === "folder") {
                    arr.push(v);
                } else {
                    arr1.push(v);
                }
            });
            return arr.concat(arr1);
        }
    },
    onLoad(options) {
        let path = options.path;
        if (path) {
            this.folderPath = path;
        }
        uni.setNavigationBarTitle({
            title: path ? path.slice(1) : "我的文件"
        });
    },
    onReady() {
        this.getFolderFile();
    },
    methods: {
        handleFile(e) {
            let { type, path, fileid } = e;
            if (type === "folder") {
                uni.navigateTo({
                    url: "../mydrive/mydrive?path=" + path
                });
            }
            if (type === "video") {
                this.$refs.videoPopup.open();
                this.videoSrc =
                    "http://192.168.3.3:3000/blog/file-service/video/" + fileid;
            }

            if (type === "image") {
                this.$refs.imagePopup.open();
                this.imageSrc =
                    "http://192.168.3.3:3000/blog/file-service/img/" + fileid;
            }
        },
        async getFolderFile() {
            let res = await this.$store.dispatch("getFolder", {
                folderPath: this.folderPath
            });
            this.folderPath = res.folderpath;
            this.fileList = res.files;
            this.folderID = res._id;
        },
        trigger(e) {
            let { index } = e;
            //选图片
            if (index === 0) {
                uni.chooseImage({
                    count: 1,
                    success: async res => {
                        let body = {
                            path: res.tempFilePaths[0],
                            folderpath: this.folderPath,
                            folderID: this.folderID
                        };

                        await this.$store.dispatch("uploadFile", body);
                        this.getFolderFile();
                    }
                });
            }
            //选视频
            if (index === 1) {
                uni.chooseVideo({
                    sourceType: ["camera", "album"],
                    success: async res => {
                        let body = {
                            path: res.tempFilePath,
                            folderpath: this.folderPath,
                            folderID: this.folderID
                        };

                        await this.$store.dispatch("uploadFile", body);
                        this.getFolderFile();
                    }
                });
            }
            //新建文件夹
            if (index === 2) {
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
        async handleAddFolder(e) {
            let { type } = e.target.dataset;

            if (type === "cancel") {
                this.$refs.popup.close();
            }

            if (type === "build") {
                let res = await this.$store.dispatch("addFolder", {
                    CurrentFolderName: this.folderPath,
                    NewFolderName: this.folderName
                });
                this.$refs.popup.close();
                this.getFolderFile();
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
