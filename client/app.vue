<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>

    <!--<router-link to="/app">app</router-link>-->
    <!--<router-link to="/login">login</router-link>-->
    <!--<p>{{fullName}}1</p>-->
    <!--&lt;!&ndash;<p>{{textPlus}}</p>&ndash;&gt;-->
    <!--&lt;!&ndash;<p>{{textA}}</p>&ndash;&gt;-->
    <!--<p>{{counter}}</p>-->



    <transition name="fade">
      <!--使用两个组件，可以给router-view加名字-->
      <router-view />
    </transition>
    <!--<notification content="test notify"/>-->
    <button @click="notify">notify1</button>
    <Footer></Footer>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    },
    metaInfo: {
      title: 'Gzh \'s Title'
    },
    computed: {
      // textA () {
      //   return this.$store.state.a.text
      // },
      // vuex 自带的映射方法, 也可以返回方法 如果需要计算
      // ...mapState({
      //   counter: 'count'
      // }),
      ...mapState({
        counter: (state) => state.count,
        // textA: (state) => state.a.text,
        // textC: (state) => state.c.text
      }),
      // ...mapGetters(['fullName'])
      ...mapGetters({
        'fullName': 'fullName',
        // textPlus: 'a/textPlus'
        // textPlus: 'textPlus'
      })
    },
    methods: {
      ...mapActions(['updateCountAsync']),
      ...mapMutations(['updateCount']),
      notify(){
        this.$notify({
          content: 'test notify',
          btn: 'close'
        })
      }
    },
    mounted() {
      // this.$notify({
      //   content: 'test notify',
      //   btn: 'close'
      // })
      // console.log(this.$route)
      // console.log(this.$store.state.count)
      // // vuex 更新数据时使用
      // this.updateCount(0)
      // dispatch用于触发vuex actions中的方法
      // this.$store.dispatch('updateCountAsync', {
      //   num: 5,
      //   time: 2000
      // })
      // this.updateCountAsync({
      //   num: 5,
      //   time: 2000
      // })

      // this.updateText('123')
      // this.add()
    }
  }
</script>

<style lang="stylus" scoped>
  #app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }


</style>
