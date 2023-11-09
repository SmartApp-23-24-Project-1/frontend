/*import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";

export default {
    async getProducts({commit}, payload) {
        let url = (payload.idOption && payload.value) || payload.slugCategory ? "products/filter" : "products";
        let prods = await axios.post(url, {
            "start": payload.start,
            "slugCategory": payload.slugCategory,
            "limit": 12,
            "idOptions": payload.idOptions,
            "values": payload.values,
            //"excludeCats": payload.excludeCats,
            "description": payload.description,
            "type": "website",
            "tags": payload.tags,
        });
        commit('hideSpinner');
        commit('setStart', payload.start + 12);
        commit('setProducts', prods.data.products);
        commit('SET_CATNAME', prods.data.catName);
        commit('setTotalCount', prods.data.totalCount);
    },
    async getCategories({commit}) {
        let cats = await axios.get("categories?start=0&limit=100&type=website");
        commit('setCategories', cats.data.categories);
    },
    async logout({commit}) {
        let token = localStorage.getItem("token");
        await axios.get('logout', {
            headers: {Authorization: `Bearer ${token}`}
        }).then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshtoken');
            localStorage.removeItem("expires");
            localStorage.removeItem("user");
            commit("SET_USER", []);
            commit("SET_AUTH", false);
            router.push('/');
        }).catch(error => {
            console.log(error);
        });
    },
}*/