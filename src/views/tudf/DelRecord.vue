<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
  <el-form-item label="Account Number" prop="accNo">
    <el-input v-model="sea_accNo"></el-input>
  </el-form-item>
  <el-form-item label="Account Status" prop="accStatus">
    <el-select v-model="sea_accStatus">
      <el-option label="A-Active" value="A"></el-option>
	    <el-option label="BW-Bankruptcy Write Off" value="BW"></el-option>
      <el-option label="DA-Past Due" value="DA"></el-option>
      <el-option label="S-Selected" value="S"></el-option>
      <el-option label="W-Write Off" value="W"></el-option>
      <el-option label="C-Closed" value="C"></el-option>
      <el-option label="I-Inactive" value="I"></el-option>
      <el-option label="L-Legal Action" value="L"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Account Type" prop="accType">
    <el-select v-model="sea_accType">
      <el-option label="1100 Housing Mortgage" value="1100"></el-option>
	    <el-option label="1300 Non-Residential Mortgage" value="1300"></el-option>
      <el-option label="2100 Hire Purchase Contract" value="2100"></el-option>
    </el-select>
  </el-form-item>

	<el-form-item>
  <el-button type='primary' @click="onSearch()">Search</el-button>
  </el-form-item>
	<el-form-item>
  <el-button type='primary' @click="resetForm('ruleForm')">Reset</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    name:'DelRecord',
    data() {
      return {
        ruleForm: {
          accNo:'',
          accStatus:'',
          accType:'', 
        },
        rules: {
          accNo: [
            { required: true, message: 'please select department', trigger: 'change' }
          ],
        },
        tableData: [],
        sea_accNo: '',
        sea_accStatus: '',
        sea_accType: '',
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
      onSearch() {
                let postData = this.qs.stringify({
                    accNo: this.sea_accNo,
                    accStatus: this.sea_accStatus,
                    accType: this.sea_accType,
                    cusNo: this.sea_cusNo
                });
                this.axios({
                    method: 'post',
                    url: '/ListByName',
                    data: postData
                }).then(response =>
                {
                    this.tableData = response.data;
                    this.disablePage = true;
                }).catch(error =>
                {
                    console.log(error);
                });
            },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  .el-input {
    width: 200px;
  }
</style>