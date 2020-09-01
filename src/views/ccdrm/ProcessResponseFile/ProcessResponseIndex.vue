<template>
<div>
  <el-button>Process Response File</el-button>
  <el-button>Split Report</el-button>
</div>
</template>

<script>
import ProcessResponseFile from './ProcessResponseFile'
import SplitReport from './SplitReport'

export default {
  name: 'ProcessResponseIndex',
  components: [ProcessResponseFile, SplitReport]
}
</script>