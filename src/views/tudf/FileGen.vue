<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="File Type" prop="fileType">
    <el-radio-group v-model="fileType">
      <el-radio label="All Records File"></el-radio>
      <el-radio label="Selected Records File"></el-radio>
      <el-radio label="Positive Mortgage Records File"></el-radio>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="Report Option" prop="reportOpt">
    <el-radio-group v-model="reportOpt">
      <el-radio label="Report A/C Info Only"></el-radio>
      <el-radio label="Report A/C & CI Info"></el-radio>
    </el-radio-group>
  </el-form-item>
	<el-form-item>
  <el-button type='primary' @click="genFile()">Execute</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    name:'FileGen',
    data() {
      return {
        ruleForm: {
          fileType: '',
          reportOpt: '',
        },
        rules: {
          fileType: [
            { required: true, message: 'please choose file type', trigger: 'change' }
          ],
          reportOpt: [
            { required: true, message: 'please choose report type', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      genFile(){

      }
    }
  }
</script>