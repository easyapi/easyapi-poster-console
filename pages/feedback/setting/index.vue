<template>
  <div class='container'>
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class='main'>
        <div class='main-title'>
          <div class='main-title_top'>
            <b>反馈设置</b>
          </div>
        </div>
        <div class='main-content mg-tp-20'>
          <el-form label-width="100px">
            <el-form-item label="邮箱">
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入反馈邮箱，多个邮箱使用英文','隔开。例如：15181****12@qq.com,15181****12@qq.com"
                style="width: 600px"
                v-model="emails">
              </el-input>
              <div class="hint">
                多个邮箱使用英文","隔开。例如：15181****12@qq.com,15181****12@qq.com
              </div>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入手机号码，多个手机号码使用英文','隔开。例如：15181****12,15181****12"
                style="width: 600px"
                v-model="mobiles">
              </el-input>
              <div class="hint">
                多个手机号码使用英文","隔开。例如：15181****12,15181****12
              </div>
            </el-form-item>
            <el-form-item label="主题颜色">
              <el-color-picker v-model="theme"></el-color-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submit">提交</el-button>
              <div class="hint">
                当有新的反馈，会立刻通知以上设置的邮箱。
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './setting'

  export default Index
</script>
