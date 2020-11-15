<template>
  <div class="about">
    <h1>Melhores Jogadores</h1>
    <ul>
      <li v-for="(user, index) in rankUsers" :key="index">
        {{ user.name }} - {{ user.moves}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    
   computed: {
     rankUsers() {
       return JSON.parse(localStorage.getItem('usersRank')) ? JSON.parse(localStorage.getItem('usersRank')).sort((a, b) => a.moves - b.moves) : [];
     }
   },
  }
</script>

<style lang="scss" scoped>

</style>