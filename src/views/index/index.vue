<template>
  <el-container class="my-container">
    <el-header class="my-header">
        <div class="left">
            <i class="el-icon-s-fold"></i>
            <img src="../../assets/index_logo.png" alt="">
            <span>黑马面面</span>
        </div>
        <div class="right">
            <img :src="userIcon" alt="">
            <span class="name">{{username}},您好</span>
            <el-button type="primary">退出</el-button>
        </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import {info} from '@/api/index.js'
export default {
    name:'index',
    data() {
        return {
            // 用户名
            username:"",
            // 用户头像
            userIcon:"",
        }
    },
    created(){
        info().then(res=>{
            this.username = res.data.data.username;
            this.userIcon = process.env.VUE_APP_URL+'/'+res.data.data.avatar;
        })
    }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    // background: hotpink;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        margin-right: 11px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      span.name {
        margin-right: 38px;
        font-size: 14px;
      }
    }
  }
  .my-aside {
    background: yellowgreen;
  }
  .my-main {
    background: #0094ff;
  }
}
</style>