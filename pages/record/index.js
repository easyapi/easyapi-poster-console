import './index.scss'
import Header from '../../components/Header'
import Aside from '../../components/Aside'
import pagination from '../../components/Pagination'
import SearchArea from '../../components/SearchArea'
import { getPosterList, deletePoster } from '../../api/poster'

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
      emptyText: '',
      posterTemplate: '',
      tableData: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      searchItems: [
        { label: '海报模板', type: 'select', key: 'posterTemplate' }
      ]
    }
  },
  mounted() {
    this.showHeader = this.theme.showHeader
    document.title = '二维码海报'
    this.getPosterList()
  },
  methods: {
    /**
     * 获取海报列表
     */
    getPosterList() {
      let current = this.page.current - 1
      let params = {
        size: this.page.pageSize,
        page: current
      }
      this.emptyText = ''
      getPosterList(params, this).then(res => {
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
    deletePoster(id) {
      this.$confirm('您确定要删除该反馈内容吗？').then(() => {
        deletePoster(id, this).then(res => {
          this.$message.success(res.data.message)
          if (res.data.code === 1) {
            this.getPosterList()
          }
        }).catch(error => {
          console.log(error.response)
        })
      }).catch(_ => {
      })
    },
    fatherSize(size) {
      this.page.pageSize = size
      this.getPosterList()
    },
    fatherCurrent(page) {
      this.page.current = page
      this.getPosterList()
    },
    search(item) {
      let { posterTemplate } = item
      this.naposterTemplateme = posterTemplate
      this.getPosterList()
    },
    event(item) {
      let { posterTemplate } = item
      this.posterTemplate = posterTemplate
    }
  },
  head() {
    return {
      title: '二维码海报',
      meta: [
        { hid: 'description', name: 'description', content: '服务市场场景化服务' },
        { hid: 'keyword', name: 'keyword', content: '服务市场场景化服务' }
      ]
    }
  }
}
