let count = 0

const Svelte = {
    props: {
        id: "Some String",
        count,
        doCount() {
            count++
            return count
        }
    }
}

export default Svelte