import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {}
/*
{
    theme: {
        themes: {
            light: {
                primary: colors.red.darken1,
                secondary: colors.red.lighten4,
                accent: colors.indigo.base,
            },
        },
    },
}
*/

export default new Vuetify(opts)