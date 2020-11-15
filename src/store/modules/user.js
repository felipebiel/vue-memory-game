export default {
    state: {
        usersRank: [],
    },
    mutations: {
        PUSH_USERSRANK(state, users) {
            state.usersRank = users
        }
    },
    actions: {
        pushUserToRank(context, user) {
            let usersRank = [];
            if (JSON.parse(localStorage.getItem('usersRank'))) {
                usersRank = JSON.parse(localStorage.getItem('usersRank'));
            }
            usersRank.push(user);
            localStorage.setItem('usersRank', JSON.stringify(usersRank));
            context.commit('PUSH_USERSRANK', usersRank);
        },
        getUsersRank(context) {
            let usersRank = [];
            if (JSON.parse(localStorage.getItem('usersRank'))) {
                usersRank = JSON.parse(localStorage.getItem('usersRank'));
            }
            context.commit('PUSH_USERSRANK', usersRank);
        }
    }
}