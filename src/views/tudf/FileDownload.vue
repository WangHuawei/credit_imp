<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
  <el-form-item label="File Name" prop="fileName">
    <el-input v-model="fileName"></el-input>
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
    name:'FileDown',
    data() {
      return {
        ruleForm: {
          fileName:'',
        },
        rules: {
          fileName: [
            { required: true, message: 'please input file name', trigger: 'change' }
          ],
        },
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
                    fileName: this.fileName,
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