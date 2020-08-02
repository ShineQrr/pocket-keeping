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
    <div class="buttons-wrapper">
      <button @click="cancel">取消</button>
      <button @click="determine" class="dialog-button-content">确定</button>
    </div>
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
    box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.1);
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

  .buttons-wrapper {
    display: flex;
    justify-content: space-around;
    button {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
      width: 50%;
      background-color: transparent;
      padding: 16px 0;
      cursor: pointer;
      border: none;
      &:active {
        color: $blue;
        background-color: $gray-1;
      }
    }
  }
}
</style>