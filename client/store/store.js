import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'


export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        // 调用后可以重复命名 mutations 调用方法会变为this['a/updateText'](state, text)
        // namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            // getters 全局的getter rootState是全局的state
            return state.text + 1
          }
        },
        actions: {
          add({state, commit, rootState}) {
            // add接收的参数是全局的上下文
            // 如果要在全局找commit的函数 第三个参数加上{root: true}
            commit('updateCount', 44444, {root: true})
          }
        }
      },
      b: {
        state: {
          text: 2
        }
      }
    }
  })

  // if (module.hot) {
  //   module.hot.accept([
  //     './state/state',
  //     './mutations/mutations',
  //     './getters/getters',
  //     './actions/actions'
  //   ], () => {
  //     const newState = require('./state/state').default,
  //           newMutations = require('./mutations/mutations').default,
  //           newGetters = require('./getters/getters').default,
  //           newActions = require('./actions/actions').default
  //
  //     store.hotUpdate({
  //       state: newState,
  //       mutations: newMutations,
  //       getters: newGetters,
  //       actions: newActions
  //     })
  //   })
  // }

  return store
}
