// mutations只能写同步的代码 异步修改数据只能在actions中写

export default {
  updateCount (state, num){
    state.count = num
  }
}
