<script type="text/jsx">
  export default {
    name: "tab",
    props: {
      index: {
        type: [Number, String],
        required: true
      },
      label: {
        type: String,
        default: 'tab'
      }
    },
    mounted(){
      this.$parent.panes.push(this)
    },
    computed: {
      active () {
        // 访问上层节点获取其属性
        return this.$parent.value === this.index
      }
    },
    methods: {
      handleClick() {
        this.$parent.onChange(this.index)
      }
    },
    render(h){
      const tab = this.$slots.label || <span>{this.label}</span>
      const classNames = {
        tab: true,
        active: this.active
      }
      return (
        <li class={classNames} on-click={this.handleClick}>
          {tab}
        </li>
      )
    }
  }
</script>

<style lang="stylus" scoped>
  .tab
    list-style none
    line-height 40px
    margin-right 30px
    position relative
    bottom -2px
    cursor pointer
    &.active
      border-bottom 2px solid blue
    &:last-child
      margin-right 0
</style>
