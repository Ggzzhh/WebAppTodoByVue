<script type="text/jsx">
  import TabContainer from './tab-container.vue'

  export default {
    name: "tabs",
    components: {
      TabContainer
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    methods: {
      onChange(index){
        this.$emit('change', index)
      }
    },
    data () {
      return {
        panes: []
      }
    },
    render () {
      return (
        <div class='tabs'>
          <ul class="tabs-header">
            {this.$slots.default}
          </ul>
          <tab-container panes={this.panes}></tab-container>
        </div>
      )
    }
  }
</script>

<style lang="stylus" scoped>
  .tabs-header
    display flex
    list-style none
    margin 0
    padding 0
    border-bottom 2px solid #ededed
</style>
