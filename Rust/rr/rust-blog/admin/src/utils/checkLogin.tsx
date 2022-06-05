export default () => {
    // 判断localStorage是否有token
    return !!localStorage.getItem('token');
};
