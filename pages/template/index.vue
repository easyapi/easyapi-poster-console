<template>
  <div class='container'>
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class='main'>
        <div class='main-title'>
          <div class='main-title_top'>
            <b>海报模板</b>
          </div>
        </div>
        <div class='main-content mg-tp-20'>
          <SearchArea :items='searchItems' @search='search' @event='event' />
        </div>
        <div class='main-content mg-tp-20'>
          <el-button type='primary' size='small' class='ea-info-btn addButton' @click='creat'>添加</el-button>

          <div class='posterList'>
            <div class='block' v-for='item in posterTemplateList' :key='item.posterTemplateId'>
              <div @click='gotoPosterDetails(item.posterTemplateId)'>
                <el-image :src='item.img' style='width:280px;height:350px'></el-image>
              </div>
              <span class='demonstrationup'>{{ item.title }}</span>
              <span class='demonstration'>{{ item.addTime }}</span>
              <div class='icon'>
                <el-button icon='el-icon-document-copy' circle @click='copyPoster()'></el-button>
                <el-button
                  icon='el-icon-edit-outline'
                  circle @click='gotoPosterDetails(item.posterTemplateId)'

                ></el-button>
                <el-button icon='el-icon-delete' circle
                           @click='deletePosterTemplate(item.posterTemplateId)'></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title='新建模板' :visible.sync='dialogFormVisible' :append-to-body='true'>
      <el-form ref='form' :model='form' label-width='120px'>
        <el-form-item label='模板名称'>
          <el-input v-model='form.title' style='width:235px'></el-input>
        </el-form-item>

        <el-form-item label='模板尺寸'>
          <el-input v-model='form.width' style='width:100px' placeholder='px'></el-input>
          <i class='el-icon-close'></i>
          <el-input v-model='form.length' style='width:100px' placeholder='px'></el-input>
        </el-form-item>

        <el-form-item label='模板标签'>
          <el-input v-model='form.tags' style='width:235px'></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type='primary' @click='onSubmit'>立即创建</el-button>
          <el-button @click='dialogFormVisible = false'>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Index from './index'

export default Index
</script>
