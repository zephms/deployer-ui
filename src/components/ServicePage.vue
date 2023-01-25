<script setup lang="ts">
import { ref } from "vue";
import { INF, EXC } from "../utils/http";
// defineProps<{
//   form: {
//     Name: string;
//     Op: string[];
//   }[];
// }>();
import { ElMessage, ElMessageBox } from "element-plus";

function operate(name: string, op: string) {
  let say = "你正在操作" + name + "服务, 执行" + op + "操作, 是否执行?";
  ElMessageBox.confirm(say, "给我注意点", {
    confirmButtonText: "执行吧",
    cancelButtonText: "放弃放弃",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "已经交给了服务器",
      });
      EXC(
        "/operate",
        {
          Name: name,
          Op: op,
        },
        function (d) {
          ElMessage({
            message: d.Msg,
            type: "success",
          });
        }
      );
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已放弃",
      });
    });
}
const form = ref([
  {
    Name: "aaa",
    Op: ["a", "b", "c"],
  },
  {
    Name: "bbb",
    Op: ["1", "2", "3"],
  },
]);

function loadFormData() {
  INF("/service/get", (d: any) => {
    form.value = d;
  });
}

function refreshData() {
  INF("/service/refresh", (d: any) => {});
  loadFormData();
}

const log = ref("service log");
function loadServiceLog() {
  EXC("/service/log", { Len: 10 }, (d: any) => {
    log.value = d.Msg;
  });
}
</script>
<template>
  <el-button @click="loadFormData()" type="primary">get service</el-button>
  <el-button @click="refreshData()" type="primary"
    >reload and get service</el-button
  >
  <br />
  <el-table :data="form" style="width: 100%">
    <el-table-column prop="Name" label="Name" width="180" />
    <el-table-column prop="Op" label="Operation" width="180">
      <template #default="scope">
        <el-button
          @click="operate(scope.row.Name, o)"
          :key="o"
          v-for="o in scope.row.Op"
          type="primary"
          plain
          >{{ o }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <br /><br />
  <h3>Task</h3>

  <br /><br />
  <h3>服务日志</h3>
  <el-button @click="loadServiceLog()" type="primary">刷新log</el-button>
  <br /><br />
  <el-input
    v-model="log"
    :rows="10"
    type="textarea"
    placeholder="Please input"
  />
</template>
<style scoped>
el-button {
  margin: 10px auto;
}
</style>
