<template>
    <div>
        <router-link :to="{name: 'index'}" class="back">
            Back
        </router-link>
        <div :id='"board-"+id' v-if='board'>
            <h2>{{ board.title }}</h2>
            <div class='certain_board' v-dragula='cols' bag='cols bag'>
                <divCol
                    v-for='col in cols'
                    :key='col.id'
                    :col='col'>
                </divCol>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import divCol from '../components/divCol.vue'

export default {
    props: ['id'],
    computed: {
        board() {
            // Вместо глобального хранилища vuex,
            // которое я не смог использовать
            return this.$parent.$data.boards[this.id - 1];
        },
        cols() {
            return this.board.cols;
        }
    },
    components: {
        divCol
    }
}
</script>

<style lang="scss">
.certain_board {
    display: flex;
    flex-wrap: wrap;
}
div h2 {
    position: relative;
    display: inline;
    left: 1%;
    top: 100%;
    text-align: left;
    text-decoration: underline;
}
a.back {
    display: inline;
    float: left;
    width: 75px;
    height: 30px;
    text-align: center;
    border-radius: 10px;
    line-height: 200%;
    background-color: green;
    transition: 0.3s;
}
a.back:hover {
    background-color: lightgreen;
}
</style>
