const ExtList = [
    "ogm",
    "wmv",
    "mpg",
    "mp4",
    "webm",
    "ogv",
    "mov",
    "asx",
    "mpeg",
    "m4v",
    "avi"
]

const videoChecker = (filename) => {

    if (filename.length < 1 || !filename.includes(".")) {

        return false;
    }

    const extSplit = filename.split(".");

    if (extSplit < 1) {

        return false;
    }

    const ext = extSplit[extSplit.length - 1];

    return ExtList.includes(ext.toLowerCase());

}

module.exports = videoChecker;