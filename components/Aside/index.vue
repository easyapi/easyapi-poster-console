<template>
  <div class='sidebar'>
    <div v-for='(menu, index) in menuList' :key='index'>
      <p v-if='menuType == 1 || menuType == 2' class='title'>
        {{ menu.title }}
      </p>
      <div v-for='(item, index) in menu.children' :key='index'>
        <div class='menu' v-if='menuType == 0 || menuType == 1'>
          <nuxt-link
            :key='index'
            :to='item.path'
            :class="activePath === item.path ? 'menu-item_active' : 'menu-item'"
          >
            <i :class='item.icon'></i>
            <span>{{ item.title }}</span>
          </nuxt-link>
        </div>

        <div v-if='menuType == 2'>
          <el-menu
            default-active='2'
            class='el-menu-vertical-demo'
            @select='handleSelectMenu'
          >
            <el-menu-item :index='item.path' v-if='item.children.length == 0'>
              <i :class='item.icon'></i>
              <span>{{ item.title }}</span>
            </el-menu-item>
            <el-submenu v-if='item.children.length > 0'>
              <template slot='title'>
                <i :class='item.icon'></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index='a.path'
                  v-for='(a, idx) in item.children'
                  :key='idx'
                >{{ a.title }}
                </el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routers from '../../router/index'

export default {
  name: 'Aside',
  data() {
    return {
      activePath: '',
      menuType: null,
      menuList: routers
    }
  },
  methods: {
    handleSelectMenu(key, keyPath) {
      let path = keyPath[0]
      this.$router.push({ path: path })
    }
  },
  mounted() {
    this.activePath = this.$route.path ? `${this.$route.path}` : '/summary'
    this.menuType = this.theme.menuType
  }
}
</script>

<style scoped lang='scss'>
.sidebar {
  position: absolute;
  top: $-sidebar-top + px;
  left: $-sidebar-left + px;
  bottom: $-sidebar-bottom + px;
  padding-top: 20px;
  width: 200px;
  background: $-sidebar-bgColor;
  border-radius: $-sidebar-radius + px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.title {
  color: $-menu-first-color;
  align-items: center;
  display: flex;
  height: 42px;
  line-height: 22px;
  padding-left: 20px;
  font-size: 14px;
}

.menu :hover {
  i {
    color: $-menu-hover-color;
  }

  span {
    color: $-menu-hover-color;
  }

  background: $-menu-hover-bgColor;
}

.menu-item {
  padding: 0 20px;
  width: 200px;
  height: 56px;
  display: flex;
  align-items: center;
  background: $-menu-bgColor;

  i {
    font-size: 18px;
    margin-right: 10px;
    color: $-menu-color;
  }

  span {
    font-size: 14px;
    color: $-menu-color;
  }
}

.menu-item_active {
  padding: 0 20px;
  width: 200px;
  height: 56px;
  display: flex;
  align-items: center;
  background: $-menu-active-bgColor;

  i {
    font-size: 18px;
    margin-right: 10px;
    color: $-menu-active-color;
  }

  span {
    font-size: 14px;
    color: $-menu-active-color;
  }
}

.icon {
  float: left;
}
</style>
