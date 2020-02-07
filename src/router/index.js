// 导入Vue
import Vue from 'vue'
// 导入Vue-router
import VueRouter from 'vue-router'
// 导入模块login
import login from '../views/login/login.vue'
// 注册一下  use
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
    // 路由规则
    routes:[
        // 登陆
        {
            path:"/login",
            component:login
        }
    ]
})
// 暴露出去
export default router