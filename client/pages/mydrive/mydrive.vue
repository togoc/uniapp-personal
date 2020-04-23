<template>
    <view class="file">
        <template v-if="selectedFiles.length">
            <view class="edit-nav" @click.stop="handleEdit">
                <view
                    class="edit-item"
                    hover-class="edit-btn"
                    v-for="(item, index) in editFormat"
                    :key="index"
                >
                    <view :class="['iconfont', item.icon]"></view>
                    <view class="edit-context">{{ item.title }}</view>
                    <button
                        :data-value="item.value"
                        class="edit-blank-btn"
                    ></button>
                </view>
            </view>
        </template>
        <template v-else>
            <uni-fab
                :content="content"
                horizontal="right"
                @trigger="trigger"
            ></uni-fab>
        </template>
        <!-- 新建文件夹 -->
        <uni-popup ref="popup" type="center">
            <view class="add-new-folder">
                <view class="input-context">
                    <text>新建文件夹</text>
                    <view class="input-container">
                        <input
                            type="text"
                            focus
                            value=""
                            v-model.trim="folderName"
                            clean-abled
                            placeholder="请输入美丽的名称"
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
                        {{ addFolderNameType === "add" ? "创建 " : "重命名" }}
                    </button>
                </view>
            </view>
        </uni-popup>
        <view class="files" :class="{ padding: selectedFiles.length }">
            <template v-if="fileList.length">
                <file-item
                    v-for="item in filesList"
                    :file="item"
                    :key="item._id"
                    @selected="selected"
                    @handleFile="handleFile"
                ></file-item>
            </template>
            <!-- 无文件 -->
            <template v-else>
                <view class="emty">
                    <image class="emty-img" src="/static/file/emty.png" />
                    <text>空文件夹</text>
                </view>
            </template>
        </view>
        <!-- 视频层 -->
        <uni-popup @change="popupChange" ref="videoPopup">
            <view class="video">
                <video ref="video" autoplay :src="videoSrc"></video>
            </view>
        </uni-popup>
        <!-- 图片层 -->
        <uni-popup @change="popupChange" ref="imagePopup">
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
                {
                    iconPath: "/static/file/image.png",
                    selectedIconPath: "",
                    text: "上传图片"
                },
                {
                    iconPath: "/static/file/video.png",
                    selectedIconPath: "",
                    text: "上传视频"
                },
                {
                    iconPath: "/static/file/folder.png",
                    selectedIconPath: "",
                    text: "新文件夹"
                }
            ],
            editFormat: [
                {
                    title: "重命名",
                    icon: "icon-chongmingming",
                    value: "rename"
                },
                {
                    title: "下载",
                    icon: "icon-xiazai",
                    value: "download"
                },
                {
                    title: "分享",
                    icon: "icon-fenxiang",
                    value: "share"
                },
                {
                    title: "删除",
                    icon: "icon-shanchu",
                    value: "delete"
                }
            ],
            fileList: [],

            folderName: "新文件夹",
            folderPath: "/",
            folderID: "",
            videoSrc: "",
            imageSrc: "",
            addFolderNameType: "add",
            selectedFiles: []
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
            this.folderID = path;
        }
    },
    onReady() {
        this.getFolderFile();
    },
    async onPullDownRefresh() {
        await this.getFolderFile();
        uni.stopPullDownRefresh();
    },
    methods: {
        async handleEdit(e) {
            let { value } = e.target.dataset;
            console.log(value);
            switch (value) {
                case "rename":
                    if (this.selectedFiles.length > 1) {
                        this.$showToast("无法进行多项重命名");
                    } else {
                        let body = this.selectedFiles[0];
                        this.folderName = body.name;
                        this.addFolderNameType = "rename";
                        this.$refs.popup.open();
                        //具体操作转到新建文件夹按钮事件
                    }
                    break;
                case "download":
                    // #ifdef H5
                    // let downloadArr = this.selectedFiles.filter(
                    //     v => v.type !== "folder"
                    // );
                    // downloadArr.forEach(v => {
                    //     this.$http("/file-service/download-file", "GET", {
                    //         fileID: v.fileid
                    //     });
                    // });
                    // #endif
                    let downloadArr = this.selectedFiles.filter(
                        v => v.type !== "folder"
                    );
                    await this.$store.dispatch("downloadFile", downloadArr);
                    break;

                case "share":
                    break;
                case "delete":
                    this.selectedFiles.forEach(async v => {
                        let res = await this.$store.dispatch(
                            "deleteFolderAndFile",
                            { ...v, CurrentFolderID: this.folderID }
                        );
                    });
                    this.getFolderFile();
                    break;
                default:
                    break;
            }
        },
        //选择某一项
        selected(e) {
            let index = this.selectedFiles.indexOf(e);
            if (index !== -1) {
                this.selectedFiles.splice(index, 1);
            } else {
                this.selectedFiles.push(e);
            }
        },
        //点击某一项
        handleFile(e) {
            let { type, path, src, folderid } = e;
            if (type === "folder") {
                if (this.selectedFiles.length) {
                    this.$showToast("请先操作");
                    return;
                }
                uni.navigateTo({
                    url: "../mydrive/mydrive?path=" + folderid
                });
            }
            if (type === "video") {
                this.$refs.videoPopup.open();
                this.videoSrc = src;
            }

            if (type === "image") {
                this.$refs.imagePopup.open();
                this.imageSrc = src;
            }
        },
        async getFolderFile() {
            let res = await this.$store.dispatch("getFolder", {
                folderID: this.folderID
            });
            this.folderPath = res.foldername;
            this.fileList = res.files;
            this.folderID = res._id;
            this.selectedFiles = [];
            this.addFolderNameType = "add";
            this.folderName = "新文件夹";
            this.$refs.popup.close();
            uni.setNavigationBarTitle({
                title: res.foldername
            });
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
                            folderID: this.folderID
                        };

                        await this.$store.dispatch("uploadFile", body);
                        this.getFolderFile();
                    }
                });
            }
            //打开新建文件夹输入
            if (index === 2) {
                this.$refs.popup.open();
            }
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
                this.getFolderFile();
            }

            if (type === "build") {
                if (this.addFolderNameType === "add") {
                    let res = await this.$store.dispatch("addFolder", {
                        CurrentFolderID: this.folderID,
                        NewFolderName: this.folderName
                    });
                    this.getFolderFile();
                } else {
                    let body = this.selectedFiles[0];
                    let res = await this.$store.dispatch(
                        "renameFolderAndFile",
                        {
                            ...body,
                            CurrentFolderID: this.folderID,
                            newName: this.folderName
                        }
                    );
                    this.getFolderFile();
                }
            }
        },
        popupChange(e) {
            if (!e.show) {
                this.videoSrc = "";
                this.imageSrc = "";
            }
        }
    }
};
</script>

<style lang="scss" scope>
.file {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
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
    .padding {
        height: calc(100% - 50px) !important;
    }
    .emty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.85rem;
        font-weight: bold;
        width: 100%;
        margin-top: 30%;
        .emty-img {
            width: 200rpx;
            height: 200rpx;
        }
    }
    .files {
        padding: 0 $uni-spacing-col-base;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }
    .edit-nav {
        position: fixed;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        text-align: center;
        bottom: 0;
        left: 0;
        background-color: $uni-bg-color-grey-more;
        color: $uni-text-color;
        .edit-item {
            width: 100%;
            font-size: 16px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            flex-direction: column;
            .iconfont {
                font-size: 15px;
                width: 100%;
                height: calc(14px * 1.33);
            }
            .edit-context {
                font-size: 12px;
                height: calc(14px * 1.33);
                width: 100%;
            }
            .edit-blank-btn {
                width: 100%;
                height: 100%;
                position: absolute;
                opacity: 0;
            }
        }
        .edit-btn {
            opacity: $uni-opacity-disabled;
            background-color: $uni-bg-color-grey-more;
        }
    }
}
</style>
