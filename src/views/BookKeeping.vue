<template>
  <Layout class-prefix="layout">
    <!-- 顶部标签 -->
    <div class="tags-wrapper">
      <Tags @update:value="record.tags = $event"></Tags>
    </div>

    <!-- 备注栏 -->
    <div class="notes-wrapper">
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes"></FormItem>
    </div>
    <div class="createdAt">
      <FormItem field-name="日期" type="date" placeholder="在这里输入日期" :value.sync="record.createdAt" />
    </div>
    <!-- 支出/收入 -->
    <div class="tab-wrapper">
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="record.type" />
    </div>
    <!-- 数字面板 -->
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"></NumberPad>
    <!-- 新增标签弹框 -->
    <dialog-add></dialog-add>
    <div v-show="$store.state.dialogAddVisible" class="mask"></div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import DialogAdd from "../components/dialogs/DialogAdd.vue";

@Component({
  components: { Tabs, NumberPad, Types, Tags, FormItem, DialogAdd },
})
export default class BookKeeping extends Vue {
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };
  // recordList = window.recordList;
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  // 点击ok,触发saveRecord,将当前数据存储到localStorage中
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      window.alert("请至少选择一个标签");
      return;
    }
    // store.createRecord(this.record);
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError == null) {
      window.alert("已保存");
      this.record.notes = "";
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/var.scss";

::v-deep .layout-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
// .tabs-wrapper {
//   height: 48px;
// }
// .tags-wrapper {
//   flex: 1;
// }
.notes-wrapper {
  padding: 12px 0;
}
.tab-wrapper {
  width: 35%;
  margin: 0 auto;
  background-color: $gray-9;
  border-radius: 0.3 * $tab-item-hight;
}
::v-deep {
  .type-tabs-item {
    // background: $gray-9;
    height: $tab-item-hight;
    font-size: $tab-content-font-size;
    font-weight: 500;
    &.selected {
      box-sizing: border-box;
      border: 3px solid $gray-9;
      border-radius: 0.3 * $tab-item-hight;
      font-weight: 700;
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
</style>