<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <!--<Todo></Todo>-->
    <transition name="fade">
      <!--使用两个组件，可以给router-view加名字-->
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    },
    mounted() {
      console.log(this.$route)
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
