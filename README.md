#### 进行todos 筛选信息时，利用内部data中的todos去控制，产生的问题
  - 1.state中的todos与data 内部的todos 无法同步
  >问题原因：
  由于vuex中将数据映射到组件内部的computed中，数据修改时
  视图会自动更新。但是若用同一组数据去筛选，导致后序操作已经不是原始数据，
  就需要借助组件内部的data，去复制一份原始数据，去进行操作。但问题就是，
  data内部的数据与state中无法同步更新，因为computed中的属性不能修改，解决方法呢，就是
  组件内部利用watch侦听属性，去同步更新视图。
  
  如下代码：
  ```  
        //子组件里控制当前选择的条件的标志，通过this.$emit 传给父组件，去筛选数据，
        渲染父组件内容
        <Footer v-on:changeTodos="changeAllTodos"
                 :todoCount="todos.length"
                 :hasCompleted="hasCompleted"
         ></Footer>
         
         
         created(){
             this.getInitTodos();
         },
         mounted() {
             this.todos = this.allTodos; //使用 watch去改变data，渲染视图
         },
         computed:{
             ...mapGetters({
                 allTodos: 'getStateTodos',
                 completedTodos: 'getCompletedTodos',
                 activeTodos: 'getActiveTodos'
             }),
             //展示全部清除按钮
             hasCompleted() {
                 return this.allTodos.some(function (item,index) {
                     return item.completed;
                 });
             },
         },
         watch: {
             allTodos() {
                 this.refreshData();//去修改todos，重新渲染视图
             }
         },
         data() {
             return {
                 edit:'',
                 todos: [],
                 curFilter: "ALL",
             }
         },
         
         methods:{
           //改变当前data中的 todos
           changeAllTodos(tag){
             switch(tag){
                case "ALL":
                   this.todos = this.allTodos;
                   break;
                case "ACTIVE":
                   this.todos = this.activeTodos;
                   break;
                case "COMPLETED":
                   this.todos = this.completedTodos;
                   break;
             }
             this.curFilter = tag;
           },
           //改变 watch中的todos，来进行视图渲染
           refreshData() {
             switch(this.curFilter){
                case "ALL":
                  this.todos = this.allTodos;
                  break;
                case "ACTIVE":
                  this.todos = this.activeTodos;
                  break;
                case "COMPLETED":
                  this.todos = this.completedTodos;
                  break;
             }
          }
     }
  ```
  - 2.学会父组件中控制数据的改变，子组件中减少数据的更改
  > 例如此demo中，父组件需要根据子组件的选择，来切换渲染的内容，
  则不需要子组件去修改数据，子组件只负责进行选择，将选择的结果传递给父组件，
  父组件根据选择，进行数据的筛选，渲染。
  

