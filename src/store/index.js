import Vue from 'vue';
import Vuex from 'vuex'
import { state , mutations , STOREAGE_KEY } from './mutations';
Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations
})

// 存储数据在浏览器
store.subscribe((mutation, state) => {
    console.log(mutation.type)
    console.log(mutation.payload)
    window.localStorage.setItem(STOREAGE_KEY, JSON.stringify(state.todos))
})

export default store

