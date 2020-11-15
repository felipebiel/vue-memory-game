import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playingCards: [],
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
  },
  mutations: {
    PUSH_CARDS(state, data) {
      state.playingCards.push(data);
    },
    EMPTY_PLAYINGCARDS(state) {
      state.playingCards = []
    }
  },
  actions: {
    displayInitialDeck(context) {
      context.commit('EMPTY_PLAYINGCARDS');
      for (let s = 0; s < context.state.suits.length; s++) {
        for (let r = 0; r < context.state.numbers.length; r++) {
          let card = {
            id: new Date(),
            name: `${context.state.numbers[r]} - ${context.state.suits[s]}`,
            number: context.state.numbers[r],
            suit: context.state.suits[s],
            isSelected: false,
          };
          context.commit('PUSH_CARDS', card);
        }
      }
    },
  },
  modules: {
  }
})
