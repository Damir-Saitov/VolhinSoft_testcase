<template>
<div class="board_page">
    <v-toolbar :flat="true"
               :dense="true"
               color="blue"
               class="fixed_toolbar mt-n12"
    >
        <v-btn @click="onBoardPage"
               :depressed="true"
        >
            Back
        </v-btn>
        <v-btn :depressed="true"
               @click="columnSwap = !columnSwap"
               :class="buttonSwapClass"
               class="ml-10"
        >{{ swap }}</v-btn>
    </v-toolbar>
    <div class="d-flex flex-md-nowrap align-start pa-5 mt-12">
        <draggable group="columns"
                   :disabled="!columnSwap"
                   :value="columns"
                   @change="change"
                   class="d-flex flex-md-nowrap align-start"
        >
            <Column v-for="column in columns"
                    :key="column.id"
                    :column="column"
                    :cardSwap="!columnSwap"
                    class="mr-5 flex-shrink-0"
                    @changeCardBody="changeCardBody({
                        boardId: Number(id),
                        columnId: column.id,
                        card: $event,
                    })"
                    @deleteCard="deleteCard({
                        board: Number(id),
                        column: column.id,
                        card: $event
                    })"
            ></Column>
        </draggable>
        <AddColumn @add="addColumn({idBoard: Number(id), nameColumn: $event})"
                   :draggable="false"
                   class="addColumn mr-5 flex-shrink-0">
        </AddColumn>
    </div>
</div>
</template>

<script>
import {mapActions} from 'vuex';
import draggable from 'vuedraggable';

import AddColumn from '../components/AddElement';
import Column from '../components/Column';

export default {
    name: 'board',
    props: {
        id: {
            type: [Number, String],
            required: true,
        },
    },
    components: {
        AddColumn,
        Column,
        draggable,
    },
    data() {
        return {
            columnSwap: false,
        };
    },
    computed: {
        columns() {
            return this.$store.getters.columns(Number(this.id));
        },
        swap() {
            return !this.columnSwap ? 'Swap columns' : 'Swap cards';
        },
        buttonSwapClass() {
            return !this.columnSwap ? 'blue lighten-4' : '';
        },
    },
    methods: {
        ...mapActions([
            'addColumn',
            'changeCardBody',
            'deleteCard',
            'swapColumns',
        ]),
        onBoardPage() {
            this.$router.push({name: 'index'});
        },
        change(e) {
            console.log(e);
            this.swapColumns({columns: this.columns, ...e.moved});
        }
    },
}
</script>

<style scoped>
.fixed_toolbar {
    position: fixed;
    width: 100%;
}
.addColumn {
    border: 1px solid grey;
    height: 300px;
    width: 300px;
    border-radius: 10px;
}
</style>