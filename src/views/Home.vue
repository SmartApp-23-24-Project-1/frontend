<template>
  <div class="container content-wrapper p-0">
    <div class="row">
      <div class="col-lg-3 p-0">
        <!--GRUPPI-->
        <select v-model="group_by" class="secondary-btn w-75 select-filter">
          <option :value="''" v-on:click="getKPIs()">All</option>
          <option v-for="group in groups" v-bind:key="group" :value="group" v-on:click="getKPIs()"> {{ group }}</option>
        </select>
        <!--FREQUENZA-->
      </div>
      <div class="col-lg-3 p-0">
        <select v-model="by_freq" class="secondary-btn w-75 select-filter">
          <option :value="''" v-on:click="getKPIs()">All</option>
          <option value="1 Day" v-on:click="getKPIs()">1 Day</option>
          <option value="1 Week" v-on:click="getKPIs()">1 Week</option>
          <option value="1 Month" v-on:click="getKPIs()">1 Month</option>
          <option value="1 Year" v-on:click="getKPIs()">1 Year</option>
        </select>
      </div>
      <div class="col-lg-3 p-0">
        <!-- UNITA -->
        <select v-model="by_unit" class="secondary-btn w-75 select-filter">
          <option :value="''" v-on:click="getKPIs()">All</option>
          <option v-for="unit in units" v-bind:key="unit" :value="unit" v-on:click="getKPIs()"> {{ unit }}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-4 p-0" v-for="kpi in kpis" v-bind:key="kpi.name">
      <div class="card card-rounded my-3" style="width: 90%">
        <div class="card-body">
          <div class="my-3">
            <p class="card-title-kpi card-title-dash">{{ kpi.value }}{{ kpi.unit }}</p>
            <p class="rate-percentage">{{ kpi.description }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--
  NON CANCELLATE QUESTO COMMENTO GRAZIE
  <div class="col-lg-12" v-if="this.medical">
    <p> pappappero </p>
  </div>
  <div class="col-lg-12" v-else>
    <div class="row">
      <div class="col-lg-6" v-for="kpi in this.kpis" v-bind:key="kpi.name">
        <div class="card card-rounded">
          <div class="card-body">
            <div class="my-3">
              <p  v-if="kpi.name === 'oee'" class="card-title-kpi card-title-dash text-uppercase">{{ kpi.description }} <span class="text-kpi"> (Overall Equipment Effectiveness) </span></p>
              <h3 class="rate-percentage">{{ kpi.value }}{{ kpi.unit }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p> trallallero industrial </p>
  </div>-->
</template>


<script>
import axios from "axios";
import {BASE_URL} from "@/constants/constants";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      group_by: '',
      by_freq: '',
      by_unit: '',
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
  },
  mounted() {
    this.$store.dispatch("getUnits");
    this.$store.dispatch("getGroups");
    this.$store.dispatch("getKPIs", this.group_by, this.by_freq, this.by_unit);
    this.$store.commit("hideSpinner");
  },
  methods: {
    getKPIs() {
      this.$store.dispatch("getKPIs", {
        'groupby': this.group_by,
        'filterbyfreq': this.by_freq,
        'filterbyunit': this.by_unit,
      });
    },
  },
}


</script>

<style scoped>
.card-title-kpi {
  font-size: 21px;
  color: #010101;
  text-transform: capitalize;
  font-weight: 600;
  margin: 0;
}

.card {
  box-shadow: 5px 5px 5px var(--shadow-color);
}

.select-filter {
  box-shadow: 5px 5px 5px var(--shadow-color);
  border-right: 10px solid #494949;
  cursor: pointer;
}

</style>