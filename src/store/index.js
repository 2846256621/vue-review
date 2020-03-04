import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex);

//导入模块
import todos from './modules/todos'
const store = new Vuex.Store({
 modules:{
     todos
 }
});
export default store;

