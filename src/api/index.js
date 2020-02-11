// 导入token工具函数
import {getToken} from '../utils/token.js'
// 导入axios
import axios from 'axios'

const indexRequest = axios.create({
    // 基地址
    baseURL:process.env.VUE_APP_URL,
    // 是否跨域
    withCredentials:true,
})

// 用户信息接口
export function info() {
    return indexRequest({
        url:'/info',
        method:'get',
        // 设置请求头 headers 是axios定义的设置方式
        headers:{
            token:getToken()
        }
    })
}

// 用户退出的接口
export function logout() {
    return indexRequest({
        url:'/logout',
        method:'get',
        // 设置请求头 headers 是axios定义的设置方式
        headers:{
            token:getToken()
        }
    })
}