export default {
    name: 'Rank',
    created () {
        this.$store.dispatch('getUsersRank')  
    },
    computed: {
      rankUsers() {
        return this.$store.state.user.usersRank;
      }
    },
   }