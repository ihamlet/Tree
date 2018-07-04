import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var data = {}

const state = {
  TreeArray: data
}
export default new Vuex.Store({
  state
})
