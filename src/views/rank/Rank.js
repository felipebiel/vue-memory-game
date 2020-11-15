export default {
    name: 'Rank',
    computed: {
      rankUsers() {
        return JSON.parse(localStorage.getItem('usersRank')) ? JSON.parse(localStorage.getItem('usersRank')).sort((a, b) => a.moves - b.moves) : [];
      }
    },
   }