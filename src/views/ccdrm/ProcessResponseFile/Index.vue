<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key" >
        <div :is='activeName'></div>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import ProcessResponseIndex from './ProcessResponseIndex'
import ResponseDetail from './ResponseDetail'
import ResponseSummary from './ResponseSummary'

export default {
  name: 'ProcessResponseFileIndex',
  components: { 
    ProcessResponseIndex, 
    ResponseDetail, 
    ResponseSummary },
  data() {
    return {
      tabMapOptions: [
        { label: 'Process Response', key: 'ProcessResponseIndex' },
        { label: 'Response Summary', key: 'ResponseDetail' },
        { label: 'Response Detail', key: 'ResponseSummary' },
      ],
      activeName: 'ProcessResponseIndex',
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    console.log(tab)
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
        this.activeName = tab
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
