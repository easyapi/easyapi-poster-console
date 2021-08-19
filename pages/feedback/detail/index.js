import './index.scss'
import Header from '../../../components/Header'
import Aside from '../../../components/Aside'
import { updateFeedback, getFeedbackDetail } from '../../../api/feedback'

export default {
  name: 'index',
  components: {
    Header,
    Aside
  },
  data() {
    return {
      reply: '',
      feedbackId: '',
      feedbackDetail: '',
      showHeader: ''
    }
  },
  mounted() {
    this.showHeader = this.theme.showHeader
    this.feedbackId = this.$route.query.id
    document.title = '意见反馈'
    this.getFeedbackDetail()
  },
  methods: {
    submit() {
      let data = {
        reply: this.reply
      }
      updateFeedback(this.feedbackId, data, this).then(res => {
        this.$message.success(res.data.message)
        if (res.data.code === '1') {
          this.$router.go(-1)
        }
      }).catch(error => {
        this.$message.warning(error.response.data.message)
      })
    },
    getFeedbackDetail() {
      let params = {}
      getFeedbackDetail(this.feedbackId, params, this).then(res => {
        if (res.data.code === 1) {
          this.feedbackDetail = res.data.content
        }
      }).catch(error => {
        this.$message.warning(error.response.data.message)
      })
    },
    incisionImgs(imgs) {
      if (imgs) {
        return imgs.split(',')
      } else {
        return []
      }
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
