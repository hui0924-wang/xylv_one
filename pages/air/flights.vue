<template>
  <div class="flights">
    <!-- 正文 开始 -->
    <div class="flights_main">
      <!-- 1 筛选模块 开始 -->
      <FlightsFilter
        v-if="flightsData.flights.length"
        :info="flightsData.info"
        :options="flightsData.options"
        @filterChange="filterChange"
      />
      <!-- 1 筛选模块 结束 -->

      <!-- 2 表单的头部 开始 -->
      <FlightsHead />
      <!-- 2 表单的头部 结束 -->

      <!-- 3 机票列表 开始 -->
      <div class="air_list">
        <FlightsItem
          v-for="(item) in currentFlights"
          :key="item.id"
          :data="item"
        />
      </div>
      <!-- 3 机票列表 结束 -->

      <!-- 4 分页组件 开始 -->
      <div>
        <!-- 
          :current-page  当前的页码 
          :page-sizes= 页容量 数组 
          :page-size  当前 页容量 
          @size-change 页容量改变事件 
          @current-change 页码改变事件 
         -->
        <el-pagination
          :current-page="page.currentPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
      <!-- 4 分页组件 结束 -->
    </div>
    <!-- 正文 结束 -->

    <!-- 侧边栏 开始 -->
    <div class="flights_aside">2</div>
    <!-- 侧边栏 结束 -->

  </div>
</template>

<script>
import FlightsFilter from "@/components/air/FlightsFilter";
import FlightsHead from "@/components/air/FlightsHead";
import FlightsItem from "@/components/air/FlightsItem";
export default {
  components: {
    FlightsFilter,
    FlightsHead,
    FlightsItem
  },
  data() {
    return {
      flightsData: {
        // 机票列表数组
        flights: [],
        info: {},
        options: {}
      },

      // 筛选后的数据源 第一次加载页面的时候  值 === 总的数据源
      filterList: [],

      // 被分页后的 机票列表
      currentFlights: [],

      // 分页对象
      page: {
        // 当前页码
        currentPage: 1,
        // 页容量数组
        pageSizes: [1, 2, 5, 10, 20, 100],
        // 页容量
        pageSize: 10,
        // 总条数
        total: 1
      }
    };
  },
  methods: {
    // 1 获取机票数据
    getList(isFirst) {
      if (isFirst) {
        let form = this.$route.query;
        this.$axios.get("/airs", { params: form }).then(res => {
          // 定义 所有的数据源
          this.flightsData = res.data;
          // 定义 过滤后 数组 数据源 
          this.filterList = this.flightsData.flights;
          // 定义 总条数
          this.page.total = this.filterList.length;
          // 分页使用 
          this.currentFlights = this.filterList.slice(
            (this.page.currentPage - 1) * this.page.pageSize, // 0
            this.page.currentPage * this.page.pageSize // 2
          );
        });
      } else {
        // 定义总条数 （属于过滤后的 总条数）
        this.page.total = this.filterList.length;
        // 分页
        this.currentFlights = this.filterList.slice(
          (this.page.currentPage - 1) * this.page.pageSize, // 0
          this.page.currentPage * this.page.pageSize // 2
        );
      }
    },
    handleSizeChange(value) {
      this.page.pageSize = value;
      this.getList();
    },
    handleCurrentChange(value) {
      this.page.currentPage = value;
      this.getList();
    },
    filterChange(filterObj) {
      // {airport: "首都机场", flightTimes: "6|12", company: "国航", sizes: "M"}
      // {airport: "", flightTimes: "", company: "国航", sizes: ""}

      // 1 先过滤 第一个条件 航空公司
      // 2 当 航空公司 等于 空字符串的时候 表示 不用过滤
      let filterList = this.flightsData.flights.filter(v => {
        // company == "";
        // if (filterObj.company === "") {
        //   return true;
        // }

        // 1 航空公司的条件
        let isOk1 =
          filterObj.company === "" || v.airline_name === filterObj.company;

        return isOk1;
        // if (isOk1) {
        //   return true;
        // } else {
        //   return false;
        // }
      });
      this.filterList = filterList;
      this.getList();
    }
  },
  mounted() {
    this.getList(true);
  }
};
</script>

<style lang="less" scoped>
.flights {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.flights_main {
  flex: 5;
}
.flights_aside {
  flex: 2;
}
</style>