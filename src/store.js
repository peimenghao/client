import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const types = {
	
	SET_TOKEN: 'set_token', // 是否认证通过
	SET_USERINFO: 'set_userInfo' // 用户信息
	
}

const state = { 
	userInfo: localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') :'', // 用户名
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
 
	
}

const getters = {
	userInfo: state => state.userInfo,
	token: state => state.token
}

const mutations = {
	[types.SET_TOKEN](state,token ) {
	  if (token)
	    state.token = token
	  else
	    state.token = false
	},
	[types.SET_USERINFO](state, userInfo) {
	  if (userInfo)
	    state.userInfo = userInfo
	  else
	    state.userInfo = {}
	}
}

const actions = {
 
	setToken: ({ commit }, token) => {
	  commit(types.SET_TOKEN, token)
	},
	setUserInfo: ({ commit }, userInfo) => {
	  commit(types.SET_USERINFO, userInfo)
	},
	clearCurrentState: ({ commit }) => {
	  commit(types.SET_TOKEN, false)
	  commit(types.SET_USERINFO, null)
	}
	
	
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
