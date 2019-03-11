import model from '../../model/client-model'
import notify from '../../componments/notification/func'
import bus from '../../util/bus'

const handleError = (err) => {
  if (err.code === 401) {
    notify({
      content: '你得先登录啊！'
    })
    bus.$emit('auth')
  }

}

// mutations只能写同步的代码 异步修改数据只能在actions中写
export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos ({ commit }) {
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        // console.log(err)
        handleError(err)
      })
  },
  addTodo({commit}, todo) {
    // console.log(todo)
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        notify({
          content: '有新的事情等待你完成'
        })
      }).catch(e=> {
      handleError(e)
    })
  },
  updateTodo({commit}, {id, todo}) {
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', {id, todo: data})
      }).catch(e=> {
      handleError(e)
    })
  },
  deleteTodo({commit}, id) {
    model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
        notify({
          content: '你又完成了一件事情'
        })
      }).catch(e=> {
      handleError(e)
    })
  },
  deleteAllCompleted({commit, state}) {
    const ids =  state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        notify({
          content: '清理一下~'
        })
      }).catch(e=> {
      handleError(e)
    })
  },
  login({commit} , {username, password}) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登陆成功'
          })
          resolve()
        })
        .catch(e => {
          handleError(e)
          reject(e)
        })
    })
  }
}

