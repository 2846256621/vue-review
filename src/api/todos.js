import http from './http'; //封装的响应拦截器
import base from './base'; //配置的接口域名

const todosApi = {
   getTodoList (){
        return http.get(`${base.baseURL}/getTodoList`)
    }
};


export default  todosApi;