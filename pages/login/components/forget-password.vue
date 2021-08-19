<template>
  <div>
    <el-form
      ref='forgetForm'
      :model='forgetForm'
      class='forgetForm-ForgetPassword'
      :rules='forgetRules'
    >
      <el-form-item prop='username'>
        <div class='form-item'>
          <i class='el-icon-phone-outline'></i>
          <el-input placeholder='手机号码' v-model='forgetForm.username'>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item prop='code'>
        <div class='form-item'>
          <i class='el-icon-message'></i>
          <el-input placeholder='验证码' v-model='forgetForm.code'></el-input>
          <el-button
            @click='getValidateCode'
            :disabled='disabled'
            size='samll'
            type='text'
            class='btn-code'
          >{{ validateCode }}
          </el-button
          >
        </div>
      </el-form-item>
      <el-form-item prop='password'>
        <div class='form-item'>
          <i class='el-icon-lock'></i>
          <el-input
            type='password'
            placeholder='密码'
            v-model='forgetForm.password'
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item prop='passwordAgain'>
        <div class='form-item'>
          <i class='el-icon-lock'></i>
          <el-input
            type='password'
            placeholder='确认密码'
            v-model='forgetForm.passwordAgain'
          ></el-input>
        </div>
      </el-form-item>
      <el-button :loading='loading' type='primary' class='btn' @click='sumbit'
      >下一步
      </el-button
      >
    </el-form>
  </div>
</template>
<script>
import { sendCaptcha } from '../../../api/captcha'
import { forgetPassword } from '../../../api/forget-password'

export default {
  name: '',
  components: {},
  head() {
    return {
      title: '忘记密码-EasyAPI发票管理控制台',
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: '忘记密码-EasyAPI发票管理控制台'
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content: '忘记密码-EasyAPI发票管理控制台'
        }
      ]
    }
  },
  props: {},
  data() {
    return {
      validateCode: '获取验证码',
      disabled: false,
      loading: false,
      forgetForm: {
        username: '',
        password: '',
        code: '',
        passwordAgain: ''
      },
      forgetRules: {
        username: [
          { required: true, message: '请输入您的手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请设置您的密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输正确的验证码', trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'blur' }
        ]
      }
    }
  },
  // 计算属性
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  // 方法
  methods: {
    //获取验证码
    getValidateCode() {
      if (this.forgetForm.username.length !== 11) {
        this.$message.warning('请填写正确的手机号')
      } else {
        let that = this
        that.disabled = true
        var num = 60
        var timer = setInterval(function() {
          num--
          that.validateCode = num + 's'
          if (num === 0) {
            that.disabled = false
            that.validateCode = '重新获取验证码'
            clearInterval(timer)
          }
        }, 1000)
        let params = {}
        params.mobile = that.forgetForm.username
        sendCaptcha(params, that).then(res => {
          this.$message.success(res.data.message)
        })
      }
    },
    sumbit() {
      this.$refs.forgetForm.validate((valid) => {
        if (valid) {
          if (this.forgetForm.password !== this.forgetForm.passwordAgain) {
            this.$message.warning('确认密码不一致')
            return
          }
          this.loading = true
          let data = {
            ...this.forgetForm
          }
          forgetPassword(data, this).then(res => {
            if (res.data.code === 1) {
              this.$message.success(res.data.message)
              this.$emit('fatherMethod')
            }
            this.loading = false
          }).catch((error) => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
<style lang='scss'>
.forgetForm-ForgetPassword .el-form-item__content {
  line-height: 0;
  padding: 0;
  margin: 0;
}

.forgetForm-ForgetPassword .el-input__inner {
  border-left: none;
  border-right: none;
  border-top: none;
  border-radius: 0;
  padding-left: 30px;
  border-color: #dcdfe6;
}

.forgetForm-ForgetPassword .el-input__inner:focus {
  border-color: #dcdfe6;
}
</style>
<style scoped lang='scss'>
.forgetForm-ForgetPassword {
  padding: 0 50px;
  margin-top: 20px;

  .btn {
    margin-top: 50px;
    width: 100%;
  }

  .form-item {
    position: relative;

    i {
      font-size: 18px;
      position: relative;
      bottom: -30px;
      z-index: 1000;
    }

    .btn-code {
      position: absolute;
      right: 0;
      bottom: -2px;
    }
  }
}
</style>
