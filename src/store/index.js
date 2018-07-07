import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  Code: '',
  TreeArray: '',
  isLogin: false,
  UserReg: null
}

const mutations = {
  increment (state, params) {
    state.Code = params.data
  },
  getUserReg (state, params) {
    state.UserReg = params
  },
  getTreeArray (state, params) {
    state.TreeArray = params
  },
  isLogin (state) {
    state.isLogin = true
  }
}

const actions = {
  reg (context) {
    axios({
      method: 'post',
      url: 'http://120.78.176.178:8080/v1/fam/user/register',
      data: context.state.UserReg
    })
      .then(res => {
        console.log(res)
        context.commit('increment', res)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  login (context) {
    axios({
      method: 'post',
      url: 'http://120.78.176.178:8080/v1/fam/user/login',
      data: context.state.UserReg
    })
      .then(res => {
        console.log(res)
        context.commit('increment', res)
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
