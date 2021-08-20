import './_id.scss'
import Header from '../../../components/Header'
import Aside from '../../../components/Aside'
import pagination from '../../../components/Pagination'
import SearchArea from '../../../components/SearchArea'
import VueDragResize from '../components/vue-drag-resize/vue-drag-resize.vue'
import VueContextMenu from 'vue-contextmenu'
import toolbar from '../components/toolbar/toolbar'

export default {
  name: 'index',
  components: {
    Header,
    Aside,
    SearchArea,
    pagination,
    VueDragResize,
    VueContextMenu,
    toolbar
  },
  data() {
    return {
      posterTemplate: {},

      listWidth: 0,
      listHeight: 0,

      qnKey: '',
      qnToken: ''
    }
  }
}
