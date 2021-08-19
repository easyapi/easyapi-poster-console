<template>
  <div></div>
</template>

<script>
  export default {
    name: 'index',
    middleware({ store, route, redirect, params, query, req, res }) {
      // 默认跳转页面的路由
      redirect('/feedback/list')
    }
  }
</script>

<style></style>
