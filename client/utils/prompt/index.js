export const showToast = (title) => {
    uni.showToast({
        title: title,
        duration: 2000,
        icon: "none"
    });
}