const IMGExtList = [
    "jpeg",
    "jpg",
    "png",
    "gif",
    "svg",
    "tiff",
    "bmp"
]

const IMGChecker = (filename) => {

    if (filename.length < 1 || !filename.includes(".")) {

        return false;
    }

    const extSplit = filename.split(".");

    if (extSplit < 1) {

        return false;
    }

    const ext = extSplit[extSplit.length - 1];

    return IMGExtList.includes(ext.toLowerCase());

}

module.exports = IMGChecker;