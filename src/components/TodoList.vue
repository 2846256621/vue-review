<template>
  <section class="todoapp">
    <Headers :todos="todos"></Headers>
    <section class="main">

      <ul class="todo-list">
        <!--如果双击当前的edit 等于 我自己则可编辑editing  样式由edit->editing-->
        <li v-for="(item,index) in todos"
            v-bind:class="{completed : item.completed,editing:edit === item}">
            <!--v-bind:class="{completed : item.completed}">-->

          <div class="view">

            <!--checkbox的v-model  true为勾选，false为 不勾选-->
            <input class="toggle-check" type="checkbox" v-model="item.completed">

            <!--双击修改-->
            <label @dblclick="handleGetEdit(item)">{{item.title}}</label>


            <button class="destroy" @click="handleDeleteTodos(index,$event)"></button>
          </div>
          <!-- 编辑框   因为这里可以取消编辑 不保存 所以不双向绑定数据-->
          <input class="edit" v-bind:value="item.title"
                 type="text"
                 @keydown.enter="handleSaveEdit(item,index,$event)"
                 @blur="handleSaveEdit(item,index,$event)"
                 @keydown.esc="handleCancelEdit()"
          >
        </li>
      </ul>
    </section>
    <Footer :todos="todos"></Footer>
  </section>
</template>

<script>
    import Headers from './Header'
    import Footer from './Footer'
    // import {todosApi} from '../api/todos'
    export default {
        name: "TodoList",
        components:{
          Headers,
          Footer
        },
        data() {
          return {
            todos:[],
            edit:''
          }
        },
        created(){
          this.getTodos();

        },
        methods:{

          //得到数据
          getTodos(){
              this.$api.todosApi.getTodoList()
                  .then(res=> {
                  // 执行某些操作
                  //   console.log(res.data);
                    this.todos = res.data.todos;
                  })
                  .catch(err=>{

                  })
          },

          //双击编辑
          handleGetEdit(item){

          },
          //删除
          handleDeleteTodos(index,e){

          },
          //保存
          handleSaveEdit(item,index,e){

          },
          //退出编辑
          handleCancelEdit(){

          },

        }

    }
</script>

<style scoped>


  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .todoapp {
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;

  }

  .main {
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
  }
  .toggle-check{
    margin-left: 20px;
  }


  .todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .todo-list li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    text-align: left;
  }

  .todo-list li label {
    word-break: break-all;
    padding: 15px ;
    display: inline-block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  .todo-list li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }
  .todo-list li .destroy {
    display: block;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    transition: color 0.2s ease-out;
    outline: none;
  }
  .todo-list li .destroy:hover:after {
    content: '×';
    display: block;
    color: #af5b5e;
  }
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  input{
    outline: none;
  }
  .todo-list li .edit {
    display: none;
  }
  .edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    /*border: 0;*/
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .todo-list li.editing {
    border-bottom: none;
    padding: 0;
  }
  .todo-list li.editing .edit {
    display: inline-block;
    width: calc(90% - 43px);
    padding: 12px 6px;
    margin: 0 0 0 50px;
  }
</style>
