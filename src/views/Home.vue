<template>
  <div class="container-fluid content-wrapper">
    <div class="row">
      <!--<div class="col-lg-4 p-0 mx-3">
        <select v-model="group_by" class="form-select">
          <option v-for="source in sources" v-on:change="groupKpi(source.name)" v-bind:key="source" :value="source"> {{ source.name }}</option>
        </select>
      </div>-->
      <div class="col-lg-4" style="padding: 0 65px;">
        <select class="secondary-btn w-50">
          <option class="" selected>Group by</option>
          <option class="" value="Machine 1">Machine 1</option>
          <option class="" value="Machine 2">Machine 2</option>
          <option class="" value="none">None</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 p-0 mx-3 my-2" v-for="kpi in this.kpis" v-bind:key="kpi.name">
        <div class="card card-rounded" style="width: 300px">
          <div class="card-body">
            <div class="my-3">
              <p class="card-title-kpi card-title-dash text-uppercase">{{ kpi.description }} </p>
              <h3 class="rate-percentage">{{ kpi.value }}{{ kpi.unit }}</h3>
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
      kpis: [],
      //sources: [], per il group_by
      medical: false,
      usage_entries: 10,
    }
  },
  components: {},
   mounted() {
     this.getKPIs();
     //this.getGroupBy(); , per il group_by
  },
  methods: {
    async getKPIs() {
      //this.$store.commit("showSpinner");
      await axios.get(BASE_URL + "kpis", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
          //'group_by':
        }
      }).then(response => {
        this.kpis = response.data.data;
       /*
       NON CANCELLATE QUESTO COMMENTO GRAZIE
       let filteredObjects = this.kpis.filter(item => item.name === "oee");
        if (filteredObjects.length > 0) {
          //kpi lato industrial
          this.medical = false;
        } else {
          //kpi lato industrial
          this.medical = true;
        }*/
        //this.$store.commit("hideSpinner");
      }).catch((error) => {
        console.log(error);
        //this.$store.commit("hideSpinner");
      });
    },
   /* async getGroupBy() {
      await axios.get(BASE_URL + "group_by", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(response => {
        this.sources = response.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    async groupKpi(group) {
      this.$store.commit("showSpinner");
      await axios.post(BASE_URL + "kpis-group" , {
        "group-by": group,
      },{
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(response => {
        this.kpis = response.data.data;
        this.$store.commit("hideSpinner");
      }).catch((error) => {
        console.log(error);
        this.$store.commit("hideSpinner");
      });
    }*/
  }
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

</style>