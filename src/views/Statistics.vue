<template>
  <div>
    <Layout>
      <!-- <template v-slot:header>
        <nav-bar></nav-bar>
      </template>-->
      <!-- 标签页：收入支出切换 -->
      <div class="tab-wrapper">
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
      </div>
      <div class="chart-wrapper" ref="chartWrapper">
        <Chart class="chart" :options="chartOptions" />
      </div>

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
      <div v-else>小主还没有收入呢~</div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "../components/Chart.vue";
import * as _ from "lodash";
import day from "dayjs";
// import NavBar from "../components/NavBar.vue";

@Component({
  components: { Tabs, Chart },
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((item) => item.name).join("，");
  }

  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    // scrollWidth为最大滚动宽度
    div.scrollLeft = div.scrollWidth;
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      // console.log("hi");
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  get chartKeyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      // this.recordList = [{date:7.3, value:100}, {date:7.2, value:200}]
      const dateString = day(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.groupedList, {
        title: dateString,
      });
      array.push({
        date: dateString,
        value: found ? found.total : 0,
      });
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get chartOptions() {
    const recordDates = this.chartKeyValueList.map((item) => item.date);
    const recordValues = this.chartKeyValueList.map((item) => item.value);
    return {
      // 去掉echarts左右两边的空白
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: "category",
        data: recordDates,
        // x轴的刻度与数值对齐
        axisTick: { alignWithLabel: true },
        // x轴的颜色
        axisLine: { lineStyle: { color: "#666" } },
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          symbol: "circle",
          symbolSize: 12,
          itemStyle: {
            borderWidth: 1,
            color: "#1296db",
            borderColor: "#1296db",
          },
          data: recordValues,
          type: "line",
        },
      ],
      tooltip: {
        show: true,
        triggerOn: "click",
        position: "top",
        formatter: "{c}",
      },
    };
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
      .filter((r) => r.type === this.type)
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
        // console.log(sum);
        // console.log(item);
        return sum + item.amount;
      }, 0);
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  type = "-";
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/var.scss";
// ::v-deep {
//   .type-tabs-item {
//     background: #eeeef0;
//     &.selected {
//       background: white;
//       &::after {
//         display: none;
//       }
//     }
//   }
//   .interval-tabs-item {
//     height: 48px;
//   }
// }
// .type-tabs-item {
//   // background: $gray-9;
//   height: $tab-item-hight;
//   font-size: $tab-content-font-size;
//   &.selected {
//     border: 1px solid red;
//     border-radius: 0.3 * $tab-item-hight;
//     background: white;
//     &::after {
//       display: none;
//     }
//   }
// }
// .interval-tabs-item {
//   height: 48px;
// }
.tab-wrapper {
  width: 40%;
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
.chart {
  width: 430%;
  height: 30vh;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>