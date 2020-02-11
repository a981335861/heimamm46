<template>
  <el-dialog
    class="register-dialog"
    center
    width="603px"
    title="用户注册"
    :visible.sync="dialogFormVisible"
  >
    <el-form status-icon :model="form" :rules="rules" ref="registerForm">
      <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
        <el-upload
          name="image"
          class="avatar-uploader"
          :action="uploadsUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- imageUrl有值，显示图片 -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <!-- imageUrl没有值 显示的是i标签 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="register-box" :offset="1">
            <img @click="changeCode" :src="codeURL" alt class="register-code" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 点击获取  短信验证码 -->
            <el-button
              :disabled="delay != 0"
              @click="getSMS"
            >{{ delay == 0 ? "点击获取验证码" :`还有${delay}秒继续获取` }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm('registerForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
// 导入接口
import { sendsms, register } from "@/api/register.js";
// 定义校验规则函数 - 手机&邮箱
import { checkPhone,checkEmail } from '@/utils/validator.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        // 昵称
        username: "",
        // 密码
        password: "",
        // 邮箱
        email: "",
        // 手机
        phone: "",
        // 图片图形码
        code: "",
        // 用户的头像地址
        avatar: "",
        // 短信验证码
        rcode: ""
      },
      rules: {
        username: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码的长度为6-12位", trigger: "change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码的长度为6-12位",
            trigger: "change"
          }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "change" }
        ],
        avatar: [
          { required: true, message: "用户头像不能为空", trigger: "change" }
        ]
      },
      // 左侧文本的间隙
      formLabelWidth: "62px",
      codeURL: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 倒计时时间
      delay: 0,
      // 本地图片预览地址
      imageUrl: "",
      // 头像上传的接口地址
      uploadsUrl: process.env.VUE_APP_URL + "/uploads",
    };
  },
  // 方法
  methods: {
    resetForm() {
      // this.$refs[formName].resetFields();
      // this.imageUrl="";
      this.dialogFormVisible = false;
    },
    changeCode() {
      this.codeURL =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取短信验证码
    getSMS() {
      // 手机号校验
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.form.phone != true)) {
        this.$message.error("手机号格式不正确,请重新输入");
        return;
      }
      // 图片验证码校验
      if (this.form.code.length != 4) {
        return this.$message.error("图片验证码的长度不对,请重新输入");
      }
      // 如果为0开启计时器
      if (this.delay == 0) {
        this.delay = 60;
        const interID = setInterval(() => {
          // 时间的递减
          this.delay--;
          if (this.delay == 0) {
            clearInterval(interID);
          }
        }, 1000);
        sendsms({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          //成功回调
          if (res.data.code === 200) {
            this.$message.success("验证码获取成功:" + res.data.data.captcha);
          } else if (res.data.code === 0) {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像只能是图片样式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 保存 服务器返回的头像地址
      this.form.avatar = res.data.file_path;
      // 表单中  头像字段的校验
      this.$refs.registerForm.validateField("avatar");
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register({
            username: this.form.username,
            password: this.form.password,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            rcode: this.form.rcode
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success("恭喜你,注册成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 请空数据
              this.$refs[formName].resetFields();
              // 人为的清空图片
              this.imageUrl = ""
            } else if (res.data.code === 201) {
              // 服务器返回的提示信息 弹出来
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.register-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #0dbfef, #1792f8);
  }
  .el-dialog__title {
    color: #fff;
  }
  .register-box {
    height: 40px;
  }
  .register-code {
    height: 40px;
    width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader {
    text-align: center;
  }
}
</style>