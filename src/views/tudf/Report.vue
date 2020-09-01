<template>
<div>
  <el-input label="Report Name:" v-model="reportName"></el-input>
  <el-button type='primary' @click="submit">Submit</el-button>
  <el-button type='primary' @click="reset">Reset</el-button>
  <el-radio-group v-model="reportType">
    <el-radio v-for="item in reportTypeOptions" :key="item.value" :label="item.name" :value='item.value'>备选项</el-radio>
  </el-radio-group>
</div>
</template>

<script>
  export default {
    name:'Report',
    data() {
      return {      
        reportName: '',
        reportTypeOptions:[
          {name:"Data Exception Report", value:"1"},
          {name:"File Creation Log", value:"2"},
          {name:"Generate Date Exception Report", value:"3"}]
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