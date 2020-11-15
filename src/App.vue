<template>
  <div id="app">
    <NavBar />
    <transition name="fade" appear mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import NavBar from "@/components/navBar/NavBar.vue"

export default {
  components: {
    NavBar,
  }, 
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
}

body {
  background: #0F2027;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #fff;
}

#app {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
