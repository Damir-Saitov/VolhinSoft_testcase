<template>
<v-app>
    <v-content class="overflow">
        <router-view></router-view>
    </v-content>
</v-app>
</template>

<script>

export default {
    created() {
        this.$store.dispatch('setBoardsFromServer');
    }
}
</script>

<style>
html, body {
    margin: 0;
    padding: 0;
}
.overflow {
    overflow: auto;
}
</style>
