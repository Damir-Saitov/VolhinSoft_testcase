<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'app',
    data() {
        return {
            boards: null,
            endpoint: 'https://my-json-server.typicode.com/' +
                'Damir-Saitov/VolhinSoft_testcase/boards'
        }
    },
    created: function () {
        axios.get(this.endpoint)
        .then(response => {
            this.boards = response.data;
        })
        .catch(e => {
            console.error(e);
        });
    }
}
</script>

<style lang="scss">
body {
    background-color: lightblue;
}
</style>
