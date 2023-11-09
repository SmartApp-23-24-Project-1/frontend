import Vuex from "vuex";
import getters from '@/services/getters';
import mutations from '@/services/mutations';
import actions from '@/services/actions';

export default new Vuex.Store({
    state: {
        auth : false,
        user : [],
        spinner: true,
        start: 0,
        products: [],
        categories: [],
        totalCount: 0,
        query: null,
        catFilter: null,
        idOptsFilter: [],
        valuesFilter: [],
        totalProdsCart: 0,
        cart: [],
        totals: [],
        favTotalProducts: 0,
        favorites: Boolean,
        tocart: Boolean,
        token: null,
        refreshtoken: null,
        expiretoken: null,
        opened: false,//variabile per aprire il cerca
        openedSidebar: false,
        catName: "",
    },
    getters,
    mutations,
    actions,
    modules: {}
});
