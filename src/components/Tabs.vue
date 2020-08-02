<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
    <li
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="liClass(item)"
      @click="select(item)"
    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: DataSourceItem[];

  @Prop(String) readonly value!: string;

  @Prop(String) classPrefix?: string;

  @Prop({ type: String, default: "64px" }) height!: string;

  liClass(item: DataSourceItem) {
    return {
      // 当传入classPrefix，有对应的class
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/var.scss";

.tabs {
  // background: $gray-9;
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}
</style>