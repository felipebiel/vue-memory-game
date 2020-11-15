import _cloneDeep from "lodash/cloneDeep";
import FormGame from "@/components/formGame/FormGame.vue"
import Card from "@/components/card/Card.vue"
import Score from "@/components/score/Score.vue"

export default {
    name: 'Home',
    components: {
        FormGame,
        Card,
        Score
    },
    data() {
        return {
          start: false,
          moves: 0,
          name: "",
          pairs: 2,
          cardsGame: [],
          cardsSelected: [],
        };
      },
      created() {
        this.$store.dispatch('displayInitialDeck')
      },
      methods: {
        startGame() {
          this.start = true;
          this.prepareCards();
        },
        resetGame() {
          this.moves = 0;
          this.start = false;
          this.name = "";
        },
        prepareCards() {
          this.cardsGame = [];
          const cards = this.$utils.shuffleArray(this.playingCards);
          this.cardsGame = this.$utils.shuffleArray(
            this.cardsGame.concat(
              _cloneDeep([...cards.slice(0, this.pairs)]),
              _cloneDeep([...cards.slice(0, this.pairs)])
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
                  this.cardsSelected.forEach(
                    (element) => (element.isSelected = false)
                  );
                  this.cardsSelected = [];
                }, 1000);
              } else {
                setTimeout(() => {
                  this.cardsSelected = [];
                  if(!this.stillCardsSelected) {
                    alert("Jogo Finalizado");
                    this.pushUserToRank();
                  }
                }, 500);
              }
              this.moves++;
            }
          }
        },
        pushUserToRank() {
            this.$store.dispatch('pushUserToRank', {name: this.name, moves: this.moves})  
        }
      },
      computed: {
        stillCardsSelected() {
          return this.cardsGame.some((element) => !element.isSelected);
        },
        playingCards() {
            return this.$store.state.card.playingCards
        }
      },
}