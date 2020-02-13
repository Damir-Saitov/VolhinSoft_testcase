import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import axios from 'axios'

export const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        boards: [],
        api: 'http://89.108.99.3:8000/kanban/',
    },
    getters: {
        board: (state) => (id) => {
            for (let board of state.boards) {
                if (board.id === id) {
                    return board;
                }
            }
            console.log('Somithing wrong with BOARD: ID', id);
            return null;
        },
        boardIndex: (state) => (id) => {
            for (let i in state.boards) {
                if (state.boards[i].id === id) {
                    return i;
                }
            }
            return -1;
        },
        columns: (state, getters) => (idBoard) => {
            let board = getters.board(idBoard);
            if (board) {
                return board.columns;
            }
            return null;
        },
        column: (state, getters) => (ids) => {
            let columns = getters.columns(ids.board);
            for (let column of columns) {
                if (column.id === ids.column) {
                    return column;
                }
            }
            console.log('Somithing wrong with COLUMN: ID', ids.column);
            return null;
        },
        cards: (state, getters) => (ids) => {
            return getters.column(ids).cards;
        },
        cardIndex: (state, getters) => (ids) => {
            let cards = getters.cards({
                board: ids.board,
                column: ids.column
            });
            for (let i in cards) {
                if (cards[i].id === ids.card) {
                    return Number(i);
                }
            }
            return -1;
        },
    },
    mutations: {
        setBoards(state, boards) {
            state.boards = boards;
        },
        addBoard(state, board) {
            state.boards.push(board);
        },
        changeBoardName(state, payload) {
            payload.board.name = payload.name;
        },
        deleteBoard(state, index) {
            state.boards.splice(index, 1);
        },
        addColumn(state, payload) {
            payload.columns.push(payload.newColumn);
        },
        addCard(state, payload) {
            payload.cards.push(payload.newCard);
        },
        changeCardBody(state, payload) {
            payload.cards[payload.indexCard].body = payload.newBody;
        },
        deleteCard(state, payload) {
            payload.cards.splice(payload.indexCard, 1);
        },
        /*
        updateOrderCard(state, payload) {
            payload.cards[payload.index].order = payload.order;
        }
        */
        swap(state, payload) {
            let first = payload.array.splice(payload.indexFirst, 1);
            payload.array.splice(payload.indexSecond, 0, first[0]);
        },
        insertCard(state, payload) {
            payload.cards.splice(payload.indexCard, 0, payload.card);
        },
        changeCardColumn(state, payload) {
            payload.card.column = payload.column;
        }
    },
    actions: {
        setBoardsFromServer(context) {
            axios.get(context.state.api + 'board/')
            .then(response => {
                context.commit('setBoards', response.data);
            }).catch(e => {
                console.log(e);
            });
        },
        addBoard(context, name) {
            axios.post(context.state.api + 'board/', {
                'name': name,
            }).then(response => {
                context.commit('addBoard', response.data);
            }).catch(e => {
                console.log(e);
            });
        },
        changeBoardName(context, idName) {
            axios.patch(context.state.api + 'board/' + idName.id + '/', {
                'name': idName.name,
            }).then(response => {
                context.commit('changeBoardName', {
                    board: context.getters.board(idName.id),
                    name: response.data.name,
                });
            }).catch(e => {
                console.log(e);
            });
        },
        deleteBoard(context, id) {
            axios.delete(context.state.api + 'board/' + id + '/')
            .then(response => {
                context.commit('deleteBoard',
                    context.getters.boardIndex(id));
            }).catch(e => {
                console.log(e);
            });
        },
        addColumn(context, payload) {
            let columns = context.getters.columns(payload.idBoard);
            axios.post(context.state.api + 'column/', {
                'name': payload.nameColumn,
                'order': columns.length,
                'board': payload.idBoard,
            }).then(response => {
                context.commit('addColumn', {
                    columns,
                    newColumn: response.data,
                });
            }).catch(e => {
                console.log(e);
            });
        },
        addCard(context, payload) {
            axios.post(context.state.api + 'card/', {
                'column': payload.column.id,
                'body': payload.text,
                'order': payload.column.cards.length,
            }).then(response => {
                context.commit('addCard', {
                    cards: payload.column.cards,
                    newCard: response.data,
                });
            }).catch(e => {
                console.log(e);
            });
        },
        changeCardBody(context, payload) {
            axios.patch(context.state.api + 'card/' + payload.card.id + '/', {
                'body': payload.card.body,
            }).then(response => {
                context.commit('changeCardBody', {
                    cards: context.getters.cards({
                        board: payload.boardId,
                        column: payload.columnId,
                    }),
                    indexCard: context.getters.cardIndex({
                        board: payload.boardId,
                        column: payload.columnId,
                        card: payload.card.id,
                    }),
                    newBody: response.data.body,
                });
            }).catch(e => {
                console.log(e);
            });
        },
        updateOrderCards(context, payload) {
            for(let i = payload.start; i < payload.end; i++) {
                axios.patch(
                    context.state.api + 'card/' + payload.cards[i].id + '/',
                    {'order': i}
                ).then(response => {
                    /*
                    context.commit('updateOrderCard', {
                        cards: payload.cards,
                        index: i,
                        order: response.data.order,
                    });
                    */
                }).catch(e => {
                    console.log(e);
                });
            }
        },
        deleteCard(context, ids) {
            let cards = context.getters.cards({
                board: ids.board,
                column: ids.column,
            });
            let indexCard = context.getters.cardIndex(ids);
            axios.delete(context.state.api + 'card/' + ids.card + '/')
            .then(response => {
                context.commit('deleteCard', {cards, indexCard});
                context.dispatch('updateOrderCards', {
                    cards,
                    start: indexCard,
                    end: cards.length,
                });
            }).catch(e => {
                console.log(e);
            });
        },
        swapCards(context, payload) {
            let cards = context.getters.cards({
                board: payload.boardId,
                column: payload.element.column,
            });
            context.commit('swap', {
                array: cards,
                indexFirst: payload.oldIndex,
                indexSecond: payload.newIndex,
            });
            context.dispatch('updateOrderCards', {
                cards,
                start: Math.min(payload.oldIndex, payload.newIndex),
                end: Math.max(payload.oldIndex, payload.newIndex) + 1,
            });
        },
        insertCard(context, payload) {
            let abandedCards = context.getters.cards({
                board: payload.boardId,
                column: payload.element.column,
            });
            let indexCardInAbandedCards = context.getters.cardIndex({
                board: payload.boardId,
                column: payload.element.column,
                card: payload.element.id,
            });
            context.commit('deleteCard', {
                cards: abandedCards,
                indexCard: indexCardInAbandedCards,
            });
            context.dispatch('updateOrderCards', {
                cards: abandedCards,
                start: indexCardInAbandedCards,
                end: abandedCards.length,
            });
            
            axios.patch(
                context.state.api + 'card/' + payload.element.id + '/',
                {'column': payload.newColumnId}
            ).then(response => {
                context.commit('changeCardColumn', {
                    card: payload.element,
                    column: response.data.column,
                });
            }).catch(e => {
                console.log(e);
            });

            let newCards = context.getters.cards({
                board: payload.boardId,
                column: payload.newColumnId,
            });
            context.commit('insertCard', {
                cards: newCards,
                indexCard: payload.newIndex,
                card: payload.element,
            });
            context.dispatch('updateOrderCards', {
                cards: newCards,
                start: payload.newIndex,
                end: newCards.length,
            });
        },
        updateOrderColumns(context, payload) {
            for(let i = payload.start; i < payload.end; i++) {
                axios.patch(
                    context.state.api + 'column/' + payload.columns[i].id + '/',
                    {'order': i}
                ).then(response => {
                    
                }).catch(e => {
                    console.log(e);
                });
            }
        },
        swapColumns(context, payload) {
            context.commit('swap', {
                array: payload.columns,
                indexFirst: payload.oldIndex,
                indexSecond: payload.newIndex,
            });
            context.dispatch('updateOrderColumns', {
                columns: payload.columns,
                start: Math.min(payload.oldIndex, payload.newIndex),
                end: Math.max(payload.oldIndex, payload.newIndex) + 1,
            });
        },
    },
});
