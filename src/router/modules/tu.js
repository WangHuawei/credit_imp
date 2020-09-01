/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const tuRouter = {
  path: '/tu',
  component: Layout,
  redirect: 'noRedirect',
  name: 'TU',
  meta: {
    title: 'TU',
    icon: 'chart'
  },
  children: [
    {
      path: 'amend-report',
      component: () => import('@/views/tudf/AmendReport'),
      name: 'AmendReport',
      meta: { title: 'Amend Report', noCache: true }
    },
    {
      path: 'enquiry',
      component: () => import('@/views/tudf/Enquiry'),
      name: 'Enquiry',
      meta: { title: 'Enquiry', noCache: true }
    },
    {
      path: 'delete-record',
      component: () => import('@/views/tudf/DelRecord'),
      name: 'DelRecord',
      meta: { title: 'Delete Record', noCache: true }
    },
    {
      path: 'file-generation',
      component: () => import('@/views/tudf/FileGen'),
      name: 'FileGen',
      meta: { title: 'File Generation', noCache: true }
    },
    {
      path: 'file-download',
      component: () => import('@/views/tudf/FileDownload'),
      name: 'FileDownload',
      meta: { title: 'File Download', noCache: true }
    },
    {
      path: 'job-status',
      component: () => import('@/views/tudf/JobStatus'),
      name: 'JobStatus',
      meta: { title: 'Job Status', noCache: true }
    },
    {
      path: 'record-selection',
      component: () => import('@/views/tudf/RecordSelection'),
      name: 'RecordSelection',
      meta: { title: 'Record Selection', noCache: true }
    },
    {
      path: '31-days-record',
      component: () => import('@/views/tudf/DaysRecord'),
      name: 'DaysRecord',
      meta: { title: '31 Days Record', noCache: true }
    },
    {
      path: 'report',
      component: () => import('@/views/tudf/Report'),
      name: 'Report',
      meta: { title: 'Report', noCache: true }
    },
    {
      path: 'update-record',
      component: () => import('@/views/tudf/UpdateRecord'),
      name: 'UpdateRecord',
      meta: { title: 'Update Record', noCache: true }
    }
  ]
}

export default tuRouter
