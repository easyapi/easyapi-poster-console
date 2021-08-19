import './login.scss'
import Cookies from 'js-cookie'
import Signup from './components/signup.vue'
import ForgetPassword from './components/forget-password'
import { postLogin } from '../../api/login'
import { getUser } from '../../api/account'

export default {
  name: 'login',
  components: {
    Signup,
    ForgetPassword
  },
  head() {
    return {
      title: '账户登录-EasyAPI发票管理控制台',
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: '账户登录-EasyAPI发票管理控制台'
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content: '账户登录-EasyAPI发票管理控制台'
        }
      ]
    }
  },
  props: {},
  data() {
    return {
      activeName: 'first',
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '请输入正确的密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // 计算属性
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    if (this.$route.query.type) {
      this.activeName = 'second'
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let data = {
            ...this.loginForm,
            rememberMe: true
          }
          postLogin(data, this).then(res => {
            this.loading = false
            if (res.data.code === 1) {
              this.$message.success('登录成功')
              let token = res.data.id_token
              Cookies.set('fpAuthToken', token, { expires: 30 })
              this.$store.dispatch('getUserInfo', this)
              this.getUser()
            } else {
              this.$message.error(res.data.content)
            }
          }).catch((error) => {
            this.loading = false
            this.$message.error('登录失败,请检查您的账号或密码是否正确')
          })
        }
      })
    },
    getUser() {
      getUser(this).then(res => {
        if (res.data.code === 1) {
          let userInfoData = res.data.content
          // 如果是新用户就跳转服务认证
          if (userInfoData.completeness !== 100) {
            setTimeout(() => {
              this.$router.push('/authentication')
            }, 2000)
          } else {
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 2000)
          }
        }
      })
    },
    fatherMethod() {
      this.activeName = 'first'
    }
  }
}
