<template>
<div class="demo_board mr-5 mb-3">
    <div class="title blue lighten-2">
        <h3>{{ board.name }}</h3>
        <div v-if="editName" class="edit_container">
            <input v-model="newName"
                   class="title_input"
                   type="text"
            >
            <button @click="acceptChange"
                    class="accept_title button"
            ></button>
        </div>
        <button @click="toggleEdit"
                class="edit_title button"
        >
        </button>
        <button @click="deleteBoard"
                class="delete_board button"
        >
            <span>X</span>
        </button>
    </div>
    <router-link :to="{name: 'board', params: {id: board.id}}"
    >
        <ul class="tables_title ma-0 pa-2">
            <li v-for="column in board.columns"
                :key="column.id"
                class="blue lighten-4 mb-2 text-center"
            >{{ column.name }}</li>
        </ul>
    </router-link>
</div>
</template>

<script>

export default {
    name: 'DemoBoard',
    props: {
        board: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editName: false,
            newName: this.board.name,
        };
    },
    methods: {
        toggleEdit() {
            this.editName = !this.editName;
            this.newName = this.board.name;
        },
        acceptChange() {
            this.editName = false;
            this.$emit('changename', this.newName);
        },
        deleteBoard() {
            this.$emit('delete');
        },
    },
}
</script>

<style scoped>
.demo_board {
    position: relative;
    display: flex;
    flex-direction: column;
}

.title {
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 9px 9px 0 0;
}

.title > h3 {
    width: 85%;
    text-align: center;
    margin: 0;
    margin: auto;
    line-height: 1.5em;
    min-height: 1.5em;
}

.edit_container {
    position: relative;
}

.title_input {
    text-align: center;
    width: calc(100% - 10px);
    line-height: 1.5em;

    background-color: white;
}

.button {
    position: absolute;
    border: none;
    outline: none;
}

.accept_title {
    right: 10px;
    bottom: 1px;
    height: 1.5em;
    width: 1.5em;
    /* resize */
    background-image: url('/src/picture/accept.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: transparent;
}

.accept_title:active {
    filter: drop-shadow(0 0 1px black);
}

.edit_title {
    display: none;
    right: 3px;
    top: 3px;
    width: 25px;
    height: 25px;
    background-image: url('/src/picture/edit.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: transparent;
}

.delete_board {
    display: none;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    border-radius: 8px 0 100% 0;
    background-color: red;
}

.delete_board > span {
    display: inline-block;
    position: relative;
    top: -5px;
    left: -2px;
    color: white;
    font-weight: bold;
    font-size: 14px;
    vertical-align: top;
}

.delete_board:active {
    background-color: darkred;
}

.edit_title:active {
    filter: drop-shadow(0 0 1px black);
}

.edit_title, .delete_board {
    display: block;
}

.demo_board > a {
    flex-grow: 1;
    display: flex;

    overflow: auto;
}

.tables_title {
    list-style: none;
    border-radius: 0 0 9px 9px;
    width: 100%;
}

.tables_title > li {
    display: inline-block;
    width: 100%;
    height: 2em;
}
</style>