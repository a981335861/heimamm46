<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box">
      <!-- 顶部的标题 -->
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt class="logo" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登陆</span>
      </div>
      <!-- 登录框表单 -->
      <el-form ref="form" :model="loginForm" label-width="43px" class="from">
        <el-form-item>
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="17">
            <el-input v-model="loginForm.loginCode" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="7">
            <img src="../../assets/login-code.png" alt="" class="code">
          </el-col>
        </el-form-item>
        <el-form-item>
          <!-- 用户协议 -->
          <el-checkbox v-model="loginForm.isChecked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        // 手机号
        phone: "",
        //密码
        password: "",
        // 验证码
        loginCode: "",
        //  是否勾选
        isChecked: false,
        type: [],
      }
    };
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 弹性布局 */
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 左右均分 */
  justify-content: space-around;
  .left-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    .title-box {
      display: flex;
      align-items: center;
      margin-top: 44px;
      margin-left: 48px;
      .title {
        font-size: 24px;
        margin-left: 16px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      .sub-title {
        font-size: 21px;
        margin-left: 12px;
      }
    }
    .from {
      margin-top: 30px;
      margin-right: 41px;
      .my-btn {
        width: 100%;
      }
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label{
          display: flex;
        }
      }
      .code{
        width: 100%;
        height:40px;
      }
    }
  }
}
</style>