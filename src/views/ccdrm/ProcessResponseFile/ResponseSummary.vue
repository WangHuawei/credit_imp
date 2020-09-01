<template>
  <div class="app-container">
    <div class="filter-container">
        <span>Data Date</span>
        <el-date-picker type="date" placeholder="please select" v-model="listQuery.date" value-format="yyyy-MM-dd">
        </el-date-picker>
        <span>Enquiry Mode</span>
        <el-select v-model="listQuery.qryMode" placeholder="please select">
            <el-option v-for="item in qryModeOptions" :key="item.key" :label="item" :value="item"/>
        </el-select>
        <span>No TU check due to reviewed within 30 days</span>
        <el-select v-model="listQuery.tuCheckFlag" placeholder="No" clearable>
            <el-option label="No" value="N"/>
            <el-option label="Yes" value="Y"/>
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
      <el-table-column label="CMS Review Grade" width="150" prop="reviewGrade">
        <template slot-scope="scope" >
          <span>{{ scope.row.reviewGrade }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Customer Count" width="150" prop="cusCount">
        <template slot-scope="scope" >
          <span>{{ scope.row.cusCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="A/C Count" prop="acCount">
        <template slot-scope="scope">
          <span>{{ scope.row.acCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Outstanding Balance" prop="balance">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column label="% of Total Outstanding Balance" prop="balancePer">
        <template slot-scope="scope">
          <span>{{ scope.row.balancePer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Accounts with Public Record..." prop="accPub">
        <template slot-scope="scope">
          <span>{{ scope.row.accPub }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: "ResponseSummary",
  components:{Pagination},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 3,
        date: '',
        qryMode: '',
        tuCheckFlag: '',
      },
      tableData: [
        {
          reviewGrade: "78",
          cusCount: '3',
          acCount: "1",
          balance: "y",
          balancePer: "y",
          accPub: "y",
          tuCheckFlag: "n",
          date: "2019-01-03",
          qryMode: "mode1",
        },
        {
          reviewGrade: "78",
          cusCount: '3',
          acCount: "1",
          balance: "y",
          balancePer: "y",
          accPub: "y",
          tuCheckFlag: "n",
          date: "2019-01-03",
          qryMode: "mode1",
        },
        {
          reviewGrade: "78",
          cusCount: '3',
          acCount: "1",
          balance: "y",
          balancePer: "y",
          accPub: "y",
          tuCheckFlag: "n",
          date: "2019-02-03",
          qryMode: "mode2",
        }
      ],
      total: 0,
      list: null,
      pageList: null,
      qryModeOptions: ['mode1','mode2'],
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
          if (this.listQuery.tuCheckFlag && item.tuCheckFlag !== this.listQuery.tuCheckFlag) return false
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
        const tHeader = ['CMS Review Grade','Customer Count', 'A/C Count', 'Outstanding Balance', '% of Total Outstanding Balance', 'Accounts with Public Records','Data Date','Enquiry Mode','No TU Check due to reviewed within 30 days']
        const filterVal = ['reviewGrade','cusCount', 'acCount', 'balance', 'balancePer', 'accPub','date','qryMode',,'tuCheckFlag']
        // const filterVal = ['date','qryMode']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'Response Summary'
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