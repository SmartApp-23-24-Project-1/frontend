<template>
  <div class="container-fluid content-wrapper" style="padding: 0 65px;">
    <div class="row">
      <div class="col-lg-4 p-0">
        <select v-model="group_by" class="secondary-btn w-50">
          <option :value="''" v-on:click="getAll">All</option>
          <option v-for="group in groups" v-bind:key="group" :value="group" v-on:click="getKPIGroup(group)"> {{group }}</option>
        </select>
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
  </div>
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
    }
  },
  computed: {
    groups() {
      return this.$store.getters.getGroups;
    },
    kpis() {
      return this.$store.getters.getAllKPIs;
    }
  },
  mounted() {
    this.$store.dispatch("getAllKPIs");
    this.$store.dispatch("getGroups");
    this.$store.commit("hideSpinner");
  },
  methods: {
    getAll() {
      this.$store.dispatch("getAllKPIs");
    },
    getKPIGroup(group) {
      this.$store.dispatch("getKPIs", group);
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
  box-shadow: 5px 5px 5px #d3d3d3;
}

</style>