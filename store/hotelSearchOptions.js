// 管理筛选酒店的信息

export const state = () => ({
  searchOptions: {
    // 酒店价格，等级等信息
    hotelInfo: {
      hotellevel: [],
      hoteltype: [],
      hotelbrand: [],
      hotellasset: [],
      price_in: 0
    },
    // 城市，日期等信息
    headerInfo: {
      city: 74,
      enterTime: '',
      leftTime: '',
      person: 0
    }
  }
});

export const mutations = {
  // 第一次加载hotel页面，从首页搜索进来时存在bug
  firstLoading(state) {
    state.searchOptions = {
      hotelInfo: {},
      headerInfo: {}
    }
  },
  hotelInfo(state, val) {
    state.searchOptions.hotelInfo = val
  },
  headerInfo(state, value) {
    state.searchOptions.headerInfo = value
  }
};

export const actions = {

};