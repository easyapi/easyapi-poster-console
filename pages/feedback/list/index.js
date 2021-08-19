import './index.scss'
import Header from '../../../components/Header'
import Aside from '../../../components/Aside'
import pagination from '../../../components/Pagination'
import SearchArea from '../../../components/SearchArea'
import { getFeedbackList, deleteFeedback } from '../../../api/feedback'

export default {
  name: 'index',
  components: {
    Header,
    Aside,
    SearchArea,
    pagination
  },
  data() {
    return {
      showHeader: '',
      searchItems: [
        { label: '时间查询', type: 'datePicker', pickerType: 'daterange', key: 'printTime' },
        { label: '联系人', type: 'input', key: 'name' }
      ],
      name: '',
      startAddTime: '',
      endAddTime: '',
      loading: true,
      emptyText: '',
      tableData: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      accessToken: '',
      selectTime: [],
      startTimeOption: {},
      endTimeOption: {}
    }
  },
  methods: {
    /**
     * 获取反馈列表
     */
    getFeedbackList() {
      let current = this.page.current - 1
      let params = {
        sort: 'addTime,desc',
        size: this.page.pageSize,
        page: current
      }
      this.emptyText = ''
      getFeedbackList(params, this).then(res => {
        if (res.data.code === 0) {
          this.tableData = []
          this.emptyText = '暂无数据'
          this.page.total = 0
        } else {
          this.loading = false
          this.tableData = res.data.content
          this.page.total = Number(res.data.totalElements)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 删除
     */
    delFeedback(id) {
      this.$confirm('您确定要删除该反馈内容吗？')
        .then(() => {
          deleteFeedback(id, this).then(res => {
            console.log(res)
            this.$message.success(res.data.message)
            if (res.data.code === 1) {
              this.getFeedbackList()
            }
          }).catch(error => {
            console.log(error.response)
          })
        })
        .catch(_ => {
        })
    },
    jumpPage(url, v) {
      this.$router.push({
        path: url, query: { id: v }
      })
    },
    fatherSize(size) {
      this.page.pageSize = size
      this.getFeedbackList()
    },
    fatherCurrent(page) {
      this.page.current = page
      this.getFeedbackList()
    },
    search(item) {
      let { name, printTime = [] } = item
      this.name = name
      if (printTime.length !== 0 && printTime[0] !== '') {
        this.startAddTime = printTime[0] + ' ' + '00:00:00'
        this.endAddTime = printTime[1] + ' ' + '23:59:59'
      } else {
        this.startAddTime = ''
        this.endAddTime = ''
      }
      this.getFeedbackList()
    },
    event(item) {
      let { name, printTime = [] } = item
      this.name = name
      if (printTime.length !== 0 && printTime[0] !== '') {
        this.startAddTime = printTime[0] + ' ' + '00:00:00'
        this.endAddTime = printTime[1] + ' ' + '23:59:59'
      }
    }
  },
  mounted() {
    this.showHeader = this.theme.showHeader
    document.title = '意见反馈'
    this.getFeedbackList()
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
