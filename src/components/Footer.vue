<template>
  <footer class="footer"  >

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
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "Footer",
        data() {
            return {
                all: true,
                active: false,
                completed: false,
                todos:[]
            }
        },
        computed: {
            ...mapGetters({
                initTodos:'getStateTodos',
                activeTodos:'getActiveTodos',
                completedTodos:'getCompletedTodos'
            }),
            //展示全部清除按钮
            hasCompleted() {
                return this.initTodos.some(function (item,index) {
                    return item.completed;
                });
            },

        },
        created() {
            this.todos = this.initTodos
        },
        methods: {
            ...mapActions([
                'clearCompleted'
            ]),
            //全部数据
            handleAllTodos() {
                this.active = false;
                this.all = true;
                this.completed = false;

                this.todos = this.initTodos;
                this.$emit('changeTodos',this.todos)
            },
            //未完成
            handleActiveTodos() {

                this.all = false;
                this.active = true;
                this.completed = false;

                this.todos = this.activeTodos;
                this.$emit('changeTodos',this.todos)
            },
            handleCompletedTodos() {

                this.active = false;
                this.all = false;
                this.completed = true;

                this.todos = this.completedTodos;

                this.$emit('changeTodos',this.todos)
            },
            //清除全部已完成的
            handleClearCompleted() {
                this.clearCompleted();
            }
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
