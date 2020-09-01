import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login', '/redirect']

router.beforeEach((to, from, next) => {
    NProgress.start()
    // console.log('Token:'+getToken());
    // if (getToken()) {
    //   if (to.path === '/login') {
    //     next({ path: '/' })
    //     NProgress.done()
    //   } else {
        
    //   }
    // } else {
      // 没有token
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        NProgress.done()
      }
    // }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})