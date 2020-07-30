<template>
  <nav>
    <router-link class="item" to="/bookkeeping" active-class="selected">
      <Icon name="money" />
      <p>记账</p>
    </router-link>
    <router-link class="item" to="/labels" active-class="selected">
      <Icon name="label" />
      <p>标签</p>
    </router-link>
    <router-link class="item" to="/statistics" active-class="selected">
      <Icon name="statistics" />
      <p>统计</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
// 导航栏样式
nav {
  @extend %outerShadow;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  // router-link的样式
  > .item {
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // 图标样式
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    > p {
      color: #fff;
      font-weight: bold;
      background-color: rgb(18, 150, 219);
      padding-left: 3px;
      padding-right: 3px;
    }
  }
}
</style>