<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
          <el-form-item width="100px">
            <el-input
              v-model="input"            
              size="medium"
              prefix-icon="el-icon-search"
              clearable
              class="search_no"
              placeholder="please search by product code or TU enquiry type!">
            </el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              type="text"
              class="el-icon-search">查询
            </el-button>
          </el-form-item> -->
          <el-form-item>
            <el-button
              class="el-icon-circle-plus-outline"
              type="text"
              @click="handleAdd()">添加
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="el-icon-download"
              type="text"
              >导出
            </el-button>
          </el-form-item>
    </el-form>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[3, 5, 10, 15, 20]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="9">
    </el-pagination>

    <el-table :data="tables" highlight-current-row border style="width: 100%">
      <el-table-column label="产品编码/卡Bin" width="150" prop="prodCode">
        <!-- <template slot-scope="scope" >
          <span>{{ scope.row.prodCode }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="币种" prop="currency">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.currency }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="TU查询类型" prop="tuQryType">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.tuQryType }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="再评估标志" prop="reEvaluateFlag">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.reEvaluateFlag }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="上报标志" prop="reportFlag">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.reportFlag }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="备注" prop="remark">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="创建日期" prop="dateCreated">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.dateCreated }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="更新日期" prop="dateUpdated">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.dateUpdated }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="创建用户" prop="userCreated">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.userCreated }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="更新用户" prop="userUpdated">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.userUpdated }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="编辑" fixed="right" width="70">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" fixed="right" width="70">
        <template slot-scope="scope">
          <el-button size="mini" type= "danger" icon="el-icon-delete" @click="deleteData(scope.$index, scope.row)"></el-button>
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
        <el-form-item label="产品编号/卡Bin">
            <el-input v-model="ruleForm.prodCode" readonly disabled></el-input>
          </el-form-item>
          <el-form-item label="TU查询类型" >
            <el-input v-model="ruleForm.tuQryType" readonly disabled></el-input>
          </el-form-item>
          <el-form-item label="币种">
            <el-input v-model="ruleForm.currency" readonly disabled></el-input>
          </el-form-item>
          <el-form-item label="再评估标志">
            <el-select v-model="ruleForm.reEvaluateFlag" required>
              <el-option label="N" value="N"></el-option>
              <el-option label="Y" value="Y"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上报标志">
            <el-select v-model="ruleForm.reportFlag" required>
              <el-option label="N" value="N"></el-option>
              <el-option label="Y" value="Y"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark">{{ruleForm.remark}}</el-input>
          </el-form-item>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel()" size="medium">取 消</el-button>
          <el-button @click="sumbitEditRow()" type="primary" size="medium">发 布</el-button>
        </span>
      </el-dialog>
    </el-form>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="120px" size="medium">
        <el-dialog
          title="新增记录"
          :append-to-body='true'
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">
          <el-form-item label="产品编号/卡Bin" prop="prodCode">
            <el-input v-model="ruleForm.prodCode" maxlength="12" show-word-limit placeholder="产品编号/卡Bin"></el-input>
          </el-form-item>
          <el-form-item label="TU查询类型" prop="tuQryType">
            <el-input v-model="ruleForm.tuQryType" maxlength="4" show-word-limit placeholder="TU查询类型"></el-input>
          </el-form-item>
          <el-form-item label="币种" prop="currency">
            <el-input v-model="ruleForm.currency" maxlength="3" show-word-limit placeholder="币种"></el-input>
          </el-form-item>
          <el-form-item label="再评估标志" prop="reEvaluateFlag">
            <el-select v-model="ruleForm.reEvaluateFlag">
              <el-option label="N" value="N"></el-option>
              <el-option label="Y" value="Y"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上报标志" prop="reportFlag">
            <el-select v-model="ruleForm.reportFlag">
              <el-option label="N" value="N"></el-option>
              <el-option label="Y" value="Y"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark" maxlength="100" show-word-limit></el-input>
          </el-form-item>

          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="sumbitAddRow()" type="primary" size="medium">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
  </div>
