<template>
<v-card :outlined="true"
>
    <v-card-text v-if="!editing"
                 @dblclick="startChange"
                 class="pa-2"
    >{{ body }}
    </v-card-text>
    <v-textarea v-else
                @blur="changeCardBody($event.target.value)"
                :rows="body.split('\n').length"
                :value="body"
                :autofocus="true"
                :no-resize="true"
                :auto-grow="true"
                :hide-details="true"
                :solo="true"
                :clearable="true"
                ref="input"
                class="pa-2 body-2 grey lighten-4"
    ></v-textarea>
</v-card>
</template>

<script>
import boardVue from '../pages/board.vue';

export default {
    name: 'card',
    props: {
        body: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
        };
    },
    methods: {
        startChange() {
            this.editing = true;
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        },
        changeCardBody(newBody) {
            this.editing = false;
            if (newBody === '') {
                this.$emit('delete');
            } else if (newBody !== this.body) {
                this.$emit('update', newBody);
            }
        },
    },
}
</script>

<style scoped>
div > div:first-child {
    white-space: pre-line;
}
</style>