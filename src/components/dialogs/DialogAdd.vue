<template>
  <div v-show="$store.state.dialogAddVisible" class="dialog-wrapper">
    <div class="dialog-header">
      <span class="title">
        <svg class="icon">
          <use xlink:href="#label2" />
        </svg>
        新增标签
      </span>
    </div>
    <label class="dialog-content">
      <span class="tag-label">标签名:</span>
      <input type="text" v-model="inputTagName" />
    </label>
    <!-- <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
      <button
        @click="cancel"
        class="van-button van-button--default van-button--large van-dialog__cancel"
      >
        <div class="van-button__content">
          <span class="van-button__text" @click="cancel">取消</span>
        </div>
      </button>
      <button
        @click="determine"
        class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left"
      >
        <div class="van-button__content">
          <span class="van-button__text">确定</span>
        </div>
      </button>
    </div>-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class DialogAdd extends Vue {
  inputTagName = "";
  cancel() {
    this.$store.commit("changeVisualization");
    this.inputTagName = "";
  }
  determine() {
    if (!this.inputTagName) {
      window.alert("请输入标签名!");
      // return Toast("请输入标签名");
    } else {
      this.$store.commit("addTag", this.inputTagName);
      this.$store.commit("changeVisualization");
      this.inputTagName = "";
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/var.scss";

.dialog-wrapper {
  z-index: 10;
  position: fixed;
  top: 45%;
  left: 50%;
  width: $dialog-width;
  overflow: hidden;
  font-size: $dialog-font-size;
  background-color: $dialog-background-color;
  border-radius: $dialog-border-radius;
  transform: translate(-50%, -50%);
  backface-visibility: hidden; // avoid blurry text after scale animation
  transition: $dialog-transition;
  transition-property: transform, opacity;

  @media (max-width: 321px) {
    width: $dialog-small-screen-width;
  }

  .dialog-header {
    padding-top: $padding-lg;
    padding-bottom: 0.6 * $padding-lg;
    font-weight: 550;
    line-height: 24px;
    text-align: center;
  }

  .icon {
    width: 1.6em;
    height: 1.6em;
    vertical-align: -0.4em;
    fill: currentColor;
    overflow: hidden;
  }

  .dialog-content {
    // border: 1px solid red;
    display: block;
    font-size: 16px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    .tag-label {
      padding: 0 24px;
    }

    input {
      //   height: 40px;
      flex-grow: 1;
      background-color: transparent;
      border: none;
      padding: 14px 16px 14px 0;
    }
  }
}
</style>