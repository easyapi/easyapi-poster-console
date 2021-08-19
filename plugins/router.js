import Cookies from 'js-cookie'

export default function({ store, app }) {
  app.router.beforeEach((to, from, next) => {
    if (to.path.indexOf('login') === -1) {
      if (!Cookies.get('fpAuthToken')) {
        setTimeout(() => {
          return next('/login')
        }, 50)
      }
    }
    next()
  })
}
