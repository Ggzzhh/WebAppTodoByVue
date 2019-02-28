import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    isActive: true,
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red'
    }
  },
  template: `
    <!--<div v-if="isActive">-->
      <!--呵呵呵-->
      <!--<div v-html="html" :id="aaa"></div>-->
    <!--</div>-->
    <!--<div :class="{active: isActive}">-->
    <!--<div :class="[isActive? 'active' : '']">-->
    <div :class="{active: isActive}" :style="styles">
      good
    </div>
  `
})
