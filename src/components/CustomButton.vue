<template>
  <button class="customButton" @click="$emit('click',$event)">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class CustomButton extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/var.scss";
.customButton {
  // background: lighten($button-background-color, 5%);
  background: darken($button-background-color, 2%);
  border: 2px solid $button-background-color;
  font-size: $button-font-size;
  // font-weight: bold;
  border-radius: 12px;
  color: white;
  // border: none;
  height: 42px;
  // line-height: 40px;
  padding: 0px 28px;
  cursor: pointer;
}
</style>