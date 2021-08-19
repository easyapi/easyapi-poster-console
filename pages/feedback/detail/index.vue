<template>
  <div class='container'>
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class='main'>
        <div class='main-title'>
          <div class='main-title_top'>
            <b>反馈列表 > 意见反馈详情</b>
          </div>
        </div>
        <div class='main-content mg-tp-20'>
          <el-form label-width="100px">
            <el-form-item label="姓名">
              <span>{{feedbackDetail.linkman}}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{feedbackDetail.contact}}</span>
            </el-form-item>
            <el-form-item label="反馈时间">
              <span>{{feedbackDetail.addTime}}</span>
            </el-form-item>
            <el-form-item label="反馈信息">
              <div class="feedback-content">
                <p>{{feedbackDetail.content}}

                </p>
              </div>
              <div class="feedback-imgs" v-if="incisionImgs(feedbackDetail.imgs).length>0">
                <img v-for="(item,index) in incisionImgs(feedbackDetail.imgs)" :key="index" :src="item" alt="暂无图片">
              </div>

            </el-form-item>
            <el-form-item label="反馈回复">
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入回复内容"
                style="width: 600px"
                v-model="reply">
              </el-input>
              <!--<div>-->
              <!--<el-popover-->
              <!--placement="top-start"-->
              <!--width="400"-->
              <!--trigger="click" popper-class="feedback-popover">-->
              <!--<div class="list">-->
              <!--<div class="list-item">-->
              <!--回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1回复1-->
              <!--</div>-->
              <!--<div class="list-item">-->
              <!--回复1回复1回复1回复1回复1回复1回复1回复1回复1-->
              <!--</div>-->
              <!--<div class="list-item">-->
              <!--回复1回复1回复1回复1回复1回复1回复1回复1回复1-->
              <!--</div>-->
              <!--</div>-->
              <!--<el-button size="small" plain slot="reference">常用语</el-button>-->
              <!--</el-popover>-->
              <!--</div>-->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">回复</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index'

  export default Index
</script>
