import './index.scss'
import Header from '../../../components/Header'
import Aside from '../../../components/Aside'
import pagination from '../../../components/Pagination'
import SearchArea from '../../../components/SearchArea'
import { createPosterTemplate, getPosterTemplateList, deletePosterTemplate } from '../../../api/poster'

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
      dialogFormVisible: false,
      emptyText: '',
      posterTemplateList: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      form: {
        title: '',
        width: '',
        length: '',
        tags: ''
      },
      searchItems: [
        { label: '海报模板', type: 'select', key: 'posterTemplate' }
      ]
    }
  },
  mounted() {
    this.showHeader = this.theme.showHeader
    document.title = '二维码海报'
    this.getPosterTemplateList()
  },
  methods: {
    //获取海报列表
    getPosterTemplateList() {
      let params = {}
      this.emptyText = ''
      getPosterTemplateList(params, this).then((res) => {
        if (res.data.code == 1) {
          this.posterTemplateList = res.data.content
        } else {
          this.posterTemplateList = []
          this.emptyText = '暂无数据'
        }
      })
    },
    creat() {
      this.dialogFormVisible = true
    },
    onSubmit() {
      let data = {
        ...this.form
      }
      createPosterTemplate(data, this).then((res) => {
        if (res.data.code == 1) {
          this.$message.success('新建成功')
          this.getPosterTemplateList()
        }
      })
      this.dialogFormVisible = false
    },
    gotoPosterDetails(posterTemplateId) {
      this.$router.push('/base/edit/')
      this.$router.push({
        path: '/base/edit',
        query: { id: posterTemplateId}
      })
    },
    copyPoster() {

    },
    deletePosterTemplate(posterTemplateId) {
      deletePosterTemplate(posterTemplateId, this).then((res) => {
        if (res.data.code == 1) {
          this.$message.success('删除成功')
          this.getPosterTemplateList()
        }
      })
    },
    search(item) {
      let { posterTemplate } = item
      this.posterTemplate = posterTemplate
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
