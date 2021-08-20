<template>
  <div class='container'>
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class='main'>
        <div class='main-title'>
          <div class='main-title_top'>
            <b>海报记录</b>
          </div>
        </div>
        <div class='main-content mg-tp-20'>
          <SearchArea :items='searchItems' @search='search' @event='event' @reset='reset'/>
        </div>
        <div class='main-content mg-tp-20'>
          <el-table v-loading='loading' :data='tableData'
                    :header-cell-style="{ background: '#F4F4F4' }">
            <template slot="empty">
              <p>{{emptyText}}</p>
            </template>
            <el-table-column prop="number" label="序号"></el-table-column>

            <el-table-column prop="date" label="生成时间"></el-table-column>

            <el-table-column label="海报">
              <template slot-scope="scope">
                <el-image :src="scope.row.url" style="width:70px;height:40px"></el-image>
              </template>
            </el-table-column>

            <el-table-column prop="size" label="海报尺寸"></el-table-column>

            <el-table-column prop="posterTemplate" label="海报模板"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deletePoster(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination @fatherSize='fatherSize' @fatherCurrent='fatherCurrent' :size='page.pageSize'
                      :total-elements='page.total' class='paging'></pagination>
          <div style='clear: both'></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index'

  export default Index
</script>
