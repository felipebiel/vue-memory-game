export default {
    name: 'Rank',
    created () {
        this.$store.dispatch('getUsersRank')  
    },
    computed: {
      rankUsers() {
        return this.$store.state.user.usersRank? this.$store.state.user.usersRank.sort((a, b) => a.moves - b.moves): [];
      }
    },
   }