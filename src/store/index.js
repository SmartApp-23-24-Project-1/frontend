import Vuex from "vuex";
import getters from '@/services/getters';
import mutations from '@/services/mutations';
import actions from '@/services/actions';

export default new Vuex.Store({
    state: {
        spinner: true,
        groups: [],
        kpis: [],
        kpi: [],
        units: [],
        darkMode: false,
    },
    getters,
    mutations,
    actions,
    modules: {}
});
