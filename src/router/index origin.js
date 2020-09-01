import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
import Login from '@/views/Login'
import Index from '@/views/Index'
import Path from '@/views/Path'
import AmendReport from '@/views/tudf/AmendReport'
import Enquiry from '@/views/tudf/Enquiry'
import DelRecord from '@/views/tudf/DelRecord'
import FileGen from '@/views/tudf/FileGen'
import FileDownload from '@/views/tudf/FileDownload'
import JobStatus from '@/views/tudf/JobStatus'
import RecordSelection from '@/views/tudf/RecordSelection'
import DaysRecord from '@/views/tudf/DaysRecord'
import Report from '@/views/tudf/Report'
import UpdateRecord from '@/views/tudf/UpdateRecord'

import ParamMgmt from '@/views/cris/PA/ParamMgmt'
import tuUserMgmt from '@/views/cris/PA/tuUserMgmt'
import ProdMgmt from '@/views/cris/PA/ProdMgmt'
import tuEnquiryList from '@/views/cris/BA/tuEnquiryList'

import tuEnquirySummary from '@/views/ccdrm/tuEnquirySummary'
import CreateEnquiryFile from '@/views/ccdrm/CreateEnquiryFile/Index'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import testdemo from '@/views/testdemo'


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Index,
      children:[
        {
          path: '/path',
          name: 'Path',
          component: Path
        },
        {
          path:'/amend-report',
          name:'AmendReport',
          component: AmendReport
        },
        {
          path:'/enquiry',
          name:'Enquiry',
          component: Enquiry
        },
        {
          path:'/delete-record',
          name:'DelRecord',
          component: DelRecord
        },
        {
          path:'/file-download',
          name:'FileDownload',
          component: FileDownload
        },
        {
          path:'/file-generation',
          name:'FileGen',
          component: FileGen
        },
        {
          path:'/job-status',
          name:'JobStatus',
          component: JobStatus
        },
        {
          path:'/days-record',
          name:'DaysRecord',
          component: DaysRecord
        },
        {
          path:'/update-record',
          name:'UpdateRecord',
          component: UpdateRecord
        },
        {
          path:'/report',
          name:'Report',
          component: Report
        },
        {
          path:'/record-selection',
          name:'RecordSelection',
          component: RecordSelection
        },
        {
          path:'/tuusermgmt',
          name:'tuUserMgmt',
          component:tuUserMgmt
        },
        {
          path:'/paramgmt',
          name:'ParamMgmt',
          component:ParamMgmt
        },
        {
          path:'/mpprodacctype',
          name:'ProdMgmt',
          component:ProdMgmt
        },
        {
          path:'/tueflist',
          name:'tuEnquiryList',
          component: tuEnquiryList
        },

        {
          path:'/ccdrm/tu-enquiry-summary',
          name: 'tuEnquirySummary',
          component: tuEnquirySummary
        },
        {
          path:'/ccdrm/create-enquiry-file',
          name: 'CreateEnquiryFile',
          component: CreateEnquiryFile
        }
      ]
    }
  ]
})

// const whiteList = ['/login', '/redirect']

// router.beforeEach((to, from, next) => {
//     NProgress.start()
//     if (getToken()) {
//       if (to.path === '/login') {
//         next({ path: '/' })
//         NProgress.done()
//       } else {
//         NProgress.done()
//         next()
//       }
//     } else {
//       // 没有token
//       if (whiteList.indexOf(to.path) !== -1) {
//         // 在免登录白名单，直接进入
//         next()
//       } else {
//         next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//         NProgress.done()
//       }
//     }
// })

// router.afterEach(() => {
//     // finish progress bar
//     NProgress.done()
// })

export default router;