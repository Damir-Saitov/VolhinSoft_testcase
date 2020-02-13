<template>
<div>
    <div v-if="!adding"
            @click="startAdding"
            class="curtain duration"
    ></div>
    <form v-else
            @submit.prevent="addBoard"
            class="input_data"
    >
        <v-btn :absolute="true"
                :right="true"
                :top="true"
                @click="adding = false"
        >close</v-btn>
        <v-text-field :autofocus="true"
                        :filled="true"
                        :clearable="true"
                        :outlined="true"
                        @change="name = $event"
                        label="Input name"
                        class="text_field"
        >
        </v-text-field>
        <v-btn :elevation="0"
                @click="addBoard"
                :large="true"
                class="add_btn blue lighten-2"
        >Add</v-btn>
    </form>
</div>
</template>

<script>

export default {
    data() {
        return {
            adding: false,
            name: '',
        }
    },
    computed: {

    },
    methods: {
        startAdding() {
            this.adding = true;
        },
        addBoard() {
            this.adding = false;
            if (this.name !== '') {
                this.$emit('add', this.name);
            }
        }
    }
}
</script>

<style scoped>
.curtain {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: aqua;
    border-radius: 10px;
    cursor: pointer;
}
.curtain::before, .curtain::after {
    content: '';
    position: absolute;
    border-radius: 5px;
}
.curtain::before {
    background-color: white;
    width: 50%;
    height: 10%;
    left: 25%;
    top: 45%;
}
.curtain::after {
    background-color: white;
    width: 10%;
    height: 50%;
    left: 45%;
    top: 25%;
}
.input_data {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
}
.input_data .text_field {
    flex-grow: 0;
}

</style>