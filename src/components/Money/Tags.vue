<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="item in tagList "
        :key="item.id"
        @click="toggleTag(item)"
        :class="{selected:selectedTags.includes(item)}"
      >{{ item.name }}</li>
    </ul>
    <!-- 新增标签按钮 -->
    <div class="new">
      <button @click="createTagTest">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import TagHelper from "../../mixins/TagHelper";

@Component({
  mixins: [TagHelper],
})
export default class Tags extends mixins(TagHelper) {
  get tagList() {
    return this.$store.state.tagList;
  }
  // tagList 为标签名数组,Money.vue中为tags
  // tagList = store.fetchTags();

  // selectedTags为选中标签的数组，选中标签改变样式
  selectedTags: string[] = [];
  created() {
    this.$store.commit("fetchTags");
  }

  toggleTag(tag: string) {
    const tagIndex = this.selectedTags.indexOf(tag);
    if (tagIndex !== -1) {
      this.selectedTags.splice(tagIndex, 1);
    } else {
      // this.selectedTags.push(tag);
      this.selectedTags = [tag];
    }
    this.$emit("update:value", this.selectedTags);
  }

  createTagTest() {
    this.$store.commit("changeVisualizationTrue");
  }

  // 新增标签
  // addTag() {
  //   const tagName = window.prompt("请输入标签名");
  //   if (!tagName) {
  //     return window.alert("标签名不能为空");
  //   }
  //   this.$store.commit("addTag", tagName);
  //   // store.addTag(tagName);
  // }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/var.scss";

.tags {
  // box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  // background: white;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-end;
  // flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  box-sizing: content-box;
  max-height: calc(100% - 44px);
  overflow: auto;
  > .current {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    > li {
      background-color: lighten($red, 40%);
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: lighten($red, 10%);
        color: white;
        font-weight: 600;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 1;
  opacity: 0.75;
}
</style>