</template>

<script>
  var _index;
  export default {
    name: "ProdMgmt",
    data() {
      return {
        ruleForm: {
          prodCode: '',
          tuQryType: '',
          currency: '',
          reEvaluateFlag: '',
          reportFlag:'',
          dateCreated: '',
          dateUpdated: '',
          userCreated: '',
          userUpdated: '',
          remark: ''
        },
        rules: {
          prodCode: [
            {required: true, type: "number", length: 12, message: "请输入12位数字", trigger: "blur" }
          ],
          tuQryType: [
            {required: true, length: 4, message: "请输入4位数字", trigger: "blur" }
          ],
          currency: [
            {required: true}
          ],
          remark: [
            {length: 100, message: "不得超过100字", trigger: "blur"}
          ]
        },
          tableData: [
            {
              prodCode: "102080002040",
              tuQryType: "3100",
              currency: "HKD",
              reEvaluateFlag: "N",
              reportFlag: "N",
              dateCreated: "20171022",
              dateUpdated: "20200702",
              userCreated: "system",
              userUpdated: "system",
              remark: "test1"
            },
            {
              prodCode: "102080002041",
              tuQryType: "3100",
              currency: "HKD",
              reEvaluateFlag: "Y",
              reportFlag: "N",
              dateCreated: "20170605",
              dateUpdated: "20200702",
              userCreated: "system2",
              userUpdated: "system2",
              remark: "test2"
            },
            {
              prodCode: "102080002042",
              tuQryType: "3300",
              currency: "CNY",
              reEvaluateFlag: "N",
              reportFlag: "Y",
              dateCreated: "20190609",
              dateUpdated: "20200702",
              userCreated: "system",
              userUpdated: "system",
              remark: "test3"
            }
        ],
        // search: "",
        // editForm: [],
        // addForm: [],
        input: "",
        dialogVisible: false,
        dialogUpdate: false,
        pageSize: 5,
        currentPage: 1,
        total: 0,
        // disablePage: false
      };
    },
  methods: {
    handleEdit(index, row) {
      this.dialogUpdate = true;
      this.ruleForm = Object.assign({}, row); //这句是关键！！！
      // console.log(this.ruleForm);
      _index = index;
      // console.log(_index)
    },
    sumbitEditRow() {
      // this.editForm = this.ruleForm;
      var editData = _index;
      // console.log("editData的值" + this.ruleForm);
      // console.log(this.tableData[editData])
      
      this.tableData[editData].reEvaluateFlag = this.ruleForm.reEvaluateFlag;
      this.tableData[editData].reportFlag = this.ruleForm.reportFlag;
      this.tableData[editData].remark = this.ruleForm.remark;
 
      
      this.cancel();
    },
    deleteData(index, row) {
      console.log(index, row);
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
				// console.log("进行了删除操作")
				// console.log("index的值是：" + index)
				// console.log("row的值是：", row)
        });
    },
    handleAdd(){    
      console.log(this.ruleForm) ;
      this.$nextTick(() => {
      this.$refs.ruleForm.resetFields();
    });  
      this.dialogVisible = true;      
    },
    sumbitAddRow() {
      // console.log(valid)
      console.log(this.ruleForm)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
      // 表单验证通过之后的操作  
        this.tableData.push({
					prodCode: this.ruleForm.prodCode,
					tuQryType: this.ruleForm.tuQryType,
          currency: this.ruleForm.currency,
          reEvaluateFlag: this.ruleForm.reEvaluateFlag,
          reportFlag: this.ruleForm.reportFlag,
          remark: this.ruleForm.remark
        }),
        this.dialogVisible = false     
    } else {
      console.log('error submit!!');
      return false;
    }
  });
  
},
// 以下待后端接口		
    // handleDelete(index, row) {
    //             console.log(index, row);
    //             this.$confirm('删除操作, 是否继续?', '提示', {
    //                 confirmButtonText: '确定',
    //                 cancelButtonText: '取消',
    //                 type: 'warning'
    //             }).then(() => {
    //                 let postData = this.qs.stringify({
    //                     userId: row.userId,
    //                 });
    //                 this.axios({
    //                     method: 'post',
    //                     url:'/delete',
    //                     data:postData
    //                 }).then(response =>
    //                 {
    //                     this.getPages();
    //                     this.currentPage = 1;
    //                     this.axios.post('/page').then(response =>
    //                     {
    //                         this.tableData = response.data;
    //                     }).catch(error =>
    //                     {
    //                         console.log(error);
    //                     });
    //                     this.$message({
    //                         type: 'success',
    //                         message: '删除成功!'
    //                     });
    //                     console.log(response);
    //                 }).catch(error =>
    //                 {
    //                     console.log(error);
    //                 });

    //             }).catch(() => {
    //                 this.$message({
    //                     type: 'info',
    //                     message: '已取消删除'
    //                 });
    //             });
    //         },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.$refs.ruleForm.resetFields();      
        })
        .catch(_ => {});
    },
    // handleCurrentChange() {
    //   console.log(`当前页: ${this.currentPage}`);
    //   let postData = this.qs.stringify({
    //     page: this.currentPage
    //   });
    //   this.axios({
    //     method: "post",
    //     url: "/page",
    //     data: postData
    //   })
    //     .then(response => {
    //       this.tableData = response.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    cancel() {
      this.dialogUpdate = false;
      this.dialogVisible = false;
      this.emptyFormData();
    },
    emptyFormData() {
    //   this.$nextTick(()=>{
    // this.$refs.ruleForm.resetFields();})
      this.ruleForm = {
         prodCode: "",
          tuQryType: "",
          currency: "",
          reEvaluateFlag: "",
          reportFlag:'',
          dateCreated: "",
          dateUpdated:"",
          userCreated:"",
          userUpdated:"",
          remark: ""
      };
    },
    
    // addUser() {
    //   let postData = this.qs.stringify({
    //     userDate: this.ruleForm.userDate,
    //     userName: this.ruleForm.userName,
    //     userAddress: this.ruleForm.userAddress
    //   });
    //   this.axios({
    //     method: "post",
    //     url: "/insert",
    //     data: postData
    //   })
    //     .then(response => {
    //       this.axios
    //         .post("/page")
    //         .then(response => {
    //           this.tableData = response.data;
    //           this.currentPage = 1;
    //           this.$message({
    //             type: "success",
    //             message: "已添加!"
    //           });
    //         })
    //         .catch(error => {
    //           console.log(error);
    //         });
    //       this.getPages();
    //       this.dialogVisible = false;
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
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
    // onSearch() {
    //   let postData = this.qs.stringify({
    //     userName: this.search
    //   });
    //   this.axios({
    //     method: "post",
    //     url: "/ListByName",
    //     data: postData
    //   })
    //     .then(response => {
    //       this.tableData = response.data;
    //       this.disablePage = true;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // getPages() {
    //   this.axios
    //     .post("/rows")
    //     .then(response => {
    //       this.total = response.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // refreshData() {
    //   location.reload();
    // },
    // created() {
    // /*this.axios.get('static/user.json').then(response =>
    //         {
    //             this.tableData = response.data.tableData;
    //             this.total = response.data.tableData.length;
    //             // console.log(JSON.parse(JSON.stringify(response.data))['tableData'])
    //         });*/
    //   this.axios
    //   .post("/page")
    //   .then(response => {
    //     this.tableData = response.data;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    //   this.axios
    //   .post("/rows")
    //   .then(response => {
    //     this.total = response.data;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    //   }
  },
  computed:{
    tables() {
				const input = this.input
				if (input) {
          // console.log("input输入的搜索内容：" + this.input)
					return this.tableData.filter(data => {
						return Object.keys(data).some(key => {
							return String(data[key]).indexOf(input) > -1
						})
					})
				}
				return this.tableData
			}
  }
    }
</script>

<style scoped>
.search_no {
  width: 400px;
}
</style>