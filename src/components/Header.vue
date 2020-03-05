<template>
  <header class="header">
    <input id="toggle-all"
           class="toggle-all"
           type="checkbox"
           @change="handleCheckedAll" >
    <label id="check-all"></label>
    <h1>todos</h1>
    <input class="new-todo"
           @keydown.enter="handleAddTodos"
           placeholder="What needs to be done?"
           autofocus>
  </header>
</template>

<script>
    import {mapGetters,mapActions} from "vuex";

    export default {
        name: "Header",
        data(){
            return{

            }
        },
        created(){


        },
        computed: {
            ...mapGetters({
                todos: 'getStateTodos'
            })
        },
        methods:{
          ...mapActions([
              'addMoreTodos',
              'selectAllTodos'
           ]),
          //全选
          handleCheckedAll(e){
            this.selectAllTodos({
                checked:e.target.checked
            })
          },
          //回车
          handleAddTodos(e){
            let item = {
                id:this.todos.length+1,
                title:e.target.value.trim(),
                completed:false
            };
            this.addMoreTodos(item); //调用actions 并传入参数，并提交mutation
            e.target.value = '';
          },

      }
    }
</script>

<style scoped>
  #check-all:before {
    content: '❯';
    font-weight: bolder;
    font-size: 25px;
    color: #368a65;
    padding: 10px 27px 10px 27px;
    position: absolute;
    left: -9px;
    top: 5px;
  }
  .toggle-all{
    padding: 10px 27px 10px 27px;
    position: absolute;
    left: 14px;
    top: 20px;
    opacity: 0;
    z-index: 10;
  }
   h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
  }

  .header{
    line-height: 2em;
  }
  .new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    color: #b1b1b1;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  }
  .new-todo, .edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    /*color: inherit;*/
    padding: 6px;
    /*border: 1px solid #999;*/
    /*box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);*/
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .new-todo, .edit {
    position: relative;
    margin-left: 55px;
    width: 90%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 2em;
    color: inherit;
    padding: 6px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  input{
    outline: none;
  }
</style>
