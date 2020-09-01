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
        <el-button type="text" class="el-icon-search" @click="handleFilter">
          查询
        </el-button>
        <el-button :loading="downloadLoading" class="el-icon-download" type="text" @click="handleDownload">
          导出
        </el-button>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-table :data="pageList" highlight-current-row border style="width: 100%">
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
      <el-table-column label="No Enquiry within 30 days" prop="qryFlag">
        <template slot-scope="scope">
          <span>{{ scope.row.qryFlag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Valid PDPO" prop="validPDPO">
        <template slot-scope="scope">
          <span>{{ scope.row.validPDPO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="With TU Response" prop="resFlag">
        <template slot-scope="scope">
          <span>{{ scope.row.resFlag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Without TU Response" prop="noResFlag">
        <template slot-scope="scope">
          <span>{{ scope.row.noResFlag }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: "tuEnquirySummary",
  components:{Pagination},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 3,
        date: '',
        qryMode: '',
      },
      tableData: [
        {
          cusCount: "1",
          acCount: "1",
          qryFlag: "y",
          validPDPO: "y",
          resFlag: "y",
          noResFlag: "n",
          date: "2019-01-03",
          qryMode: "mode1",
        },
        {
          cusCount: "2",
          acCount: "2",
          qryFlag: "n",
          validPDPO: "y",
          resFlag: "n",
          noResFlag: "y",
          date: "2019-02-03",
          qryMode: "mode1",
        },
        {
          cusCount: "3",
          acCount: "3",
          qryFlag: "n",
          validPDPO: "y",
          resFlag: "n",
          noResFlag: "y",
          date: "2019-01-13",
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
        const tHeader = ['Customer Count', 'A/C Count', 'No Enquiry within 30 days', 'Valid PDPO', 'With TU Response','Without TU Response','Data Date','Enquiry Mode']
        const filterVal = ['cusCount', 'acCount', 'qryFlag', 'validPDPO', 'resFlag','noResFlag','date','qryMode']
        // const filterVal = ['date','qryMode']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'TU Enquiry Summary'
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