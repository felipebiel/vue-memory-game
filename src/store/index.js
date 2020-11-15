import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usersRank: [],
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
    },
    PUSH_USERSRANK (state, users) {
      state.usersRank = users
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
    pushUserToRank(context, user) {
      let usersRank = [];
      if(JSON.parse(localStorage.getItem('usersRank'))) {
        usersRank = JSON.parse(localStorage.getItem('usersRank'));
      }
      usersRank.push(user);
      localStorage.setItem('usersRank', JSON.stringify(usersRank));
      context.commit('PUSH_USERSRANK', usersRank);
    },
  },
  modules: {
  }
})
