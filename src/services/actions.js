import axios from "axios";
import {BASE_URL} from "@/constants/constants";

export default {
    async getGroups({commit}) {
        let response = await axios.get(BASE_URL + "groups", {
            headers: {
                withCredentials: 'true',
                'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
            }
        });
        commit('setGroups', response.data.data.groups);
    },
    async getAllKPIs({commit}) {
        let response = await axios.get(BASE_URL + "kpis", {
            headers: {
                withCredentials: 'true',
                'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
            }
        });
        commit('setKPIs', response.data.data);
    },
    async getKPIs({commit}, payload) {
        let response = await axios.get(BASE_URL + "kpis", {
            headers: {
                withCredentials: 'true',
                'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
                'groupby': payload,
            }
        });
        commit('setKPIs', response.data.data);
    },
}