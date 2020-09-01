<template>
  <el-container style="height:100%" >
    <el-aside height="100%" width="200px" style="background-color: #545c64">
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router unique-opened>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>TU-TUDF
          </template>
          <el-menu-item-group>
            <el-menu-item index="/enquiry">enquiry</el-menu-item>
            <el-menu-item index="/days-record">31-days record</el-menu-item>
            <el-menu-item index="/delete-record">delete record</el-menu-item>
            <el-menu-item index="/update-record">update record</el-menu-item>
            <el-menu-item index="/record-selection">record selection</el-menu-item>
            <el-menu-item index="/file-generation">file generation</el-menu-item>
            <el-menu-item index="/file-download">file download</el-menu-item>
            <el-menu-item index="/job-status">job status</el-menu-item>
            <el-menu-item index="/report">report</el-menu-item>
            <el-menu-item index="/amend-report">amend report</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>CCRA
          </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>CCDRM
          </template>
          <el-menu-item-group>        
            <el-menu-item index="/ccdrm/tu-enquiry-summary">TU Enquiry Summary</el-menu-item>
            <el-menu-item index="/ccdrm/create-enquiry-file">Create Enquiry File</el-menu-item>
            <el-menu-item index="/ccdrm/application-status">Application Status</el-menu-item>
            <el-menu-item index="/ccdrm/search-customer">Search Customer</el-menu-item>
            <el-menu-item index="/ccdrm/process-response-file">Process Response File</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>CRIS
          </template>
          <el-menu-item-group>
            <el-menu-item index="/tuusermgmt">TU用户管理</el-menu-item>
            <el-menu-item index="/paramgmt">参数管理</el-menu-item>
            <el-menu-item index="/mpprodacctype">产品编码与查询类型管理</el-menu-item>
            <el-menu-item index="/tueflist">TU查询清单</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group v-if title="分组2">
          </el-menu-item-group> -->
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align:right, font-size: 12px">
        <slot name="header"></slot>
        <!-- <switch-roles @change="handleRolesChange" /> -->
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view class="homeRouterView" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import permission from '@/directive/permission/index.js' // 权限判断指令
// import checkPermission from '@/utils/permission'
// import SwitchRoles from '@/components/SwitchRoles'

export default {
  // components: { SwitchRoles },
  // directives: { permission },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(1).fill(item),
      key: 1
    };
  },
  // methods: {
  //   checkPermission,
  //   handleRolesChange() {
  //     this.key++
  //   }
  // }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>