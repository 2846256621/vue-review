import http from './http'; //封装的响应拦截器
import base from './base'; //配置的接口域名

const todosApi = {
    //得到数据
    getTodoList (){
        return http.get(`${base.baseURL}/getTodoList`)
    },
    //增加数据
    addTodoList(data){
       return http.post(`${base.baseURL}/addTodoList`,{
           data:JSON.stringify(data)
       })
    }
};


export default  todosApi;