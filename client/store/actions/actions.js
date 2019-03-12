// import model from '../../model/client-model'
// 在webpack中设置了alias 可以映射到特定的文件
import model from 'model'
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
    commit('startLoading')
    return model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        // console.log(err)
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo({commit}, todo) {
    // console.log(todo)
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('addTodo', data)
        notify({
          content: '有新的事情等待你完成'
        })
      }).catch(e=> {
      commit('endLoading')
      handleError(e)
    })
  },
  updateTodo({commit}, {id, todo}) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(data => {
        commit('endLoading')
        commit('updateTodo', {id, todo: data})
      }).catch(e=> {
      commit('endLoading')
      handleError(e)
    })
  },
  deleteTodo({commit}, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('endLoading')
        commit('deleteTodo', id)
        notify({
          content: '你又完成了一件事情'
        })
      }).catch(e=> {
      commit('endLoading')
      handleError(e)
    })
  },
  deleteAllCompleted({commit, state}) {
    const ids =  state.todos.filter(t => t.completed).map(t => t.id)
    commit('startLoading')
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        commit('endLoading')
        notify({
          content: '清理一下~'
        })
      }).catch(e=> {
      commit('endLoading')
      handleError(e)
    })
  },
  login({commit} , {username, password}) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('endLoading')
          commit('doLogin', data)
          notify({
            content: '登陆成功'
          })
          resolve()
        })
        .catch(e => {
          commit('endLoading')
          handleError(e)
          reject(e)
        })
    })
  }
}

