export default {
    showSpinner(state) {
        state.spinner = true;
    },
    hideSpinner(state) {
        state.spinner = false;
    },
    setGroups(state, groups) {
        state.groups = groups;
    },
    setKPIs(state, kpis) {
        state.kpis = kpis;
    },
}