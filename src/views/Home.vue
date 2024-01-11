<template>
  <div class="container content-wrapper mt-5" style="background-color: var(--bg-color);">
    <div class="row d-flex justify-content-center mb-2">
      <!--DATA-->
      <div class="col-12 col-lg-3">
        <VueDatePicker v-model="by_date" :enable-time-picker="false" :format="formatDate" auto-apply :dark="darkMode"
                       @update:model-value="getKPIs()"></VueDatePicker>
      </div>
      <div class="col-6 col-md-4 col-lg-2">
        <!--GRUPPI-->
        <select v-model="group_by" class="form-select select-filter">
          <option :value="null" v-on:click="getKPIs()">All groups</option>
          <option v-for="group in groups" v-bind:key="group" :value="group" v-on:click="getKPIs()"> {{ group }}</option>
        </select>
        <!--FREQUENZA-->
      </div>
      <div class="col-6 col-md-4 col-lg-2">
        <select v-model="by_freq" class="form-select select-filter">
          <option :value="null" v-on:click="getKPIs()">All freqs</option>
          <option value="1 Day" v-on:click="getKPIs()">1 Day</option>
          <option value="1 Week" v-on:click="getKPIs()">1 Week</option>
          <option value="1 Month" v-on:click="getKPIs()">1 Month</option>
          <option value="1 Year" v-on:click="getKPIs()">1 Year</option>
        </select>
      </div>
      <div class="col-6 col-md-4 col-lg-2">
        <!-- UNITA -->
        <select v-model="by_unit" class="form-select select-filter">
          <option :value="null" v-on:click="getKPIs()">All units</option>
          <option v-for="unit in units" v-bind:key="unit" :value="unit" v-on:click="getKPIs()"> {{ unit }}</option>
        </select>
      </div>
      <div class="col-6 col-md-4 col-lg-1 d-flex align-content-center">
        <svg style="cursor:pointer" v-on:click="resetFilters()" xmlns="http://www.w3.org/2000/svg" height="2.5em" fill="#484848" viewBox="0 0 384 512">
          <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
      </div>
    </div>
    <div class="row gy-4 mt-4">
      <template v-for="kpi in kpis">
        <div class="col-md-6 col-lg-4 col-xxl-3" v-if="kpi.enabled" v-bind:key="kpi.name">
          <div class="card card-rounded">
            <div class="card-body">
              <div class="my-3">
                <p class="card-title-kpi card-title-dash">{{ kpi.value }}{{ kpi.unit }}</p>
                <p class="rate-percentage mt-2">{{ kpi.description }} </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import {BASE_URL} from "@/constants/constants";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",

  components: { VueDatePicker },

  data() {
    return {
      group_by: null,
      by_freq: null,
      by_unit: null,
      by_date: null,
    }
  },
  computed: {
    groups() {
      return this.$store.getters.getGroups;
    },
    kpis() {
      return this.$store.getters.getKPIs;
    },
    units() {
      return this.$store.getters.getUnits;
    },
    darkMode() {
      return this.$store.state.darkMode
    }
  },
  mounted() {
    this.$store.dispatch("getUnits");
    this.$store.dispatch("getGroups");
    this.$store.dispatch("getKPIs", this.group_by, this.by_freq, this.by_unit, this.formatDate(this.by_date));
    this.$store.commit("hideSpinner");
  },
  methods: {
    getKPIs() {
      this.$store.dispatch("getKPIs", {
        'groupby': this.group_by,
        'filterbyfreq': this.by_freq,
        'filterbyunit': this.by_unit,
        'filterbydate': this.formatDate(this.by_date)
      });
    },
    formatDate(date) {
      if(date === null) return null
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    resetFilters() {
      this.group_by = null;
      this.by_freq = null;
      this.by_unit = null;
      this.by_date = null;
      this.$store.dispatch("getKPIs", {
        'groupby': null,
        'filterbyfreq': null,
        'filterbyunit': null,
        'filterbydate': null
      });
    }
  },
}


</script>

<style scoped>
.card-title-kpi {
  font-size: 21px;
  color: var(--fg-color);
  text-transform: capitalize;
  font-weight: 600;
  margin: 0;
}

.card {
  box-shadow: 5px 5px 5px var(--shadow-color);
  background-color: var(--second-color);
  border: 0;
}

.rate-percentage {
  color: var(--fg-color);
}

.select-filter {
  box-shadow: 5px 5px 5px var(--shadow-color);
  border: 0;
  cursor: pointer;
  font-size: 18px;
  background-color: var(--second-color);
  color: var(--fg-color);
}

i.bi {
  font-size: 24px;
  cursor: pointer;
}

/*
BREAKPOINT DI BOOTSTRAP :)

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) { ... }

 */

</style>