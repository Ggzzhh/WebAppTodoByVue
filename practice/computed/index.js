import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
              <span>{{ name() }}</span> <br>
              <span>{{fullname}}</span><br>
              <span>{{number}}</span>
              <span>{{fullName}}</span>
              <p><input type="text" v-model="number"></p>
              <p><input type="text" v-model="firstName"></p>
              <p><input type="text" v-model="lastName"></p>
              <p><input type="text" v-model="fullname"></p>
            </div>`,
  data: {
    firstName: 'G',
    lastName: 'H',
    number: 0,
    fullName: ' '
  },
  computed: {
    fullname : {
      get() {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set(name){
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  methods: {
    name () {
      console.log('new name2')
      return `${this.firstName}  ${this.lastName}`
    }
  },
  watch: {
    // 这样默认不执行
    // firstName (newName, oldName){
    //   this.fullName = `${newName} ${this.lastName}`
    // }
    // 使用immediate 默认会执行
    firstName: {
      handler (newName, oldName) {
        this.fullName = `${newName} ${this.lastName}`
      },
      immediate: true,
      // 深入观察 遍历监听属性的每一层 性能开销会大 可以监听想要监听的属性减少开销
      deep: true
    }
  }

});
