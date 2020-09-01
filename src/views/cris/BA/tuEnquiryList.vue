<template>
<div>
  <el-form :model="listQuery" ref="listQuery" label-width="100px" class="demo-ruleForm">
    <el-row :gutter="10">
      <el-col :span="9">
        <el-form-item label="查询时间">
          <el-date-picker
            v-model="listQuery.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="截止日期"
            unlink-panels
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            
            @change="handleFilter">
            </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="系统简称" prop="system">
          <el-select v-model="listQuery.system" placeholder="系统简称" clearable @change="handleFilter">
            <el-option v-for="item in systemOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="TU用户编码" prop="tuUserId">
          <el-select v-model="listQuery.tuUserId" placeholder="TU用户编码" clearable @change="handleFilter">
            <el-option v-for="item in tuUserIdOptions" :key="item.key" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="部门" prop="dept">
          <el-select v-model="listQuery.dept" placeholder="部门" clearable @change="handleFilter">
            <el-option v-for="item in deptOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
    <el-form-item label="Enquiry Result" label-width="150px" prop="qryRes" >
      <el-checkbox-group v-model="listQuery.qryRes" @change="handleFilter">
        <el-checkbox label="Not Found" ></el-checkbox>
        <el-checkbox label="Found" ></el-checkbox>
        <el-checkbox label="Error" ></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
      </el-col>
      <el-col :span="10">
      <el-form-item width="100px">
        <el-input
          v-model="listQuery.cusInfo"            
          prefix-icon="el-icon-user-solid"
          clearable
          class="search_no"
          @input="handleFilter"
          placeholder="please search by customer's information!">
        </el-input>
      </el-form-item>
      </el-col>
    </el-row>
    </el-form>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-table :data="pageList" highlight-current-row fit border style="width: 100%">
      <el-table-column label="TU用户编码" prop="tuUserId"></el-table-column>
      <el-table-column label="业务查询编号" prop="qryNo"></el-table-column>
      <el-table-column label="TU报告编号" prop="reportNo"></el-table-column>
      <el-table-column label="系统简称" prop="system"></el-table-column>
      <el-table-column label="部门" prop="dept"></el-table-column>
      <el-table-column label="TU查询类型" prop="tuQryType"></el-table-column>
      <el-table-column label="TU查询结果" prop="qryRes"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="证件类型" prop="regType"></el-table-column>
      <el-table-column label="证件号码" prop="regNo"></el-table-column>
      <el-table-column label="签发国家" prop="country"></el-table-column>
      <el-table-column label="查询时间" prop="qryTime"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'

  export default {
    name: 'tuEnquiryList',
    components: {Pagination},
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 3,
          date: '',
          system: '',
          dept: '',
          tuUserId: '',
          qryRes: [],
          cusInfo: ''
        },
        tableData:[
          {
            tuUserId: 'BB07610745',
            qryNo: '01102021171800265-0',
            reportNo: '171804071',
            system: 'PAPS',
            dept: 'CCC',
            tuQryType: '3100',
            qryRes: 'Found',
            name: 'WE SD',
            regType: 'ID',
            regNo: 'C****240',
            country: 'HKG',
            qryTime: '2020-07-14 13:36:22',
          },
          {
            tuUserId: 'BB07610745',
            qryNo: '01102021171800261-0',
            reportNo: '171803487',
            system: 'PAPS',
            dept: 'CCC',
            tuQryType: '3100',
            qryRes: 'Found',
            name: 'CHAN DAMEN',
            regType: 'ID',
            regNo: 'D****685',
            country: 'CHN',
            qryTime: '2020-07-14 10:09:18',
          },
          {
            tuUserId: 'BB07610746',
            qryNo: '01102021171800261-1',
            reportNo: '171801234',
            system: 'APS',
            dept: 'CMD',
            tuQryType: '3200',
            qryRes: 'Not Found',
            name: 'CHOW TAIFUK',
            regType: 'ID',
            regNo: 'E****090',
            country: 'USA',
            qryTime: '2020-04-15 11:33:24',
          },
          {
            tuUserId: 'BB07610746',
            qryNo: '01102021171800261-1',
            reportNo: '171801234',
            system: 'APS',
            dept: 'SBD',
            tuQryType: '3300',
            qryRes: 'Not Found',
            name: 'CHOW TAIFUK',
            regType: 'ID',
            regNo: 'E****090',
            country: 'USA',
            qryTime: '2020-04-15 11:33:24',
          },
          {
            tuUserId: 'BB07610746',
            qryNo: '01102021171800261-1',
            reportNo: '171801234',
            system: 'APS',
            dept: 'CMD',
            tuQryType: '3300',
            qryRes: 'Error',
            name: 'CHOW TAIFUK',
            regType: 'ID',
            regNo: 'E****090',
            country: 'USA',
            qryTime: '2020-04-15 11:33:24',
          }
        ],
        total: 0,
        pageList: null,
        systemOptions: ['APS','PAPS'],
        deptOptions: ['CCC','CMD','CAD'],
        tuUserIdOptions: ['BB07610745','BB07610746'],
      }
    },
    created(){
      this.getList()
    },
    methods: { 
      getList(){
        let list = this.tableData.filter(item =>{
           if (this.listQuery.tuUserId && item.tuUserId !== this.listQuery.tuUserId) return false
           if (this.listQuery.date){
             if (item.qryTime < this.listQuery.date[0] || item.qryTime > this.listQuery.date[1]) return false
           }         
           if (this.listQuery.dept && item.dept !== this.listQuery.dept) return false
           if (this.listQuery.system && item.system !== this.listQuery.system) return false
           if (this.listQuery.qryRes.length > 0 && this.listQuery.qryRes.indexOf(item.qryRes) < 0) return false
           if (this.listQuery.cusInfo && item.name.indexOf(this.listQuery.cusInfo) < 0 && item.regNo.indexOf(this.listQuery.cusInfo) < 0) return false
           return true
        }
                    // item.tuUserId.includes(this.listQuery.tuUserId) &&
                    // item.system.includes(this.listQuery.system) &&
                    // item.dept.includes(this.listQuery.dept) &&
                    // (item.qryRes.indexOf(this.listQuery.qryRes) > -1) &&
                    // (item.name.includes(this.listQuery.cusInfo) ||
                    // item.regNo.includes(this.listQuery.cusInfo))
        )
        this.pageList = list.filter((item, index) =>
                    index < this.listQuery.page * this.listQuery.limit && index >= this.listQuery.limit * (this.listQuery.page - 1)
        )
        this.total = list.length
      },  
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
        console.log('test')
      }, 
    }
  }
</script>