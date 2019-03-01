import Vue from 'vue'

const component = {
  template: `<div :style="style"><slot></slot></div>`,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data: {
    value: 123
  },
  template: `
    <div>
      <comp-one ref="comp">
        <span ref="span">{{value}}</span>
      </comp-one>
    </div>
  `,
  render(createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp'
      },
      [
        createElement(
          'span',
          {
            ref: 'span'
          },
          this.value)
      ]
    )
  }
})
