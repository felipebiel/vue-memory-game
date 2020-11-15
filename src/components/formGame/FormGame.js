export default {
    name: 'FormGame',
    props: {
        name: {
            type: String,
            default: null
        },
    },
    methods: {
        emitStartGame() {
            this.$emit('emitStartGame')
        }
    },
}