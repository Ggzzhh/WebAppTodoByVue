// mutations只能写同步的代码 异步修改数据只能在actions中写

export default {
  updateCount (state, num){
    state.count = num
  },
  fillTodos (state, todos) {
    state.todos = todos
  },
  addTodo(state, todo) {
    // console.log(`mutations: ${todo}`)
    state.todos.unshift(todo)
  },
  updateTodo(state, {id, todo}) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1,
      todo
    )
  },
  deleteTodo(state, id) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1
    )
  },
  deleteAllCompleted(state) {
    state.todos = state.todos.filter(t => !t.completed)
  },
  doLogin (state, userInfo) {
    state.user = userInfo
  }
}
