<template>
  <div class='container'>
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class='main'>
        <div class='main-title'>
          <div class='main-title_top'>
            <b>海报模板 > 编辑模板</b>
          </div>
        </div>
        <el-button type='primary' @click='onSubmit()'>更新</el-button>
        <div class='main-content mg-tp-20'>
          <div class='content'>
            <div class='left'>
              <div class='photo_word'>
                <div class='name'>{{ posterTemplate.title }}</div>
                <div class='label'>{{ posterTemplate.tags }}</div>
              </div>
              <!-- 海报图片 -->
              <div class='img'>
                <img
                  :src='posterTemplate.img'
                  :style="{width:listWidth+'px',height:listHeight+'px'}"
                />
                <div class='list' id='list'>
                  <VueDragResize
                    v-for='(rect, index) in rects'
                    :key='index'
                    :w='rect.width'
                    :h='rect.height'
                    :x='rect.left'
                    :y='rect.top'
                    :parentW='listWidth'
                    :parentH='listHeight'
                    :axis='rect.axis'
                    :isActive='rect.active'
                    :minw='rect.minw'
                    :minh='rect.minh'
                    :isDraggable='rect.draggable'
                    :isResizable='rect.resizable'
                    :parentLimitation='rect.parentLim'
                    :snapToGrid='rect.snapToGrid'
                    :aspectRatio='rect.aspectRatio'
                    :z='rect.zIndex'
                    :contentClass='rect.class'
                    v-on:activated='activateEv(index)'
                    v-on:deactivated='deactivateEv(index)'
                    v-on:dragging='changePosition($event, index)'
                    v-on:resizing='changeSize($event, index)'
                  >
                    <div
                      class='filler'
                      :style="{fontFamily:rect.font,fontSize:rect.size,fontWeight:rect.bold,fontStyle:rect.italic,color:rect.color,borderRadius:rect.radius+'px'}"
                    >{{ rect.word }}
                    </div>
                  </VueDragResize>
                </div>
              </div>

              <div class='foot_btn'>
                <!-- <el-button type="primary" plain>更换背景图</el-button> -->
                <div>
                  <el-upload
                    class='upload-demo'
                    action='https://upload.qiniup.com/'
                    :on-success='handleAvatarSuccess'
                    :before-upload='beforeAvatarUpload'
                    :data='{key:qnKey,token:qnToken}'
                  >
                    <el-button type='primary' plain>点击上传</el-button>
                  </el-upload>
                </div>

                <div>
                  <el-button type='primary' plain @click='addPhoto()'>插入图片</el-button>
                </div>

                <div>
                  <el-button type='primary' plain @click='addWord()'>插入文字</el-button>
                </div>
              </div>
            </div>
            <div class='right'>
              <toolbar></toolbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Index from './_id'

export default Index
</script>
