import _cloneDeep from "lodash/cloneDeep";
import FormGame from "@/components/formGame/FormGame.vue"
import Card from "@/components/card/Card.vue"

export default {
    name: 'Home',
    components: {
        FormGame,
        Card
    },
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
          cardsGame: [],
          cardsSelected: [],
        };
      },
      created() {
        this.displayInitialDeck();
      },
      methods: {
        displayInitialDeck() {
          this.playingCards = [];
          
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
        },
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
          const cards = this.shuffleArray(this.playingCards);
          this.cardsGame = this.shuffleArray(
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
          let usersRank = [];
          if(JSON.parse(localStorage.getItem('usersRank'))) {
            usersRank = JSON.parse(localStorage.getItem('usersRank'));
          }
          usersRank.push({name: this.name, moves: this.moves});
          localStorage.setItem('usersRank', JSON.stringify(usersRank));
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
}