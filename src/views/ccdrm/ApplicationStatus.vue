<template>
  <el-card class="box-card">
  <div v-for="item in appStatus" :key="item.label" class="text item">
    {{item.label}} : {{item.value}}
  </div>
</el-card>
</template>

<script>
export default {
  name: 'ApplicationStatus',
  data(){
    return {
      appStatus:[
        {label:'Current Batch Data Date', value: currBatchDataDate},
        {label:'Last Month End Data Date', value: this.lastMonthEndDataDate},
        {label:'Monthly Batch is Running', value: this.monthBatchRunFlag},
        {label:'Daily Batch is Running', value: this.dailyBatchRunFlag},
        {label:'Exporting TU Enquiry File', value: this.expTUEnqFileFlag},
        {label:'Import TU Response File', value: this.impTUResFileFlag},
      ],
      currBatchDataDate: '2014-12-31',
      lastMonthEndDataDate: '2014-12-31',
      monthBatchRunFlag: 'No',
      dailyBatchRunFlag: 'No',
      expTUEnqFileFlag: 'No',
      impTUResFileFlag: 'Yes(Processing)'
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