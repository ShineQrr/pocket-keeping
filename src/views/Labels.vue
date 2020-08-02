<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link :to="`/labels/edit/${tag.id}`" class="tag" v-for="tag in tags" :key="tag.id">
          <span>{{ tag.name }}</span>
          <Icon name="arrow-right" />
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <CustomButton @click="createTag">新建标签</CustomButton>
      </div>
    </Layout>
    <div v-show="$store.state.dialogAddVisible" class="mask"></div>
    <!-- 新增标签弹框 -->
    <dialog-add></dialog-add>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import CustomButton from "../components/CustomButton.vue";
import { mixins } from "vue-class-component";
import TagHelper from "../mixins/TagHelper";
import DialogAdd from "../components/dialogs/DialogAdd.vue";

@Component({
  components: { CustomButton, DialogAdd },
  mixins: [TagHelper],
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      margin-right: 16px;
    }
  }
}
.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
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