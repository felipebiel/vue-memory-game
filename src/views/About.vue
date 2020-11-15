<template>
  <div class="rank">
    <h1 class="rank__title">Melhores Jogadores</h1>
    <ul class="rank__list">
      <li class="rank__item" v-for="(user, index) in rankUsers" :key="index">
        <div class="rank__attribute rank__attribute--name">
          <span class="material-icons">account_circle</span> {{ user.name }} </div>
        <div class="rank__attribute">
          <span class="material-icons">sync</span> {{ user.moves}}</div>
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

.rank {
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  &__title {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 0;
  }

  &__list {
    list-style: none;
    padding: 0;
    box-shadow: 1px 2px 4px black;
  }

  &__item {
    padding: 20px 10px;
    background-color: rgba(255,255,255, 0.5);
    color: black;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
  }

  &__attribute {
    font-size: 1.7rem;
    &--name {
      max-width: 80%;
    }
  }
}

</style>