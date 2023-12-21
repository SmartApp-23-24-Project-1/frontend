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
    setKPI(state, kpi) {
        state.kpi = kpi;
    },
    setUnits(state, units) {
        state.units = units;
    },
}