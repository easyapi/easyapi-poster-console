<template>
  <el-col
    :xl="6"
    :lg="item.size !== 'large' ? 8 : 16"
    :md="item.size !== 'large' ? 8 : 16"
    :sm="item.size !== 'large' ? 12 : 24"
    :xs="12"
    v-if="item.type !== 'buttons'"
    class="search-item"
  >
    <el-form>
      <el-form-item :label="item.label" label-width="100px" size="mini">
        <el-input
          style="width:250px"
          v-if="item.type == 'input'"
          v-model="item.value"
          :placeholder="item.placeholder || '请填写' + item.label"
          @on-enter="search"
          clearable
        />
        <el-select
          style="width:250px"
          v-if="item.type == 'select'"
          v-model="item.value"
          :placeholder="item.placeholder || '请选择' + item.label"
          clearable
        >
          <el-option
            v-for="(sitem, sindex) in selectItems"
            :key="sindex + sitem.value"
            :value="sitem.value"
          >
            {{ sitem.label }}
          </el-option>
        </el-select>
        <el-date-picker
          style="width:250px"
          v-if="item.type === 'datePicker'"
          v-model="item.value"
          :type="item.pickerType"
          :placeholder="item.placeholder || '请选择' + item.label"
          @on-change="timeFormat"
          :editable="false"
          value-format="yyyy-MM-dd"
          clearable
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col
    v-else
    :xl="6"
    :lg="8"
    :md="8"
    :sm="12"
    :xs="12"
    class="buttons"
  >
    <el-button @click="search" type="primary" size="small" class="ea-info-btn"
    >查询
    </el-button
    >
    <el-button @click="reset" type="warning" size="small">重置</el-button>
    <el-button @click="open" size="small" v-if="ifShow"
    >{{ allShow ? '收起' : '展开' }}
      <i class="el-icon-arrow-down" v-if="!allShow"/>
      <i class="el-icon-arrow-up" v-else/>
    </el-button>
  </el-col>
</template>
<script>
  export default {
    data() {
      return {
        selectItems: []
      }
    },
    watch: {
      item: {
        handler(nv) {
          if (nv.selectItems) {
            this.selectItems = nv.selectItems
          }
          this.$emit('event')
        },
        deep: true
      }
    },
    props: ['item', 'allShow', 'ifShow'],
    created() {
      if (this.item.items) {
        this.items = this.item.items
      }
    },
    methods: {
      timeFormat(item) {
        this.item.value = item
        this.$emit('event')
      },
      open() {
        this.$emit('open')
      },
      reset() {
        this.$emit('reset')
      },
      search() {
        this.$emit('search')
      }
    }
  }
</script>
<style lang="scss">
  .ivu-input {
    height: 30px;
    flex: 1;
  }

  .ivu-select {
    height: 30px;
    flex: 1;
  }

  .ivu-select-selection {
    height: 30px;
  }

  .ivu-btn {
    height: 30px;
  }

  .ivu-date-picker {
    flex: 1;
  }

  .item-label {
    line-height: 30px;
    padding-right: 20px;
    text-align: right;
    min-width: 116px;
  }

  .search-item .buttons {
    display: flex;
    margin: 10px 0;
  }

  .buttons button {
    margin-left: 10px;
  }
</style>
