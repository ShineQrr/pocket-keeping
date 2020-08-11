<template>
  <div class="numberPad">
    <!-- 当存在+、-，展示具体面板 -->
    <div v-if="hasPlus || hasSubstract" class="output">
      <div class="input-number">{{ output }}</div>
      <div class="calculate-number">{{ calculateNum }}</div>
    </div>

    <!-- 不存在+、-，只展示数值 -->
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
import { mixins } from "vue-class-component";
import NumberValidation from "@/mixins/NumberValidation";

@Component({
  mixins: [NumberValidation],
})
export default class NumberPad extends mixins(NumberValidation) {
  // 初始输出值为0
  output = "0";
  calculateNum = 0;
  get hasPlus() {
    return this.output.includes("+");
  }
  get hasSubstract() {
    return this.output.includes("-");
  }

  // 当存在+-时候，验证最后一个数值 toValiatedOutput
  get toValiatedOutput() {
    return this.output.split(/[+-]/)[this.output.split(/[+-]/).length - 1];
  }

  // 点击数字按钮与. 则执行inputContent
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;

    // 输入长度最大为16
    // if (this.output.length === 16) {
    //   return;
    // }

    // 不存在+ -的判断
    // 如果输出是0，则下一个输出为输入的值；
    if (this.output === "0" && "0123456789".includes(input)) {
      this.output = input;
    } else if (
      // output只能有一个小数点，且小数点后只能有2位
      !this.hasPlus &&
      !this.hasSubstract &&
      input !== "+" &&
      input !== "-" &&
      this.validateDecimalPoint(this.output, input)
    ) {
      return;
    } else if (
      this.hasPlus &&
      this.hasSubstract &&
      input !== "+" &&
      input !== "-"
    ) {
      if (this.validateDecimalPoint(this.toValiatedOutput, input)) {
        return;
      } else {
        this.output += input;
      }
    } else if (this.hasPlus && input !== "+" && input !== "-") {
      if (this.validateDecimalPoint(this.toValiatedOutput, input)) {
        return;
      } else {
        this.output += input;
      }
    } else if (this.hasSubstract && input !== "+" && input !== "-") {
      if (this.validateDecimalPoint(this.toValiatedOutput, input)) {
        return;
      } else {
        this.output += input;
      }
    } else {
      // 其他情况，输出只是简单拼接
      this.output += input;
    }

    // 如果存在+或者-，则用另一个显示面板
    if (this.hasPlus && this.hasSubstract) {
      const calculateArr = this.output.split("+");
      for (let i = 0; i < calculateArr.length; i++) {
        if (calculateArr[i].includes("-")) {
          calculateArr[i] = calculateArr[i]
            .split("-")
            .map((item) => Number(item))
            .reduce((acc, cur) => (acc * 100 - cur * 100) / 100)
            .toString();
        }
      }
      this.calculateNum = calculateArr
        .map((item) => Number(item))
        .reduce((acc, cur) => (acc * 100 + cur * 100) / 100);
      // 只有+
    } else if (this.hasPlus && !this.hasSubstract) {
      const calculateArr = this.output.split("+").map((item) => Number(item));
      this.calculateNum = calculateArr.reduce(
        (acc, cur) => (acc * 100 + cur * 100) / 100
      );
      // 只有-
    } else if (!this.hasPlus && this.hasSubstract) {
      const calculateArr = this.output.split("-").map((item) => Number(item));
      this.calculateNum = calculateArr.reduce(
        (acc, cur) => (acc * 100 - cur * 100) / 100
      );
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
            .reduce((acc, cur) => (acc * 100 - cur * 100) / 100)
            .toString();
        }
      }
      this.calculateNum = calculateArr
        .map((item) => Number(item))
        .reduce((acc, cur) => (acc * 100 + cur * 100) / 100);
      // 只有+
    } else if (this.hasPlus && !this.hasSubstract) {
      const calculateArr = this.output.split("+").map((item) => Number(item));
      this.calculateNum = calculateArr.reduce(
        (acc, cur) => (acc * 100 + cur * 100) / 100
      );
      // 只有-
    } else if (!this.hasPlus && this.hasSubstract) {
      const calculateArr = this.output.split("-").map((item) => Number(item));
      this.calculateNum = calculateArr.reduce(
        (acc, cur) => (acc * 100 - cur * 100) / 100
      );
    }
  }
  // 清空output
  clear() {
    this.output = "0";
    this.calculateNum = 0;
  }
  // 点击ok确定,传递finalAmount
  determine() {
    let finalAmount = "";
    this.hasPlus
      ? (finalAmount = this.calculateNum.toString())
      : (finalAmount = this.output);
    if (finalAmount === "0") {
      return window.alert("请输入金额");
    }
    this.$emit("update:value", finalAmount);
    this.$emit("submit", finalAmount);
    // 点击ok后恢复初始值
    this.output = "0";
    this.calculateNum = 0;
    // this.$router.replace("/home");
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