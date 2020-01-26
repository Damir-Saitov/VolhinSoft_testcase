<template>
    <div class='board' :id='board.id'>
        <div class='title'>
            {{ board.title }}
            <button class='edit' @click='editTitle'></button>
            <button class='delete' @click='deleteBoard'></button>
            <input v-model='board.title' class='edit' :id='"edit-"+board.id'
                @blur="hideEdit">
        </div>
        <router-link :to="{name: 'board', params: {id: board.id}}">
        <div class="board_link">
            <div
                    v-for='col in cols'
                    :key='col.id'
                    class='card'>
                {{ col.title }}</div>
        </div>
        </router-link>
    </div>
</template>

<script>
import divCard from './divCard'
import axios from 'axios'

export default {
    name: "divBoard",
    props: ["board"],
    components: {
        divCard
    },
    computed: {
        cols: function () {
            if (this.board.cols.length > 4) {
                return this.board.cols.splice(0, 4)
            }
            return this.board.cols
        }
    },
    methods: {
        editTitle: function (e) {
            let id = e.target.parentElement.parentElement.id;
            let input = document.getElementById('edit-' + id);
            input.style.display = 'inline';
            input.focus();
        },
        hideEdit: function (e) {
            let id = e.target.parentElement.parentElement.id;
            let input = document.getElementById('edit-' + id);
            input.style.display = 'none';
        },
        deleteBoard: function (e) {
            let id = e.target.parentElement.parentElement.id;
            this.$parent.$parent.$data.boards.splice(id - 1, 1);
        }
    }
}
</script>

<style lang="scss">
.board {
    margin: 10px;
    height: 300px;
    width: 300px;
    border: 3px solid darkgreen;
    border-radius: 5px;
    background-color: white;
}
.board .title {
    font-size: 15pt;
    position: sticky;
    background-color: greenyellow;
    text-align: center;
    height: 10%;
}
.board .card {
    position: relative;
    text-align: center;
    margin-top: 5%;
    left: 5%;
    height: 50px;
    width: 90%;
    background-color: darkseagreen;
    border-radius: 5px;
    line-height: 250%;
}
.board_link {
    position: relative;
    width: 100%;
    height: 85%;
}
button {
    height: 100%;
    width: 10%;
    border: none;
    background-color: inherit;
}
button.edit {
    position: absolute;
    left: 80%;
    background-image: url('/edit.png');
    background-size: cover;
}
button.delete {
    position: absolute;
    left: 90%;
    background-image: url('/delete.png');
    background-size: cover;
}
input.edit {
    display: none;
}
</style>