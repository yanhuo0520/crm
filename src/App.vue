<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>
      <router-view v-if="isRouterAlive && $route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="isRouterAlive && !$route.meta.keepAlive"></router-view>

     <!-- <router-view v-if="isRouterAlive"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    };
  },
  data(){
    return{
      isRouterAlive: true //控制视图是否显示的变量
    }
  },
  mounted() {
    
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* background: #f5f5f5; */
}
html{
  height: 100%;
}
body{
  height: 100%;
}
p{
  margin: 0;
}
</style>
