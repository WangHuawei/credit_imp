<template>
  <div class="app-container">
    <div class="filter-container">
        <span>Data Date</span>
        <el-date-picker type="date" placeholder="please select" v-model="listQuery.date" value-format="yyyy-MM-dd">
        </el-date-picker>
        <span>Enquiry Mode</span>
        <el-select v-model="listQuery.qryMode" placeholder="please select" clearable>
            <el-option v-for="item in qryModeOptions" :key="item.key" :label="item" :value="item"/>
        </el-select>
        <span>Data Version</span>
        <el-select v-model="listQuery.dataVer" placeholder="please select" clearable>
            <el-option v-for="item in dataVerOptions" :key="item.key" :label="item" :value="item"/>
        </el-select>
        <el-button type="text" class="el-icon-search" @click="handleFilter">
          查询
        </el-button>
        <el-button :loading="downloadLoading" class="el-icon-download" type="text" @click="handleDownload">
          导出
        </el-button>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-table :data="pageList" highlight-current-row border style="width: 100%">
      <el-table-column label="Enquired Customer" width="150" prop="enqCus">
        <template slot-scope="scope" >
          <span>{{ scope.row.enqCus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Enq CI Number" prop="enqCINo">
        <template slot-scope="scope">
          <span>{{ scope.row.enqCINo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Enq CI Name" prop="enqCIName">
        <template slot-scope="scope">
          <span>{{ scope.row.enqCIName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Enq Cust Newest..." prop="enqCusNew">
        <template slot-scope="scope">
          <span>{{ scope.row.enqCusNew }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CI Number" prop="CINo">
        <template slot-scope="scope">
          <span>{{ scope.row.CINo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="A/C Number" prop="accNo">
        <template slot-scope="scope">
          <span>{{ scope.row.accNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Customer Name" prop="cusName">
        <template slot-scope="scope">
          <span>{{ scope.row.cusName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Card No" prop="cardNo">
        <template slot-scope="scope">
          <span>{{ scope.row.cardNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pri/Su..." prop="pri">
        <template slot-scope="scope">
          <span>{{ scope.row.pri }}</span>
        </template>
      </el-table-column>
      <el-table-column label="A/C Lo..." prop="accLo">
        <template slot-scope="scope">
          <span>{{ scope.row.accLo }}</span>
        </template>
      </el-table-column>     
      <el-table-column label="Credit..." prop="credit">
        <template slot-scope="scope">
          <span>{{ scope.row.credit }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: "ResponseDetail",
  components:{Pagination},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 3,
        date: '',
        qryMode: '',
        dataVer: ''
      },
      tableData: [
        {
          enqCus: "1",
          enqCINo: "1",
          enqCIName: "y",
          enqCusNew: "y",
          CINo: "y",
          accNo: "n",
          accNo: '',
          cusName: '',
          cardNo: '',
          pri:'',
          accLo: '',
          credit: '',
          date: "2019-01-03",
          qryMode: "mode1",
          dataVer: '1.1'
        },
        {
          enqCus: "1",
          enqCINo: "1",
          enqCIName: "y",
          enqCusNew: "y",
          CINo: "y",
          accNo: "n",
          accNo: '',
          cusName: '',
          cardNo: '',
          pri:'',
          accLo: '',
          credit: '',
          date: "2019-01-03",
          qryMode: "mode1",
          dataVer: '1.1'
        },
        {
          enqCus: "1",
          enqCINo: "1",
          enqCIName: "y",
          enqCusNew: "y",
          CINo: "y",
          accNo: "n",
          accNo: '',
          cusName: '',
          cardNo: '',
          pri:'',
          accLo: '',
          credit: '',
          date: "2019-01-03",
          qryMode: "mode1",
          dataVer: '1.1'
        }
      ],
      total: 0,
      list: null,
      pageList: null,
      qryModeOptions: ['mode1','mode2'],
      dataVerOptions: ['1.0','1.1','2.0'],
      downloadLoading: false
    };
  },
  created(){
    this.getList()
  },
  methods: {
   getList(){
      this.list = this.tableData.filter(item =>{
          if (this.listQuery.qryMode && item.qryMode !== this.listQuery.qryMode) return false       
          if (this.listQuery.date && item.date !== this.listQuery.date) return false
          if (this.listQuery.dataVer && item.dataVer !== this.listQuery.dataVer) return false
          return true
      })
      this.pageList = this.list.filter((item, index) =>
                  index < this.listQuery.page * this.listQuery.limit && index >= this.listQuery.limit * (this.listQuery.page - 1)
      )
      this.total = this.list.length
    },  
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Enquired Customer', 'Enq CI Number', 'Enq CI Name', 'Enq Cust Newest...', 'CI Number','A/C Number','Customer Name','Card No','Pri/Su...','A/C Lo...','Credit...','Data Date','Enquiry Mode','Data Version']
        const filterVal = ['enqCus', 'enqCINo', 'enqCIName', 'enqCusNew', 'CINo','accNo','cusName','cardNo','pri','accLo','credit','date','qryMode','dataVer']
        // const filterVal = ['date','qryMode']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'Response Detail'
        })
        this.downloadLoading = false
      })
    }, 
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {   
          return v[j]
      }))
    },
  }
}
</script>

<style scoped>
.search_no {
  width: 400px;
}
</style>