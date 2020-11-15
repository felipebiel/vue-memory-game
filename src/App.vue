<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Novo Jogo</router-link> |
      <router-link to="/rank">Lista de melhores</router-link>
    </div>
    <router-view/>
  </div>
</template>

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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: white;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
