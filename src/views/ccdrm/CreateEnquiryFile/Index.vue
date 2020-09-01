<template>
  <el-card class="box-card">
    <el-row v-for="option in options" :key="option.name">
      <el-button class="text item" @click="handleClick(option.value)">
       {{ option.name }}
      </el-button>
    </el-row>
</el-card>
</template>

<script>
export default {
  name: 'CreateEnquiryFile',
  data(){
    return {
      options:[
      {name:'Set Next Full Set Batch Date',},
      {name:'Create Month End Enquiry File',},
      {name:'Create Full Set Enquiry File(Selected Records Only)',},
      {name:'Create Month End Enquiry File(Selected Records Only)',},
      {name:'Select Customer',},
      {name:'Create Credit Card Cash Installment Enquiry File',}]
    }
  },
  methods:{
    handleClick(val){

    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>