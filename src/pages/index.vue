<template>
<div class="d-flex flex-wrap pa-5">
    <DemoBoard
        v-for="board in boards"
        :key="board.id"
        :board="board"
        @changename="changeBoardName({id: board.id, name: $event})"
        @delete="deleteBoard(board.id)"
        class="board"
    >
    </DemoBoard>
    <AddBoard
        @add="addBoard"
        class="board"
    >
    </AddBoard>
</div>
</template>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';

import AddBoard from '../components/AddElement';
import DemoBoard from '../components/DemoBoard';

export default {
    name: 'index',
    components: {
        AddBoard,
        DemoBoard,
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState([
            'boards',
        ]),
    },
    methods: {
        ...mapActions([
            'addBoard',
            'changeBoardName',
            'deleteBoard'
        ]),
    }
}
</script>

<style scoped>
.board {
    border: 1px solid grey;
    height: 300px;
    width: 300px;
    border-radius: 10px;
}
</style>