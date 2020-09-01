<template>
<div>
    <h2>TU File Generation Status</h2>
    <h3>{{jobStatus}}</h3>
    <el-button
      class="el-icon-refresh"
      type="text"
      @click="refreshStatus">刷新
    </el-button>
</div>
</template>

<script>
  export default {
    name:'FileDown',
    data() {
      return {
        jobStatus: 'Job Idle!'
      }
    },
    methods: {
      refreshStatus() {
        // location.reload();
      },
    }
  }
</script>

<style>
  .el-input {
    width: 200px;
  }
</style>