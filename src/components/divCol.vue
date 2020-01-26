<template>
    <div class='col' :id='"col-"+col.id'>
        <div class='name'>{{ col.title }}</div>
        <div class='container'
                v-dragula="cards"
                bag='cards bag'>
            <divCard
                v-for='card in cards'
                :key='card.id'
                :card='card'>
            </divCard>
        </div>
    </div>
</template>

<script>
import divCard from "./divCard"

export default {
    name: "divCol",
    props: ["col"],
    components: {
        divCard
    },
    data() {
        return {
            cards: this.col.cards
        }
    }
}
</script>

<style lang="scss">
.col {
    margin: 10px;
    height: 500px;
    width: 300px;
    border: 3px solid darkgreen;
    border-radius: 5px;
    background-color: white;
}
.col .name {
    font-size: 15pt;
    position: sticky;
    background-color: greenyellow;
    text-align: center;
    line-height: 250%;
    height: 10%;
}
</style>
