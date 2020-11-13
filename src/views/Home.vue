<template>
  <div class="home">
    <div class="card">
      <span class="card__suit card__suit--top">♣</span>
      <span class="card__number">A</span>
      <span class="card__suit card__suit--bottom">♣</span>
    </div>

    <div v-if="!start && !stillCardsSelected">
      <input type="text" v-model="name" placeholder="Nome" />
      <button type="button" @click="startGame">Iniciar</button>
    </div>
    <div v-else>
      <div>
        <p>Nome: {{ name }}</p>
        <p>Pontos: {{ moves }}</p>
        {{ stillCardsSelected }}
      </div>
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

    <div v-if="start && !stillCardsSelected">
      <p>Nome: {{ name }}</p>
      <p>Pontos: {{ moves }}</p>
      TERMINOU REiniciar ?
      <button type="button" @click="resetGame">Reiniciar</button>
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
      moves: 0,
      name: "",
      playingCards: [
        { name: "As espadas", isSelected: false, img: "" },
        { name: "Dois espadas", isSelected: false, img: "" },
        { name: "Três espadas", isSelected: false, img: "" },
        // { name: "Quatro espadas", isSelected: false, img: "" },
        // { name: "Cinco espadas", isSelected: false, img: "" },
        // { name: "Seis espadas", isSelected: false, img: "" },
        // { name: "Sete espadas", isSelected: false, img: "" },
        // { name: "Oito espadas", isSelected: false, img: "" },
        // { name: "Nove espadas", isSelected: false, img: "" },
        // { name: "Valete espadas", isSelected: false, img: "" },
        // {name: 'Dama espadas', isSelected: false, img: ''},
        // {name: 'Rei espadas', isSelected: false, img: ''},
      ],
      cardsGame: [],
      cardsSelected: [],
    };
  },
  created() {},
  methods: {
    startGame() {
      this.start = true;
      this.prepareCards();
    },
    resetGame() {
      this.start = false;
      this.name = "";
    },
    prepareCards() {
      this.cardsGame = [];
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
          this.moves++;
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
  computed: {
    stillCardsSelected() {
      return this.cardsGame.some((element) => !element.isSelected);
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  width: 75px;
  height: 100px;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 2px;
  position: relative;
  background: white;
  color: black;
  box-shadow: 1px 2px 4px black;

  &__suit {
    width: 100%;
    display: block;
  }

  &__suit--top {
    text-align: left;
    padding-left: 5px;
  }

  &__suit--bottom {
    position: absolute;
    bottom: 0px;
    text-align: left;
    transform: rotate(180deg);
    padding-left: 5px;
  }

  &__number {
    width: 100%;
    position: absolute;
    top: 38%;
    text-align: center;
  }
}
</style>
