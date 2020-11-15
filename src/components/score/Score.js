import Card from "@/components/card/Card.vue"

export default {
    name: 'Score',
    components: {
        Card,
    },
    props: {
        stillCardsSelected: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: ''
        },
        moves: {
            type: Number,
            default: 0
        },
        cardsGame: {
            type: Array,
            default: []
        }
    },
    methods: {
        emitSelectedCard(card) {
            this.$emit('emitSelectedCard', card)
        },
        emitResetGame() {
            this.$emit('emitResetGame')
        }
    },
}