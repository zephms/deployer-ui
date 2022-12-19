<script setup lang="ts">
function Test(params: any) {
  alert(params);
}
</script>
<template>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <el-button @click="Test('1')" text>按钮</el-button>
  </div>
</template>
<style scoped></style>
