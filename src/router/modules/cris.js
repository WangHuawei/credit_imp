/** When your routing cris is too long, you can split it into small modules **/

import Layout from '@/layout'

const crisRouter = {
  path: '/cris',
  component: Layout,
  redirect: '/cris/parameter-management',
  name: 'CRIS',
  meta: {
    title: 'CRIS',
    icon: 'table'
  },
  children: [
    {
      path: 'parameter-management',
      component: () => import('@/views/cris/PA/ParamMgmt'),
      name: 'ParamMgmt',
      meta: { title: 'Parameter Management' }
    },
    {
      path: 'tu-user-management',
      component: () => import('@/views/cris/PA/tuUserMgmt'),
      name: 'tuUserMgmt',
      meta: { title: 'TU User Management' }
    },
    {
      path: 'product-management',
      component: () => import('@/views/cris/PA/ProdMgmt'),
      name: 'ProdMgmt',
      meta: { title: 'Product Management' }
    },
    {
      path: 'tu-enquiry-list',
      component: () => import('@/views/cris/BA/tuEnquiryList'),
      name: 'tuEnquiryList',
      meta: { title: 'TU Enquiry List' }
    }
  ]
}
export default crisRouter
