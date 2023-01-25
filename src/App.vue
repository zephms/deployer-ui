<script setup lang="ts">
import ServicePage from "./components/ServicePage.vue";
import TaskPage from "./components/TaskPage.vue";
import AboutPage from "./components/AboutPage.vue";
import EditorPage from "./components/EditorPage.vue";
</script>

<template>
  <el-tabs tab-position="left" class="demo-tabs">
    <el-tab-pane label="Service"><ServicePage /></el-tab-pane>
    <el-tab-pane label="Task"><TaskPage /></el-tab-pane>
    <el-tab-pane label="Editor"><EditorPage /></el-tab-pane>
    <el-tab-pane label="About"><AboutPage /></el-tab-pane>
  </el-tabs>
</template>

<style scoped>
body {
  flex: none;
}
</style>
