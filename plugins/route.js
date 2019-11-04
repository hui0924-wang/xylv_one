export default function ({ app }) {
  app.router.beforeEach((to, from, next) => {
    // console.log(to,from)
    // console.log(app)
    // 第一次到酒店页面
    if (to.name === 'hotel' && from.name !== null) {
      // app.store.state.hotelSearchOptions.searchOptions = {
      //   hotelInfo:{}
      // headerInfo:{}
      // }
      app.store.commit('hotelSearchOptions/firstLoading')
      console.log(1)
    }
    // console.log(app)
    console.log(app.store.state.hotelSearchOptions.searchOptions)
    next()
  })
}