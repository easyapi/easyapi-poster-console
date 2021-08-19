<template>
  <div>
    <el-pagination
      background
      @size-change='handleSizeChange'
      @current-change='handleCurrentChange'
      :current-page='totalPages'
      :page-sizes='[10, 50, 100, 200]'
      :page-size='size'
      layout='total, sizes, prev, pager, next, jumper'
      :total='totalElements'
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ['totalPages', 'size', 'totalElements'],
  data() {
    return {}
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('fatherSize', val)
    },
    handleCurrentChange(val) {
      this.$emit('fatherCurrent', val)
    }
  }
}
</script>

<style scoped>

</style>
