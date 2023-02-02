export const state = () => ({
  isTopbarBlock: true, // 顶部栏是否显示
})

export const mutations = {
  UPDATE_TOPBAR_BLOCK(state, payload){
    if (state.isTopbarBlock !== payload) {
      state.isTopbarBlock = payload
    }
  }
}
