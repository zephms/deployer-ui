<script setup lang="ts">
import { ref } from "vue";
const FileId = ref("iidd");
const FilePath = ref("ffpp");
const enableEdit = () => {};
const save = () => {};
const textarea = ref("");
</script>
<template>
  FileId {{ FileId }} <br />
  FilePath {{ FilePath }} <br />
  <!-- <textarea name="" id="" cols="-1" rows="10"></textarea><br /> -->
  <el-input
    v-model="textarea"
    :rows="2"
    type="textarea"
    placeholder="Please input"
  />
  <el-button @click="enableEdit" text>enable edit</el-button>
  <el-button @click="save" text>save</el-button>
</template>

<style scoped></style>
