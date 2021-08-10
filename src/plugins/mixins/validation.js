import Vue from 'vue';

import { mapGetters } from 'vuex';

const Validation = {
    // eslint-disable-next-line no-shadow
    install(Vue) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    errors: 'validation/errors',
                }),
            },
        });
    },
};

Vue.use(Validation);
