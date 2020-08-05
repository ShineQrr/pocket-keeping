<template>
  <Layout>
    <!-- 顶部标题栏 -->
    <template v-slot:header>
      <nav-header class="home-nav-header">
        <template v-slot:center>momy记账</template>
      </nav-header>
    </template>

    <div class="home-content-wrapper">
      <div class="home-content">
        <p class="content-date">{{ today }}</p>
        <p class="content-cost">支出 ￥{{ currentMonthCost}}</p>
        <p>收入 ￥{{ currentMonthIncome }}</p>
        <div class="content-button-wrapper">
          <CustomButton @click="goKeeping">记一笔</CustomButton>
        </div>
      </div>
    </div>

    <div class="hide-bar" @click="changeListDisplay">
      <span>{{ isListShow? '隐藏' : '显示'}}近3个月账单</span>
      <Icon :name="hideBarIconName" class="hide-bar-icon" />
    </div>

    <div v-show="isListShow" class="home-bill-wrapper">
      <!-- 标收入支出切换 -->
      <div class="tab-wrapper">
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
      </div>

      <div class="home-list-wrapper">
        <ol v-if="groupedList.length>0">
          <li v-for="(group, index) in groupedList" :key="index">
            <h3 class="title">
              {{beautify(group.title)}}
              <span>￥{{group.total}}</span>
            </h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="record">
                <span>{{tagString(item.tags)}}</span>
                <span class="notes">{{item.notes}}</span>
                <span>￥{{item.amount}}</span>
              </li>
            </ol>
          </li>
        </ol>
        <div v-else>暂时还没有记录..快去记一笔吧~</div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import * as _ from "lodash";
import day from "dayjs";
import NavHeader from "../../components/NavHeader.vue";
import CustomButton from "../../components/CustomButton.vue";
import Icon from "@/components/Icon.vue";

@Component({
  components: { Tabs, NavHeader, CustomButton, Icon },
})
export default class Home extends Vue {
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  recordTypeList = recordTypeList;
  isListShow = true;
  hideBarIconName = "arrow-up";

  changeListDisplay() {
    this.isListShow = !this.isListShow;
    this.isListShow
      ? (this.hideBarIconName = "arrow-up")
      : (this.hideBarIconName = "arrow-down");
  }

  get today() {
    return dayjs().format("YYYY年M月");
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((item) => item.name).join("，");
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter(
        (r) =>
          r.type === this.type &&
          dayjs(r.createdAt).month() >= dayjs().month() - 2
      )
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });

    return result;
  }

  // 获取本月支出
  get currentMonthCost() {
    const currentMonthCostList = this.recordList.filter(
      (item) =>
        item.type == "-" && dayjs(item.createdAt).month() == dayjs().month()
    );
    const totalCost = currentMonthCostList.reduce((sum, item) => {
      return sum + item.amount;
    }, 0);
    return totalCost;
  }

  // 获取本月收入
  get currentMonthIncome() {
    const currentMonthCostList = this.recordList.filter(
      (item) =>
        item.type == "+" && dayjs(item.createdAt).month() == dayjs().month()
    );
    const totalIncome = currentMonthCostList.reduce((sum, item) => {
      return sum + item.amount;
    }, 0);
    return totalIncome;
  }

  goKeeping() {
    this.$router.replace("/bookkeeping");
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/var.scss";
@import "~@/assets/style/helper.scss";

.home-nav-header {
  color: $nav-bar-text-color;
  font-size: $nav-bar-title-font-size;
  background-color: $nav-bar-background-color;
}
.home-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72%;
  padding-top: calc(15%);
  text-align: center;
  font-weight: 600;
  font-size: $font-size-md;
  color: $text-color;
  .content-date {
    color: $red;
    font-size: $font-size-lg;
  }
  .content-cost {
    color: $red;
    font-size: 20px;
  }
}
// 隐藏近日账单选项
.hide-bar {
  text-align: center;
  color: $text-color;
  margin-bottom: 32px;
  font-size: $font-size-md;
  .hide-bar-icon {
    margin-left: 4px;
  }
}

.home-bill-wrapper {
  .home-list-wrapper {
    padding-top: 8px;
  }
}
.tab-wrapper {
  width: 35%;
  margin: 0 auto;
  background-color: $gray-9;
  border-radius: 0.3 * $tab-item-hight;
}
::v-deep {
  .type-tabs-item {
    // background: $gray-9;
    height: $tab-item-hight;
    font-size: $tab-content-font-size;
    font-weight: 500;
    &.selected {
      box-sizing: border-box;
      border: 3px solid $gray-9;
      border-radius: 0.3 * $tab-item-hight;
      font-weight: 700;
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.content-button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>