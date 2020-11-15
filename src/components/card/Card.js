export default {
    name: 'Card',
    props: {
        card: {
            required: false,
            type: Object,
            default: {}
        },
    },
    data() {
        return {
            suitsColors: {
                "♥": "--red",
                "♦": "--red",
                "♠": "--black",
                "♣": "--black",
              },
        }
    },
}