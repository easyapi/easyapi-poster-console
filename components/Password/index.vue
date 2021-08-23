<template>
  <el-dialog
    class='password'
    :visible.sync='modal'
    title='修改密码'
    width='300'>
    <el-form ref='passwordForm' :model='passwordForm' :rules='passwordRule'>
      <el-form-item label='原密码' prop='oldPassword'>
        <el-input type='password' v-model='passwordForm.oldPassword' placeholder='请输入原密码' />
      </el-form-item>
      <el-form-item label='新密码' prop='password'>
        <el-input type='password' v-model='passwordForm.password' placeholder='请输入新密码' />
      </el-form-item>
      <el-form-item label='确认密码' prop='passwordAgain'>
        <el-input type='password' v-model='passwordForm.passwordAgain' placeholder='请再次输入密码' />
      </el-form-item>
    </el-form>
    <div slot='footer'>
      <el-button type='text' @click='onCancel'>取消</el-button>
      <el-button type='primary' @click="onOk('passwordForm')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changePassword } from '../../api/account'

export default {
  name: 'Password',
  data() {
    return {
      modal: false,
      passwordForm: {
        oldPassword: '',
        password: '',
        passwordAgain: ''
      },
      passwordRule: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不得小于六位！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不得小于六位！', trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不得小于六位！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onCancel() {
      this.modal = false
    },
    onOk(passwordForm) {
      this.$refs[passwordForm].validate(valid => {
        if (valid) {
          let data = {
            ...this.passwordForm
          }
          changePassword(data).then(res => {
            if (res.data.code === 1) {
              this.$message.success(res.data.message)
              setTimeout(() => {
                this.$router.push('/login')
              }, 1000)
            }
          }).catch(error => {
            this.$message.danger(error.response.data.message)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
