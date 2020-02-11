// 邮箱验证
export const checkEmail = (rule, value, callback) => {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value) == true) {
        callback();
    } else {
        callback(new Error("邮箱的格式不对"));
    }
};
// 手机号验证
export const checkPhone = (rule, value, callback) => {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value) == true) {
        callback();
    } else {
        callback(new Error("手机号码的格式不对"));
    }
};