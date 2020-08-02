<template>
  <!-- 底部导航栏 -->
  <div class="tabbar">
    <router-link class="tabbar-item" to="/home" active-class="selected">
      <Icon :name="home" class="icon" />
      <p>首页</p>
    </router-link>
    <router-link class="tabbar-item" to="/bookkeeping" active-class="selected">
      <Icon :name="money" class="icon" />
      <p>记账</p>
    </router-link>
    <router-link class="tabbar-item" to="/labels" active-class="selected">
      <Icon :name="label" class="icon" />
      <p>标签</p>
    </router-link>
    <router-link class="tabbar-item" to="/statistics" active-class="selected">
      <Icon :name="statistics" class="icon" />
      <p>统计</p>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default class Nav extends Vue {
  get home() {
    return this.$route.path === "/home" ? "home_selected" : "home";
  }
  get money() {
    return this.$route.path === "/bookkeeping" ? "money_selected" : "money";
  }
  get label() {
    return this.$route.path === "/labels" ? "label_selected" : "label";
  }
  //TODO
  get statistics() {
    return this.$route.path === "/statistics" ? "statistics" : "statistics";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/var.scss";
// 底部导航栏样式
.tabbar {
  @extend %outerShadow;
  display: flex;
  // justify-content: space-around;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  // router-link的样式
  > .tabbar-item {
    flex: 1;
    padding-bottom: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $gray-6;
    // 图标样式
    .icon {
      width: 24px;
      height: 24px;
      margin: 4px 0 2px;
    }
  }
  > .tabbar-item.selected {
    color: $tabbar-item-selected-color;
    > .icon {
      animation: choose 0.5s ease;
    }
  }

  @keyframes choose {
    0% {
      transform: scale(0.7, 0.7);
    }

    100% {
      transform: scale(1, 1);
    }
  }
}
</style>