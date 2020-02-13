<template>
<div class="column">
    <div class="column_name subtitle-1 text-center blue lighten-4">
        {{ column.name }}
    </div>
    <div class="card_container blue-grey lighten-5 pa-4">
        <draggable group="cards"
                   :disabled="!cardSwap"
                   :value="column.cards"
                   @change="change"
        >
            <Card v-for="card in column.cards"
                :key="card.id"
                :body="card.body"
                @update="$emit('changeCardBody', {id: card.id, body: $event})"
                @delete="$emit('deleteCard', card.id)"
            >
            </Card>
        </draggable>
    </div>
    <div v-if="!addingCard"
         @click="addingCard = true"
         class="add_card subtitle-1 text-center
             blue-grey--text blue lighten-4"
    >Add new card</div>
    <v-textarea v-else
                :auto-grow="true"
                :row-height="20"
                :autofocus="true"
                :rows="1"
                :solo="true"
                @blur="addCard($event.target)"
                class="blue lighten-4"
    >
    </v-textarea>
</div>
</template>

<script>
import {mapActions} from 'vuex';
import draggable from 'vuedraggable';

import Card from './Card';

export default {
    name: 'column',
    components: {
        Card,
        draggable,
    },
    props: {
        column: {
            type: Object,
            required: true,
        },
        cardSwap: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            addingCard: false,
        };
    },
    methods: {
        addCard(textarea) {
            this.addingCard = false;
            if (textarea.value === '') {
                return;
            }
            this.$store.dispatch('addCard', {
                column: this.column,
                text: textarea.value,
            });
        },
        change(e) {
            if (e.moved) {
                this.swapCards({...e.moved, boardId: this.column.board});
            } else if (e.added) {
                this.insertCard({
                    ...e.added,
                    boardId: this.column.board,
                    newColumnId: this.column.id,
                });
            }
        },
        ...mapActions([
            'swapCards',
            'insertCard',
        ]),
    },
}
</script>

<style scoped>
.column {
    width: 300px;
    border: 1px solid black;
    border-radius: 5px;
}
.column_name {
    border-radius: 5px 5px 0 0;
}
.card_container {
    box-shadow: inset 4px 0 0 0 #BBDEFB,
        inset -4px 0 0 0 #BBDEFB;;
}
.add_card {
    border-radius: 0 0 5px 5px;
    cursor: pointer;
}
.add_card:hover {
    color: black !important;
}
</style>