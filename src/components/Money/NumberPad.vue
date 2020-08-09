<template>
  <div class="numberPad">
    <div v-if="hasPlus || hasSubstract" class="output">
      <div class="input-number">{{output}}</div>
      <div class="calculate-number">{{ calculateNum }}</div>
    </div>
    <div v-else class="output">{{ output }}</div>

    <div class="buttons">
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="remove">
        <svg class="icon">
          <use xlink:href="#delete" />
        </svg>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">-</button>
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">0</button>
      <button @click="inputContent">.</button>
      <button @click="clear">清空</button>
      <button class="ok" @click="determine">确定</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  // 初始输出值为0
  output = "0";
  calculateNum = 0;
  get hasPlus() {
    return this.output.includes("+");
  }
  get hasSubstract() {
    return this.output.includes("-");
  }

  // 点击数字按钮与. 则执行inputContent
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;
    // 输入长度最大为16
    // if (this.output.length === 16) {
    //   return;
    // }
    // 小数点后最多有2位
    // if (this.output.toString().split(".")[1].length === 3) {
    //   return;
    // }

    // 如果输出是0，则下一个输出为输入的值；只能有一个.；
    if (this.output === "0" && "0123456789".includes(input)) {
      this.output = input;
    } else if (this.output.includes(".") && !this.hasPlus && input === ".") {
      return;
    } else if (
      this.output.includes(".") &&
      this.output.toString().split(".")[1].length === 2 &&
      !this.hasPlus &&
      input !== "+"
    ) {
      return;
    } else {
      this.output += input;
    }
    // console.log(input);
    // console.log(this.output);

    // 如果存在+或者-，则用另一个显示面板
    if (this.hasPlus && this.hasSubstract) {
      const calculateArr = this.output.split("+");
      for (let i = 0; i < calculateArr.length; i++) {
        if (calculateArr[i].includes("-")) {
          calculateArr[i] = calculateArr[i]
            .split("-")
            .map((item) => Number(item))
            .reduce((acc, cur) => acc - cur)
            .toString();
        }
      }
      this.calculateNum = calculateArr
        .map((item) => Number(item))
        .reduce((acc, cur) => acc + cur);
      // 只有+
    } else if (this.hasPlus && !this.hasSubstract) {
      const calculateArr = this.output.split("+").map((item) => Number(item));
      this.calculateNum = calculateArr.reduce((acc, cur) => acc + cur);
      // 只有-
    } else if (!this.hasPlus && this.hasSubstract) {
      const calculateArr = this.output.split("-").map((item) => Number(item));
      this.calculateNum = calculateArr.reduce((acc, cur) => acc - cur);
    }
  }
  // 删除output最后一位数字
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
    // 如果存在+或者-，则用另一个显示面板
    if (this.hasPlus && this.hasSubstract) {
      const calculateArr = this.output.split("+");
      for (let i = 0; i < calculateArr.length; i++) {
        if (calculateArr[i].includes("-")) {
          calculateArr[i] = calculateArr[i]
            .split("-")
            .map((item) => Number(item))
            .reduce((acc, cur) => acc - cur)
            .toString();
        }
      }
      this.calculateNum = calculateArr
        .map((item) => Number(item))
        .reduce((acc, cur) => acc + cur);
      // 只有+
    } else if (this.hasPlus && !this.hasSubstract) {
      const calculateArr = this.output.split("+").map((item) => Number(item));
      this.calculateNum = calculateArr.reduce((acc, cur) => acc + cur);
      // 只有-
    } else if (!this.hasPlus && this.hasSubstract) {
      const calculateArr = this.output.split("-").map((item) => Number(item));
      this.calculateNum = calculateArr.reduce((acc, cur) => acc - cur);
    }
  }
  // 清空output
  clear() {
    this.output = "0";
    this.calculateNum = 0;
  }
  // 点击ok确定
  determine() {
    let finalAMount = "";
    this.hasPlus
      ? (finalAMount = this.calculateNum.toString())
      : (finalAMount = this.output);
    this.$emit("update:value", finalAMount);
    this.$emit("submit", finalAMount);
    // 点击ok后恢复初始值
    this.output = "0";
    this.calculateNum = 0;
    this.$router.replace("/home");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/var.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    // color: lighten($red, 15%);
    > .input-number {
      font-size: 12px;
      padding-bottom: 0;
    }
    > .calculate-number {
      font-size: 24px;
    }
  }
  .buttons {
    @extend %clearFix;
    > button {
      color: #666;
      font-size: 20px;
      width: 25%;
      height: 60px;
      float: left;
      background: transparent;
      border: none;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      &.ok {
        float: right;
        color: white;
        background-color: lighten($red, 10%);
      }
      $bg: #e7f4fd;
    }
  }
  .icon {
    width: 1.6em;
    height: 1.6em;
    vertical-align: -0.4em;
    fill: currentColor;
    overflow: hidden;
    color: #666;
  }
}
</style>