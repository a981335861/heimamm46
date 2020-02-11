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
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="43px" class="from">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="loginCode">
          <el-col :span="17">
            <el-input v-model="loginForm.loginCode" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="7" class="code-col">
            <img :src="codeURL" @click="changeCode" alt class="code" />
          </el-col>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="loginForm.isChecked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" @click="submitForm('loginForm')" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="showRegister" class="my-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
    <registerDialog ref="registerDialog"></registerDialog>
  </div>
</template>

<script>

import registerDialog from "./components/registerDialog.vue";
// 定义校验规则函数 - 手机&邮箱
import { checkPhone } from '@/utils/validator.js'
// 导入登录接口
import {login} from '@/api/login.js'
// 导入token的工具函数
import {setToken} from '@/utils/token.js'
export default {
  // 组件的名字
  name: "login",
  // 注册组件
  components: {
    registerDialog
  },
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
        type: []
      },
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码的长度为6-12位", trigger: "blur" }
        ],
        loginCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码的长度为4位", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "change" }
        ]
      },
      codeURL:process.env.VUE_APP_URL + "/captcha?type=login",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证正确
          // 验证是否勾选
          if (this.loginForm.isChecked != true) {
            return this.$message.warning('请勾选用户协议')
          }
          login({
            code: this.loginForm.loginCode,
            password: this.loginForm.password,
            phone: this.loginForm.phone,
          }).then(res => {
            if (res.data.code === 200) {
              // 正确
              this.$message.success("登录成功");
              // 服务器返回了token
              // token 保存到 localStorage
              setToken(res.data.data.token)
              // 跳转到首页
              this.$router.push('/index')
            } else if (res.data.code === 202) {
              // 服务器返回的提示信息 弹出来
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
    showRegister(){
      this.$refs.registerDialog.dialogFormVisible = true;
    },
    changeCode(){
      // 刷新验证码
      this.codeURL = process.env.VUE_APP_URL + "/captcha?type=login&t="+Date.now()
    }
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
        .el-checkbox__label {
          display: flex;
        }
      }
      .code {
        width: 100%;
        height: 40px;
      }
      .code-col {
        height: 40px;
      }
    }
  }
}
</style>