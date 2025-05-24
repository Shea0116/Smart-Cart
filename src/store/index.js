import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import SearchHistory from './modules/SearchHistory'
import cart from '@/store/modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token: state => state.user.userInfo.token
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    SearchHistory,
    cart
  }
})
