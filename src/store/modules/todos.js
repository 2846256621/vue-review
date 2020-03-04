//导入封装好的 axios
import api from "../../api";
import {GET_TODOS,ADD_TODOS} from '../mutation-types'
const todos = {
    state:{
        todos:[]
    },
    getters:{
        getStateTodos(state){
            return state.todos
        }
    },
    mutations:{
        // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
        [GET_TODOS](state,payload){
            state.todos = payload
        },
        [ADD_TODOS](state,payload){
            state.todos.push(payload)
        }
    },
    actions:{  // 通常跟api接口打交道 commit调用mutations的方法
        getInitTodos({commit}){
            api.todosApi.getTodoList()
                .then(res=> {
                    commit(GET_TODOS,res.data.todos)
                });
        },
        addMoreTodos({commit},payload){
            commit(ADD_TODOS,payload)
        }
    }
};
export default todos