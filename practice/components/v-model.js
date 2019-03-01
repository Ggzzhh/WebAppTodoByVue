import Vue from 'vue'

const component = {
  model: {
    prop: 'v1',
    event: 'change'
  },
  props: ['v1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="v1">
    </div>
    `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data: {
    value: '123'
  },
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
      <div>{{value}}</div>
    </div>
  `
})

