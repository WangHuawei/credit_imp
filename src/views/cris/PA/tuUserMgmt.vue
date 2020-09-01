<template>
  <div>
    <el-table :data="tableData" highlight-current-row border style="width: 100%">
      <el-table-column label="TU用户编码">
        <template slot-scope="scope">
          <span>{{ scope.row.tuUserId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后调整日期">
        <template slot-scope="scope">
          <i class="el-icon-time hidden-sm-and-down"></i>
          <span>{{ scope.row.modifyDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统简称">
        <template slot-scope="scope">
          <span>{{ scope.row.system }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门">
        <template slot-scope="scope">
          <span>{{ scope.row.dept }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
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
        <el-form-item label="TU用户编码" >
          <el-input v-model="ruleForm.tuUserId" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="当前密码" >
          <el-input v-model="ruleForm.pwd" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="ruleForm.newPwd" required show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPwd2">
          <el-input type="password" v-model="ruleForm.newPwd2" required show-password></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <i>Password Security Rules:</i>
          <ol>
            <li>8 non-blank alphanumeric characters!</li>
            <li>At least 2 numeric characters!</li>
            <li>No more than 2 consecutive identical characters!</li>
            <li>No more than 3 ascending or descending consecutive characters!</li>
            <li>Do not use 8 previously used password!</li>
          </ol>         
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
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ruleForm.newPwd !== "") {
            this.$refs.ruleForm.validateField("newPwd2");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          tuUserId: "",
          modifyDate: "",
          system: "",
          dept: "",
          pwd:'',
          newPwd: "",
          newPwd2: "",
          remark: ""
        },
        rules: {
          newPwd: [
            { validator: validatePass, trigger: "blur" },
            { min: 2, max: 8, message: "长度在 2 到 7 个字符", trigger: "blur" },
            {required: true}
          ],
          newPwd2: [
            { validator: validatePass2, trigger: "blur" },
            {required: true}
          ]
        },
        tableData: [
            {
            tuUserId: "BB07610204",
            modifyDate: "20200612",
            system: "APS*NPP",
            dept: "CMD",
            pwd: 'abcd1234',
            remark: "test1"
          },
          {
            tuUserId: "BB07610745",
            modifyDate: "20200702",
            system: "PAPS",
            dept: "CCC",
            pwd: 'abcd4321',
            remark: "test2"
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
      this.tableData[editData].pwd = this.ruleForm.newPwd;
      this.tableData[editData].remark = this.ruleForm.remark;
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
      this.dialogVisible = false;
      this.emptyUserData();
    },
    emptyUserData() {
      this.ruleForm = {
        userName: "",
        userDate: "",
        userAddress: ""
      };
    },
    // updateUser() {
    //     let postData = this.qs.stringify({
    //         newPwd: this.ruleForm.newPwd,
    //     });
    //     this.axios({
    //         method: 'post',
    //         url:'/update',
    //         data:postData
    //     }).then(response =>
    //     {
    //         this.handleCurrentChange();
    //         this.cancel();
    //         this.$message({
    //             type: 'success',
    //             message: '更新成功!'
    //         });
    //         console.log(response);
    //     }).catch(error =>
    //     {
    //         this.$message({
    //             type: 'success',
    //             message: '更新失败!'
    //         });
    //         console.log(error);
    //     });
    // },
  }}
</script>

<style>
</style>