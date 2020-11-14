<template>
  <div class="home container">
    <div v-if="!start" class="form">
      <h1 class="form__title">Jogo da memória</h1>
      <input
        type="text"
        class="form__input form__input--text"
        v-model="name"
        placeholder="Nome"
      />
      <button
        type="button"
        class="form__input form__input--button"
        @click="startGame"
      >
        Iniciar
      </button>
    </div>
    <div v-else class="score">
      <h1 class="score__title">Jogo da memória</h1>
      <p class="score__title" v-if="!stillCardsSelected">Parabéns</p>
      <p v-if="!stillCardsSelected" class="score__text">Sua pontuação</p>

      <p class="score__text">Nome: {{ name }}</p>
      <p class="score__text">Pontos: {{ moves }}</p>

      <button
        v-if="!stillCardsSelected"
        type="button"
        class="score__button"
        @click="resetGame"
      >
        Reiniciar
      </button>

      <div id="cards" v-if="stillCardsSelected">
        <div
          class="card"
          :class="
            [card.isSelected ? 'card--front' : 'card--back'] +
            ' card' +
            suitsColors[card.suit]
          "
          v-for="(card, index) in cardsGame"
          :key="index"
          @click="selectedCard(card)"
        >
          <template v-if="card.isSelected">
            <span class="card__suit card__suit--top">{{ card.suit }}</span>
            <span class="card__number">{{ card.number }}</span>
            <span class="card__suit card__suit--bottom">{{ card.suit }}</span>
          </template>
        </div>
      </div>
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
      pairs: 2,
      numbers: [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
      ],
      suits: ["♥", "♦", "♠", "♣"],
      suitsColors: {
        "♥": "--red",
        "♦": "--red",
        "♠": "--black",
        "♣": "--black",
      },
      playingCards: [],
      // playingCards: [
      //   { name: "As espadas", isSelected: false, img: "" },
      //   { name: "Dois espadas", isSelected: false, img: "" },
      //   { name: "Três espadas", isSelected: false, img: "" },
      //   // { name: "Quatro espadas", isSelected: false, img: "" },
      //   // { name: "Cinco espadas", isSelected: false, img: "" },
      //   // { name: "Seis espadas", isSelected: false, img: "" },
      //   // { name: "Sete espadas", isSelected: false, img: "" },
      //   // { name: "Oito espadas", isSelected: false, img: "" },
      //   // { name: "Nove espadas", isSelected: false, img: "" },
      //   // { name: "Valete espadas", isSelected: false, img: "" },
      //   // {name: 'Dama espadas', isSelected: false, img: ''},
      //   // {name: 'Rei espadas', isSelected: false, img: ''},
      // ],
      cardsGame: [],
      cardsSelected: [],
    };
  },
  created() {},
  methods: {
    displayInitialDeck() {
      this.playingCards = [];
      this.cardsGame = [];
      for (let s = 0; s < this.suits.length; s++) {
        for (let r = 0; r < this.numbers.length; r++) {
          let card = {
            id: new Date(),
            name: `${this.numbers[r]} - ${this.suits[s]}`,
            number: this.numbers[r],
            suit: this.suits[s],
            isSelected: false,
          };
          this.playingCards.push(card);
        }
      }

      const cards = this.shuffleArray(this.playingCards);
      this.cardsGame = this.shuffleArray(
        this.cardsGame.concat(
          _cloneDeep([...cards.slice(0, this.pairs)]),
          _cloneDeep([...cards.slice(0, this.pairs)])
        )
      );
    },
    startGame() {
      this.start = true;
      this.displayInitialDeck();
      //this.prepareCards();
    },
    resetGame() {
      this.moves = 0;
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
            setTimeout(() => {
              alert("Errou!");
              this.cardsSelected.forEach(
                (element) => (element.isSelected = false)
              );
              this.cardsSelected = [];
            }, 500);
          } else {
            setTimeout(() => {
              this.cardsSelected = [];
              alert("Acertou mizeravi");
            }, 500);
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
.container {
  width: 80%;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
}
// cards

@keyframes flip-out {
  from { transform: rotateY(0deg);}
  to { transform: rotateY(180deg); }
}

@keyframes flip-in {
  from { transform: rotateY(180deg);}
  to { transform: rotateY(0deg); }
}

.card {
  cursor: pointer;
  width: 75px;
  height: 100px;
  float: left;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 2px;
  position: relative;
  box-shadow: 1px 2px 4px black;
  transition: 0.6s;
  transform-style: preserve-3d;

  &--back {
    background: url("../assets/images/cardback.gif");
    background-color: white;
    animation: flip-out 0.3s ease;
  }

  &--front {
    background: white;
    color: black;
    animation: flip-in 0.3s ease;
  }

  &--red {
    color: red;
  }

  &--black {
    color: black;
  }

  &__suit {
    width: 100%;
    display: block;

    &--top {
      text-align: left;
      padding-left: 5px;
    }

    &--bottom {
      position: absolute;
      bottom: 0px;
      text-align: left;
      transform: rotate(180deg);
      padding-left: 5px;
    }
  }

  &__number {
    width: 100%;
    position: absolute;
    top: 38%;
    text-align: center;
  }
}

#cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: space-between;
}

//home

.home {
  display: flex;
  justify-content: center;
}

/* FORM */

.form {
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  &__title {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 0;
  }

  &__input {
    height: 50px;
    font-size: 1.2rem;

    &--text {
      width: 250px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      padding-left: 10px;
      border: none;
    }

    &--button {
      border: none;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      background: #42b983;
      color: white;
    }
  }
}

//score

.score {
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  &__title {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 0;
  }

  &__text {
    font-size: 1.5rem;
    text-align: center;
  }

  &__button {
    height: 50px;
    font-size: 1.2rem;
    background: #42b983;
    color: white;
    border-radius: 8px;
    border: none;
    width: 100%;
  }
}
</style>
