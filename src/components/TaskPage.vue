<script setup lang="ts">
import { EXC, INF } from "@/utils/http";
import type { Numeric } from "vant/lib/utils";
import { ref } from "vue";

const form = ref([
  {
    Done: false,
    Name: "board",
    Operate: "refresh",
    CreatedAt: "昨天",
  },
  {
    Done: false,
    Name: "board",
    Operate: "refresh",
    CreatedAt: "昨天",
  },
]);
const nowFocus = ref(-1);
const stdout = ref("ssttddoouutt");
const stderr = ref("ssttddeerrrr");
const log = ref("lloogg");

function follow(id: number) {
  nowFocus.value = id;
}

function loadTask() {
  INF("/task/recent", (d: any) => {
    let newForm: any[] = [];
    for (var i in d) {
      newForm.push({
        Done: d[i].done,
        Name: d[i].name,
        Operate: d[i].operate,
        CreatedAt: d[i].createdAt,
        Id: i,
      });
    }
    // for (var [k, v] of d) {
    //   newForm.push({
    //     Done: v.Done,
    //     Name: v.Name,
    //     Operate: v.Operate,
    //     CreatedAt: v.CreatedAt,
    //     Id: k,
    //   });
    // }
    form.value = newForm;
  });
}

function loadBulk() {
  console.log(nowFocus.value);
  let a: Numeric;
  a = nowFocus.value;
  EXC("/task/detail", { Id: a }, (d: any) => {
    stdout.value = d.out;
    stderr.value = d.err;
    log.value = d.log;
  });
}
</script>
<template>
  <h3>最近执行的Task</h3>
  <el-button @click="loadTask()" type="primary">刷新Task</el-button>
  <el-table :data="form" style="width: 100%">
    <el-table-column prop="Done" label="Done" width="60" />
    <el-table-column prop="Name" label="Name" width="180" />
    <el-table-column prop="Operate" label="Operate" width="180" />
    <el-table-column prop="CreatedAt" label="CreatedAt" width="180" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="follow(scope.row.Id)"
          >关注这个Task</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <br /><br />
  <h3>关注的Task, 当前关注{{ nowFocus }}</h3>
  <el-button @click="loadBulk()" type="primary">刷新下面这一堆</el-button
  ><br /><br />
  标准输出<br />
  <el-input
    v-model="stdout"
    :rows="6"
    type="textarea"
    placeholder="Please input"
  />
  标准错误<br />
  <el-input
    v-model="stderr"
    :rows="4"
    type="textarea"
    placeholder="Please input"
  />
  这个Task的日志<br />
  <el-input
    v-model="log"
    :rows="10"
    type="textarea"
    placeholder="Please input"
  />
</template>
<style scoped></style>
