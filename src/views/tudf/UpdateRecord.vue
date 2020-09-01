<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.accNo" style="width: 200px;" clearable class="filter-item"/>
      <el-select v-model="listQuery.accStatus" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in accStatusOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.accType" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in accTypeOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-input v-model="listQuery.cusNo" style="width: 200px;" clearable class="filter-item"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleReset">
        Reset
      </el-button>
    </div>
    
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    
    <el-table
      :data="pageList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="Account No." prop="accNo" width="80">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.accNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Account Status" prop="accStatus" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.accStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Account Type" prop="accType" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.accType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Currency Code" prop="curCode" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.curCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Loan Amount" prop="loanAmt" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.loanAmt }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
    name: 'UpdateRecord',
    components: {Pagination},
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 3,
          accStatus: '',
          accNo: '',
          accType: '',
          cusNo: '',
        },
        tableData:[
          {
            accNo: 'BB07610745',
            accStatus: 'A',
            accType: '5700',
            curCode: 'HKD',
            loanAmt: '20000',
            cusNo: '3100',
          },
        ],
        total: 0,
        pageList: null,
        accStatusOptions: [
          {label:"A-Active", value:"A"},
          {label:"BW-Bankruptcy Write Off", value:"BW"},
          {label:"DA-Past Due", value:"DA"},
          {label:"S-Selected", value:"S"},
          {label:"W-Write Off", value:"W"},
          {label:"C-Closed", value:"C"},
          {label:"I-Inactive", value:"I"},
          {label:"L-Legal Action", value:"L"}
        ],
        accTypeOptions: [
          {label:"1100 Housing Mortgage", value:"1100"},
          {label:"1300 Non-Residential Mortgage", value:"1300"},
          {label:"2100 Hire Purchase Contract", value:"2100"},
          {label:"2200 Leasing Contract", value:"2200"},
          {label:"2300 Stocking Loan", value:"2300"},
          {label:"3100 Unsecured Personal Loan", value:"3100"},
          {label:"3200 Unsecured Tax Loan", value:"3200"},
          {label:"3300 Unsecured Short Term Loan", value:"3300"},
          {label:"3400 Unsecured Decoration Loan", value:"3400"},
          {label:"3600 Restructured Loan", value:"3600"},
          {label:"5700 Unsecured O/D Facility", value:"5700"},
          {label:"5750 Secured O/D Account(Fully/Partly Secured)", value:"5750"},
          {label:"6100 Other Loans", value:"6100"},
          {label:"6500 Conditional HP/Leasing Account", value:"6500"}
        ]
      }
    },
    created(){
      this.getList()
    },
    methods: { 
      getList(){
        let list = this.tableData.filter(item =>{
           if (this.listQuery.accNo && item.accNo !== this.listQuery.accNo) return false       
           if (this.listQuery.accStatus && item.accStatus !== this.listQuery.accStatus) return false
           if (this.listQuery.accType && item.accType !== this.listQuery.accType) return false
           if (this.listQuery.cusNo && item.accType !== this.listQuery.cusNo) return false
           return true
        })
        this.pageList = list.filter((item, index) =>
                    index < this.listQuery.page * this.listQuery.limit && index >= this.listQuery.limit * (this.listQuery.page - 1)
        )
        this.total = list.length
      },  
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleReset(){

      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              const index = this.list.findIndex(v => v.id === this.temp.id)
              this.list.splice(index, 1, this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
    } 
    }
}
</script>