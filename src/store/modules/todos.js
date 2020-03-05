//导入封装好的 axios
import api from "../../api";
import {
    GET_TODOS,
    ADD_TODOS,
    DELETE_TODOS,
    SELECT_ALL_TODOS,
    CLEAR_COMPLETED_TODOS,
    SAVE_EDIT_TODOS,
    ACTIVE_TODOS,
    COMPLETED_TODOS,
} from '../mutation-types'
const todos = {
    state:{
        todos:[],

    },
    getters:{
        getStateTodos(state){
            return state.todos
        },
        getCompletedTodos(state){
            return state.todos.filter(item=>{
                return item.completed
            });
        },
        getActiveTodos(state){
            return state.todos.filter(item=>{
                return !item.completed
            });
        }
    },
    mutations:{
        // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
        //得到初始数据
        [GET_TODOS](state,payload){
            state.todos = payload
        },
        //增加
        [ADD_TODOS](state,payload){
            state.todos = payload
        },
        //删除
        [DELETE_TODOS](state,payload){
            state.todos = state.todos.filter(item=>{
                return item.id !== payload.id
            });
        },
        //全选
        [SELECT_ALL_TODOS](state,payload){
            state.todos.forEach(item=>{
                item.completed= payload.checked
            });
        },
        //双击保存修改
        [SAVE_EDIT_TODOS](state,payload){
            state.todos.forEach(item=>{
               if(item.id === payload.id){
                   item.title = payload.title
               }
            });
        },
        //清除已完成的
        [CLEAR_COMPLETED_TODOS](state){
            state.todos = state.todos.filter(item=>{
                return !item.completed
            });
        },

    },
    actions:{  // 通常跟api接口打交道 commit调用mutations的方法
        getInitTodos({commit}){
            api.todosApi.getTodoList()
                .then(res=> {
                    commit(GET_TODOS,res.data.todos)
                });
        },
        addMoreTodos({commit},payload){
            api.todosApi.addTodoList(payload)
                .then(res=> {
                    commit(ADD_TODOS,res.data.todos)
                });
        },
        deleteTodos({commit},payload){
            commit(DELETE_TODOS,payload);
        },

        saveEditTodos({commit},payload){
            commit(SAVE_EDIT_TODOS,payload);
        },
        selectAllTodos({commit},payload){
            commit(SELECT_ALL_TODOS,payload);
        },
        clearCompleted({commit}){
            commit(CLEAR_COMPLETED_TODOS);
        },
    }
};
export default todos