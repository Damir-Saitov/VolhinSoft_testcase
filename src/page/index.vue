<template>
    <div id="index">
        <divBoard
            v-for="board in boards"
            :key="board.id"
            :id="board.id"
            :board="board"
        ></divBoard>
        <div class='board' id='create' @click="createNewBoard"></div>
    </div>
</template>

<script>
import axios from 'axios'
import divBoard from '../components/divBoard.vue'

export default {
    computed: {
        boards() {
            // Вместо глобального хранилища vuex,
            // которое я не смог использовать
            return this.$parent.$data.boards;
        }
    },
    methods: {
        createNewBoard: function () {
            let id = this.boards.length + 1;
            let title = 'New Board';
            this.boards.push({
                'id': id,
                'title': title,
                'order': [],
                'cols': []
            });
        }
    },
    components: {
        divBoard
    }
}
</script>

<style lang="scss">
#index {
    display: flex;
    flex-wrap: wrap;
}
.board#create {
    background-image: url("/add.jpg");
    background-size: cover;
    cursor: pointer;
}
a {
    text-decoration: none;
    color: black;
}
a:active {
    color: black;
}
</style>
