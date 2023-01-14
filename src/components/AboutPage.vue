<script setup lang="ts">
import { INF } from "../utils/http";
import { ref } from "vue";
const version = ref("-");
function loadVersion() {
  INF("/version", (d) => {
    version.value = d.Msg;
  });
}
</script>
<template>
  当前版本{{ version }} <br />
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <el-button @click="loadVersion" text>按钮</el-button>
  </div>
</template>
<style scoped>
el-button {
  margin: 10px auto;
}
</style>
