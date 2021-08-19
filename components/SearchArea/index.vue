<template>
  <div :class="allShow ? 'search-area all-show' : 'search-area'">
    <el-row>
      <Item
        v-for="(item, index) in items"
        :key="index + (item.label || 'a')"
        :item="item"
        v-show="item.show"
        :allShow="allShow"
        :ifShow="ifShow"
        @event="event"
        @open="open"
        @search="search"
        @reset="reset"
        :ref="item.key"
      />
    </el-row>
  </div>
</template>
<script>
  import Item from './item'

  export default {
    props: {
      items: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        innerWidth: null,
        allShow: false,
        ifShow: false,
        buttons: {
          type: 'buttons'
        }
      }
    },
    components: { Item },
    created() {
    },
    mounted() {
      window.onresize = this.windowResize
      let innerWidth = window.innerWidth
      this.innerWidth = innerWidth
      this.setItems()
    },
    methods: {
      windowResize(e) {
        this.innerWidth = e.target.innerWidth
        this.setItems()
      },
      search() {
        let obj = {}
        this.items.map((item) => {
          if (item.value) {
            obj[item.key] = item.value
          }
        })
        this.$emit('search', obj)
      },
      reset() {
        let items = this.items
        let doms = []
        items.map((item) => {
          if (item.key) {
            let dom = this.$refs[item.key]
            doms.push(dom)
          }
        })
        doms.map((item) => {
          let dom = item[0].$children[0].$children[0]
          if (dom.handleClear) {
            dom.handleClear()
          } else if (dom.reset) {
            dom.reset()
          }
        })
        items.forEach((item) => {
          item.value = null
        })
        this.items = items
      },
      open() {
        this.allShow = !this.allShow
        this.setItems()
      },
      event(item) {
        let obj = {}
        this.items.map((item) => {
          if (item.value) {
            obj[item.key] = item.value
          }
        })
        this.$emit('event', obj)
      },
      setItems() {
        let { items, innerWidth, buttons } = this
        let index = items.findIndex((item) => {
          return item.type === 'buttons'
        })
        if (index !== -1) {
          items.splice(index, 1)
        }
        let width = 0
        if (innerWidth >= 1600) {
          items.splice(3, 0, { type: 'buttons' })
          width = 6
        } else if (innerWidth >= 992) {
          items.splice(2, 0, { type: 'buttons' })
          width = 8
        } else {
          items.splice(1, 0, { type: 'buttons' })
          width = 12
        }

        items.forEach((item, index) => {
          if (item.size === 'large') {
            let befores = items.slice(0, index)
            let beforeWidth = befores.reduce((a, b) => {
              return a + (b.width || width)
            }, 0)
            let used = beforeWidth % 24
            if (24 - used < 12) {
              item.width = 24
            } else {
              item.width = 24 - used
            }
          }
          if (this.allShow) {
            item.show = true
          } else {
            if (width === 6) {
              item.show = index <= 3
            } else if (width === 8) {
              item.show = index <= 2
            } else {
              item.show = index <= 1
            }
          }
        })
        this.items = items
        if (!this.allShow) {
          if (this.items.findIndex((target) => target.show === false) == -1) {
            this.ifShow = false
          } else {
            this.ifShow = true
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .search-area {
    background-color: #fff;
    background-clip: border-box;
    box-sizing: border-box;
    padding: 10px 20px;
    animation: all 1s linear;

    .search-col {
      margin: 10px 0;
    }

    &.all-show {
      height: auto;
    }

    .form-label {
      line-height: 30px;
      text-align: right;
      padding-right: 8px;
    }
  }
</style>
