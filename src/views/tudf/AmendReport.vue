<template>
<el-form :model="amendReport" :rules="rules" ref="amendReport" label-width="200px" class="demo-ruleForm">
    <el-form-item label="TU Data Date" required>
    <el-col :span="11">
      <el-form-item prop="dataDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="amendReport.dataDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>

  <el-row>
  
  <el-form-item label="Amendment Dept" prop="dept" required>
    <el-select v-model="amendReport.dept" default='All'>
      <el-option label="All" value="All"></el-option>
	  <el-option label="CMD" value="CMD"></el-option>
      <el-option label="CCC" value="CCC"></el-option>
    </el-select>
  </el-form-item>

    <el-form-item>
  <el-button type='primary' @click="submitForm('amendReport')">Search</el-button>
  </el-form-item>
</el-row>
<!--
<el-table :data='amendReport.tableData' height='250' border style='width: 100%'>
	<el-table-column
	type='index'
	:index='1'>
	</el-table-column>
	<el-table-column
	  prop='userName'
	  label='User Name'>
	</el-table-column>
	<el-table-column
	  prop='dept'
	  label='Dept'>
	</el-table-column>
	<el-table-column
	  prop='modifyTime'
	  label='Modify Time'>
	</el-table-column>
	<el-table-column
	  prop='loanNo'
	  label='Loan No'>
	</el-table-column>
	<el-table-column
	  prop='CI'
	  label='CI Number'>
	</el-table-column>
	<el-table-column
	  prop='customerName'
	  label='Customer Name'>
	</el-table-column>
	<el-table-column
	  prop='modifyMode'
	  label='Modify Mode'>
	</el-table-column>
	<el-table-column
	  prop='info'
	  label='Information'>
	</el-table-column>
	<el-table-column
	  prop='originValue'
	  label='Original Value'>
	</el-table-column>
	<el-table-column
	  prop='updatedValue'
	  label='Updated Value'>
	</el-table-column>
	<el-table-column
	  prop='dataDate'
	  label='TU Data Date'>
	</el-table-column>
</el-table> -->
</el-form>
</template>

<script>
  export default {
    name:'AmendReport',
    data() {
      return {
        amendReport: {
        userName:'',
          dept:'',
		  modifyTime:'',
		  loanNo:'',
		  CI:'',
		  customerName:'',
		  modifyMode:'',
		  info:'',
		  originValue:'',
		  updatedValue:'',
		  dataDate: ''      
        },
        rules: {
          region: [
            { required: true, message: 'please select department', trigger: 'change' }
          ],
          dataDate: [
            { type: 'date', required: true, message: 'please select TU Data Date', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>