<template>
  <div>
    <el-table :data="tableData" highlight-current-row border style="width: 100%">
      <el-table-column label="参数名称">
        <template slot-scope="scope">
          <span>{{ scope.row.paramName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数描述">
        <template slot-scope="scope">
          <span>{{ scope.row.paramDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数值">
        <template slot-scope="scope">
          <span>{{ scope.row.paramValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调整" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      size="medium">
      <el-dialog
        title="修改资讯"
        :append-to-body="true"
        :visible.sync="dialogUpdate"
        width="80%"
        :before-close="handleClose">
        <el-form-item label="参数名称" >
          <el-input v-model="ruleForm.paramName" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="参数描述" >
          <el-input v-model="ruleForm.paramDesc" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="参数值">
          <el-input v-model="ruleForm.paramValue" required disabled></el-input>
        </el-form-item>
        <el-form-item label="新参数值" prop="newValue">
          <el-input v-model="ruleForm.newValue" required></el-input>
        </el-form-item>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel()" size="medium">取 消</el-button>
          <el-button @click="sumbitEditRow()" type="primary" size="medium">发 布</el-button>
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
  var _index;
  export default {
    name: "tuUserMgmt",
    data() {
      return {
        ruleForm: {
          paramName: "",
          paramDesc: "",
          paramValue: "",
          newValue: ""
        },
        rules: {
          newValue: [
            {required: true, message: "请输入新的参数值", trigger: "blur" },
          ]
        },
        tableData: [
          {
            paramName: "TUOPEN",
            paramDesc: "参数服务开关（输入项 ON/OFF）",
            paramValue: "ON",
          },
          {
            paramName: "DAY_CLOSE_START_TIME",
            paramDesc: "每日停止服务开始时间（格式 HH:MM:SS）",
            paramValue: "01:00:00",
          },
          {
            paramName: "DAY_CLOSE_END_TIME",
            paramDesc: "每日停止服务结束时间（格式 HH:MM:SS）",
            paramValue: "09:00:00",
          },
          {
            paramName: "QRYBACKDAYS",
            paramDesc: "查询历史时记录时间范围（单位 天）",
            paramValue: "60",
          },
          {
            paramName: "TUQRYDAYLMT",
            paramDesc: "单日查询次数上限（单位 次数）",
            paramValue: "100",
          }
        ],
        dialogUpdate: false,
        pageSize: 5,
        currentPage: 1,
        total: 0,
        disablePage: false
      };
    },
  methods: {
    handleEdit(index, row) {
      this.dialogUpdate = true;
      this.ruleForm = Object.assign({}, row); //这句是关键！！！
      console.log(this.ruleForm)
      _index = index;
    },
    sumbitEditRow() {
      var editData = _index;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
      // 表单验证通过之后的操作 
      this.tableData[editData].paramValue = this.ruleForm.newValue;
      this.dialogUpdate = false;     
    } else {
      console.log('error submit!!');
      return false;
    }
  });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.$refs.ruleForm.resetFields();
        })
        .catch(_ => {});
    },
    cancel() {
      this.dialogUpdate = false;
      // this.emptyUserData();
    },
    // emptyUserData() {
    //   this.ruleForm = {
    //     userName: "",
    //     userDate: "",
    //     userAddress: ""
    //   };
    // },
  }}
</script>

<style>
</style>