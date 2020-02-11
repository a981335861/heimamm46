// 操作token的key一般用常量(大写)保存
const TOKENKEY = 'heimammToken'

// 设置token
export function setToken(token) {
    window.localStorage.setItem(TOKENKEY,token)
}
// 获取token
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}
// 移除token
export function removeToken() {
    return window.localStorage.removeItem(TOKENKEY)
}