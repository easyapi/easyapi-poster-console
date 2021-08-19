<template>
  <div class='main-container'>
    <div class='login-center'>
      <div class='login-img'></div>
      <div class='login-right'>
        <el-tabs v-model='activeName'>
          <el-tab-pane label='账户登录' name='first'>
            <el-form
              ref='loginForm'
              :model='loginForm'
              class='loginForm'
              :rules='loginRules'
            >
              <el-form-item prop='username'>
                <div class='form-item'>
                  <i class='el-icon-user'></i>
                  <el-input placeholder='账号' v-model='loginForm.username'>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item prop='password'>
                <div class='mg-t-20 form-item'>
                  <i class='el-icon-lock'></i>
                  <el-input
                    type='password'
                    placeholder='密码'
                    v-model='loginForm.password'
                  ></el-input>
                </div>
              </el-form-item>
              <el-button
                :loading='loading'
                type='primary'
                class='btn'
                @click='handleLogin'
              >登录
              </el-button
              >
            </el-form>
          </el-tab-pane>
          <el-tab-pane label='立即注册' name='second'>
            <Signup
              @fatherMethod='fatherMethod'
              v-if="activeName === 'second'"
            ></Signup>
          </el-tab-pane>
          <el-tab-pane label='忘记密码' name='third'>
            <ForgetPassword
              @fatherMethod='fatherMethod'
              v-if="activeName === 'third'"
            ></ForgetPassword>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Login from './login'

export default Login
</script>


<style>
.loginForm .el-form-item__content {
  line-height: 0;
}

.login-right .el-tabs__nav {
  width: 100%;
  line-height: 57px;
}

.login-right .el-tabs__item {
  width: 33%;
  text-align: center;
  font-size: 16px;
}

.loginForm .el-input__inner {
  border-left: none;
  border-right: none;
  border-top: none;
  border-radius: 0;
  padding-left: 30px;
  border-color: #dcdfe6;
}

.loginForm .el-input__inner:focus {
  border-color: #dcdfe6;
}
</style>
