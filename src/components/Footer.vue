<template>
  <footer class="footer" >

    <span class="todo-count"><strong>{{todos.length}}</strong> item left</span>
    <ul class="filters">
      <li>
        <a v-bind:class="{selected:all}" href="#" @click="handleAllTodos">All</a>
      </li>
      <li>
        <a v-bind:class="{selected:active}" href="#" @click="handleActiveTodos">Active</a>
      </li>
      <li>
        <a v-bind:class="{selected:completed}" href="#" @click="handleCompletedTodos">Completed</a>
      </li>
    </ul>
    <!-- 若全都没完成，则隐藏此按钮 -->
    <button v-if="hasCompleted"
            class="clear-completed"
            @click="handleClearCompleted">Clear completed</button>
  </footer>
</template>

<script>
    export default {
        name: "Footer",
        // props:['todos'],
        data(){
          return{
            todos:[],
            all:true,
            active:false,
            completed:false,

          }
        },
        computed:{
          //展示全部清除按钮
          hasCompleted(){
            return this.todos.some(function (item,index) {
              return item.completed;
            });
          }
        },
        created(){
          this.$bus.on('getTodos',(item)=>{
            this.todos = item;
          }); //接收todos
        },
        methods:{
          //全部数据
          handleAllTodos(){
            this.active = false;
            this.all = true;
            this.completed = false;
            this.$bus.emit('allTodos', this.todos); //传入
          },
          //未完成
          handleActiveTodos(){
            this.all = false;
            this.active = true;
            this.completed = false;
            let unCompletedTodos = this.todos.filter(item=>{
              return item.completed === false
            });
            this.$bus.emit('unCompletedTodos', unCompletedTodos); //传入
          },
          handleCompletedTodos(){
            this.active = false;
            this.all = false;
            this.completed = true;
            let completedTodos = this.todos.filter(item=>{
              return item.completed === true
            });
            this.$bus.emit('completedTodos', completedTodos); //传入
          },
          //清除全部已完成的
          handleClearCompleted(){
            // this.$http.get('/completedTodos',{}, (res,err) => {
            //   this.todos = res.data.todos;
            //   this.$bus.emit('newTodos', this.todos); //传入
            // })
            this.todos = this.todos.filter((item) =>{
              return !item.completed
            });
            this.$bus.emit('newTodos', this.todos); //传入
          },

        }
    }
</script>

<style scoped>

  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  .footer {
    color: #777;
    padding: 10px 15px;
    height: 40px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }
  .todo-count {
    float: left;
    text-align: left;
  }
  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
  }
  .filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
  .clear-completed, html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }
  .filters li {
    display: inline;
  }

  .filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }
  .clear-completed:hover{
    text-decoration: #b1b1b1;
  }
  .clear-completed, html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
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
    outline: none;
  }
</style>
