<template>
  <div v-if='showHeader' class='header'>
    <div class='header-title'>
      <div class='logo'>
        <img src='https://qiniu.easyapi.com/icon.png'>
        <p>{{ title }}</p>
      </div>
      <div>
        <el-dropdown trigger='click' @command='handleCommand'>
          <span class='el-dropdown-link'>
            <el-avatar
              src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            ></el-avatar>
          </span>
          <el-dropdown-menu slot='dropdown'>
            <el-dropdown-item command='changePassword' icon='el-icon-edit'>修改密码</el-dropdown-item>
            <el-dropdown-item command='changeShop' icon='el-icon-sort'
            >切换企业
            </el-dropdown-item
            >
            <el-dropdown-item command='quitLogin' icon='el-icon-switch-button'
            >退出
            </el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <Password ref='password'></Password>
  </div>
</template>

<script>
import Password from '../Password/index'
import Cookies from 'js-cookie'

export default {
  name: 'Header',
  components: {
    Password
  },
  data() {
    return {
      title: '',
      showHeader: true,
      isActive: true
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'changePassword') {
        this.$refs.password.modal = true
      } else if (command === 'changeShop') {
        this.$router.push(`/change-shop`)
      } else if (command === 'quitLogin') {
        Cookies.remove('fpAuthToken', 'userInfo')
        this.$router.push(`/login`)
      }
    }
  },
  mounted() {
    this.showHeader = this.theme.showHeader
    this.title = this.theme.title
  }
}
</script>

<style lang='scss' scoped>
.header {
  width: 100%;
  background: $-header-bgColor;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
}

.header-title {
  width: 100%;
  height: 100%;
  padding: 0 30px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
  }

  p {
    margin: 0 0 0 10px;
    color: $-header-color;
  }
}

.el-submenu__title i {
  color: #000;
}
</style>
