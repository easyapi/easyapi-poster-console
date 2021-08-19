import './index.scss'
import Header from '../../../components/Header'
import Aside from '../../../components/Aside'
import {
  getFeedbackConfigs,
  creatFeedbackConfig,
  updateFeedbackConfig,
  getFeedbackConfigDetail
} from '../../../api/feedback'

export default {
  name: 'index',
  components: {
    Header,
    Aside
  },
  data() {
    return {
      showHeader: '',
      type: 1,
      title: '新增意见配置',
      feedbackConfigId: '',

      emails: '',
      mobiles: '',
      theme: '#409EFF'
    }
  },
  mounted() {
    this.showHeader = this.theme.showHeader
    document.title = '意见反馈'
    this.getFeedbackConfigs()
  },
  methods: {
    getFeedbackConfigs() {
      this.loading = true
      let params = {}
      getFeedbackConfigs(params, this).then(res => {
        if (res.data.code === 0) {

        } else {
          let data = res.data.content[0]
          this.feedbackConfigId = data.feedbackConfigId
          this.emails = data.emails
          this.mobiles = data.mobiles
          this.theme = data.theme
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
      })
    },

    submit() {
      let obj = {}
      obj.theme = this.theme
      if (this.emails) {
        if (this.emails.indexOf('，') !== -1) {
          return this.$message.warning('邮箱请使用英文逗号')
        } else {
          obj.emails = this.emails
        }
      } else {
        return this.$message.warning('请输入邮箱')
      }
      if (this.mobiles) {
        if (this.mobiles.indexOf('，') !== -1) {
          return this.$message.warning('邮箱请使用英文逗号')
        } else {
          obj.mobiles = this.mobiles
        }
      } else {
        return this.$message.warning('请输入手机号码')
      }

      // if (this.type === 1) {
      //   let data = {
      //     data: obj
      //   }
      //   creatFeedbackConfig(data, this).then(res => {
      //     this.$message.success(res.data.message)
      //     if (res.data.code === '1') {
      //       this.$router.go(-1)
      //     }
      //   }).catch(error => {
      //     console.log(error.response)
      //     this.$message.warning(error.response.data.message)
      //   })
      // } else {
      //   let data = {
      //     data: obj
      //   }
      //   updateFeedbackConfig(this.feedbackConfigId, data, this).then(res => {
      //     this.$message.success(res.data.message)
      //     if (res.data.code === '1') {
      //       this.$router.go(-1)
      //     }
      //   }).catch(error => {
      //     console.log(error.response)
      //     this.$message.warning(error.response.data.message)
      //   })
      // }
      let data = {
        data: obj
      }
      updateFeedbackConfig(this.feedbackConfigId, data, this).then(res => {
        this.$message.success(res.data.message)
        if (res.data.code === '1') {
          this.getFeedbackConfigs()
        }
      }).catch(error => {
        console.log(error.response)
        this.$message.warning(error.response.data.message)
      })


    },
    getFeedbackConfigDetail() {
      let params = {}
      getFeedbackConfigDetail(this.feedbackConfigId, params, this).then(res => {
        if (res.data.code === '1') {
          let data = res.data.content
          this.theme = data.theme
          this.emails = data.emails
          this.mobiles = data.mobiles
        }
      }).catch(error => {
        console.log(error.response)
      })
    }
  },
  head() {
    return {
      title: '意见反馈',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '服务市场场景化服务'
        },
        { hid: 'keyword', name: 'keyword', content: '服务市场场景化服务' }
      ]
    }
  }
}
