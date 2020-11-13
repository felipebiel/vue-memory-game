<template>
  <div class="home">
    {{ playingCards }}
    <ul>
      <li v-for="(card, index) in cardsGame" :key="index" @click="selectedCard(card)">{{ card.name }} - {{ card.isSelected }}</li>
    </ul>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep';

export default {
  name: "Home",
  data() {
    return {
      playingCards: [
        { name: "As espadas", isSelected: false, img: "" },
        { name: "Dois espadas", isSelected: false, img: "" },
        { name: "Três espadas", isSelected: false, img: "" },
        { name: "Quatro espadas", isSelected: false, img: "" },
        { name: "Cinco espadas", isSelected: false, img: "" },
        { name: "Seis espadas", isSelected: false, img: "" },
        { name: "Sete espadas", isSelected: false, img: "" },
        { name: "Oito espadas", isSelected: false, img: "" },
        { name: "Nove espadas", isSelected: false, img: "" },
        { name: "Valete espadas", isSelected: false, img: "" },
        // {name: 'Dama espadas', isSelected: false, img: ''},
        // {name: 'Rei espadas', isSelected: false, img: ''},
      ],
      cardsGame: [],
    };
  },
  created() {
    this.cardsGame = this.shuffleArray(this.cardsGame.concat(_cloneDeep([...this.playingCards]), _cloneDeep([...this.playingCards])));
  },
  methods: {
    selectedCard(card) {
      card.isSelected = true;
    },
    shuffleArray(array) {
      let counter = array.length;
      let temp = null;
      let index = null;
      while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
