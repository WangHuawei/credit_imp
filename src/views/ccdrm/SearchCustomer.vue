<template>
  <div class="app-container">
    <div class="filter-container">
        <span>CI Number</span>
        <el-input v-model="listQuery.CINo" placeholder="please select" clearable>
        </el-input>
        <span>Data Date</span>
        <el-date-picker type="date" placeholder="please select" v-model="listQuery.date" value-format="yyyy-MM-dd">
        </el-date-picker>     
        <el-button type="text" class="el-icon-search" @click="handleFilter">
          查询
        </el-button>
        <el-button :loading="downloadLoading" class="el-icon-download" type="text" @click="handleDownload">
          导出
        </el-button>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-table :data="pageList" highlight-current-row border style="width: 100%">
      <el-table-column label="CI Number" prop="CINo">
        <template slot-scope="scope">
          <span>{{ scope.row.CINo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Customer Name" width="150" prop="cusName">
        <template slot-scope="scope" >
          <span>{{ scope.row.cusName }}</span>
        </template>
      </el-table-column>     
      <el-table-column label="Last PDPO Mailing Date" prop="PDPOMailDate">
        <template slot-scope="scope">
          <span>{{ scope.row.PDPOMailDate }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: "SearchCustomer",
  components:{Pagination},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 3,
        date: '',
        CINo: '',
      },
      tableData: [
        {
          CINo: "1",
          cusName: "1",
          PDPOMailDate: "y",
          date: "2019-01-03",
        },
        {
          CINo: "1",
          cusName: "1",
          PDPOMailDate: "y",
          date: "2019-01-03",
        },
        {
          CINo: "1",
          cusName: "1",
          PDPOMailDate: "y",
          date: "2019-01-03",
        },
      ],
      total: 0,
      list: null,
      pageList: null,
      downloadLoading: false
    };
  },
  created(){
    this.getList()
  },
  methods: {
   getList(){
      this.list = this.tableData.filter(item =>{
          if (this.listQuery.CINo && item.CINo !== this.listQuery.CINo) return false       
          if (this.listQuery.date && item.date !== this.listQuery.date) return false
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
        const tHeader = ['CI Number','Customer Name', 'Last PDPO Mailing Date', 'Data Date']
        const filterVal = ['CINo','cusName','PDPOMailDate','date']
        // const filterVal = ['date','qryMode']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'Missing PDPO Customer'
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