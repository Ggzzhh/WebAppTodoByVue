<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab :label="tab" :index="tab" v-for="tab in stats" :key="tab">
        </tab>
      </tabs>
    </div>

    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <Item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />

    <Helper
      :filter="filter"
      :todos="todos"
      @clearAll="clearAllCompleted"
    ></Helper>
    <router-view />
  </section>

</template>

<script>
  import Item from './item.vue'
  import Helper from './helper.vue'
  let id = 0;
  export default {
    name: "todo",
    // props: ['id'],
    data(){
      return {
        todos: [],
        filter: 'all',
        stats: ['all', 'active', 'completed']
      }
    },
    metaInfo: {
      title: 'todo title?'
    },
    computed: {
      filteredTodos(){
        if (this.filter === 'all'){
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo(e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        })
        e.target.value = ''
      },
      deleteTodo(id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      clearAllCompleted(){
        this.todos = this.todos.filter(todo => !todo.completed)
      },
      handleChangeTab(value){
        this.filter = value
      }
    },
    components: {
      Item,
      Helper
    },
    // mounted() {
    //   // console.log(this.id)
    // },
    // 使用组件前的钩子
    // beforeRouteEnter(to, from, next){
    //   console.log('todo before enter')
    //   // vm表示组件自身
    //   next(vm => {
    //     // console.log(vm)
    //   })
    // },
    // 复用组件时触发
    // beforeRouteUpdate(to, from, next){
    //   console.log('todo before update')
    //   next()
    // },
    // 离开前触发
    // beforeRouteLeave(to, from, next){
    //   console.log('todo before leave')
    //   next()
    // }
  }
</script>

<style lang="stylus" scoped>
  section
    width 600px
    margin auto
    box-shadow 0 0 5px #666
    >input
      position: relative;
      margin: 0;
      width: 100%;
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      border: 0;
      outline: none;
      color: inherit;
      padding: 6px;
      border: 1px solid #999;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      font-smoothing: antialiased;
      padding: 16px 16px 16px 60px;
      border: none;
      box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  .tab-container{
    background-color #ffffff
    padding 0 15px
  }
</style>
