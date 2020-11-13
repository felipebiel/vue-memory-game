<template>
  <div class="home">
    <div v-if="!start">
      <input type="text" v-model="name" placeholder="Nome" />
      <button type="button" @click="startGame">Iniciar</button>
    </div>
    <div v-else>
      <ul>
        <li
          v-for="(card, index) in cardsGame"
          :key="index"
          @click="selectedCard(card)"
        >
          {{ card.name }} - {{ card.isSelected }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";

export default {
  name: "Home",
  data() {
    return {
      start: false,
      name: '',
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
      cardsSelected: [],
    };
  },
  created() {
    
  },
  methods: {
    startGame() {
      this.start = true;
      this.prepareCards();
    },
    prepareCards() {
      this.cardsGame = this.shuffleArray(
        this.cardsGame.concat(
          _cloneDeep([...this.playingCards]),
          _cloneDeep([...this.playingCards])
        )
      );
    },
    selectedCard(card) {
      if (!card.isSelected) {
        card.isSelected = true;

        if (this.cardsSelected.length < 2) {
          this.cardsSelected.push(card);
        }
        if (this.cardsSelected.length === 2) {
          if (this.cardsSelected[0].name != this.cardsSelected[1].name) {
            this.cardsSelected.forEach(
              (element) => (element.isSelected = false)
            );
            this.cardsSelected = [];
            alert("Errou!");
          } else {
            this.cardsSelected = [];
            alert("Acertou mizeravi");
          }
        }
      }
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
