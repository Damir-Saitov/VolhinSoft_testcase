<template>
    <div class='card' :id='"card-"+card.id'>
        <div class='title'>{{ card.title }}</div>
        <div class='text'>{{ card.text }}</div>
    </div>
</template>

<script>
export default {
    name: 'divCard',
    props: ['card']
}
</script>

<style lang="scss">
.card {
    position: relative;
    left: 5%;
    margin: 5px;
    background-color: aqua;
    width: calc(90% - 10px);
    border-radius: 5px;
}
.card .title {
    text-align: center;
}
.card .text {
    background-color: gainsboro;
}
</style>
