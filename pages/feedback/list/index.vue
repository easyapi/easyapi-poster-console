<template>
  <div class='container'>
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class='main'>
        <div class='main-title'>
          <div class='main-title_top'>
            <b>反馈列表</b>
          </div>
        </div>
        <div class='main-content mg-tp-20'>
          <el-table v-loading='loading' :data='tableData'
                    :header-cell-style="{ background: '#F4F4F4' }">
            <template slot="empty">
              <p>{{emptyText}}</p>
            </template>
            <el-table-column
              label="编号"
              type="index"
              align="center">
            </el-table-column>
            <el-table-column
              prop='addTime'
              label='反馈时间'>
            </el-table-column>
            <el-table-column
              prop='linkman'
              label='姓名'>
            </el-table-column>
            <el-table-column
              prop='contact'
              label='联系方式'>
            </el-table-column>
            <el-table-column
              prop='content'
              label='反馈内容'>
            </el-table-column>
            <el-table-column
              label="状态"
              align="center">
              <template slot-scope='scope'>
                <div v-if="scope.row.ifReply">已回复</div>
                <div class="cl-red">未回复</div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope='scope'>
                <el-button size="mini" @click="jumpPage('/feedback/detail',scope.row.feedbackId)" type="primary">详情
                </el-button>
                <el-button size="mini" @click="delFeedback(scope.row.feedbackId)" type="danger">删除</el-button>
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
