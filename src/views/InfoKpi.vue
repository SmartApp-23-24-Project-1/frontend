<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <!-- <p class="title"> Info about {{ kpi.name }} </p> -->
        <p class="title"> Info about {{ kpi.name }} </p>
        <div class="row d-flex justify-content-center">
          <div class="col-lg-8 form mt-3">
            <div class="row">
              <div class="col-lg-6">
                <p class="form-label my-4">Name: <span class="value"> {{ kpi.name == null ? "not defined" : kpi.name}}</span></p>
                <p class="form-label my-4">Frequency: <span class="value"> {{ kpi.frequency == null ? "not defined" : kpi.frequency}}</span></p>
                <p class="form-label my-4">Counter: <span class="value"> {{ kpi.counter == null ? "not defined" : kpi.counter}}</span></p>
              </div>
              <div class="col-lg-6">
                <p class="form-label my-4">Value: <span class="value"> {{ kpi.value == null ? "not defined" : kpi.value }} {{ kpi.unit == null ? "not defined" : kpi.unit}} </span></p>
                <p class="form-label my-4">Last Update: <span class="value"> {{ format(kpi.last_update) }}</span></p>
                <p class="form-label my-4">Creation date: <span class="value"> {{ format(kpi.creation_date) }}</span></p>
              </div>
              <div class="col-lg-12 pt-0">
                <p class="form-label mb-4">Description: <span class="value"> {{ kpi.description == null ? "not defined" : kpi.description }}</span></p>
                <p class="form-label my-4">Taxonomy: <span class="value"> {{ kpi.taxonomy == null ? "not defined" : kpi.taxonomy }}</span></p>
                <p class="form-label my-4">Range: <span class="value"> {{ kpi.range == null ? "not defined" : kpi.range}}</span></p>
              </div>
            </div>
            <div class="text-end">
              <router-link to="/source">
                <svg xmlns="http://www.w3.org/2000/svg" height="3em" fill="#1b3fb0" viewBox="0 0 384 512">
                  <path
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "@/constants/constants";

export default {
  name: "InfoKpi",
  data() {
    return {
      kpi: [],
      kpi_id: null,
    }
  },
  mounted() {
    this.kpi_id = this.$route.params.kpi_id;
    this.getKPI()
  },
  methods: {
    async getKPI() {
      await axios.get(BASE_URL + 'kpi/' + this.kpi_id, {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(response => {
        console.log(response);
        this.kpi = response.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    format(value) {
      if (isNaN(value)) return "not defined"

      let date = new Date(value);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      return day + '-' + month + '-' + year;
    }
  }
}

</script>

<style scoped>
.value {
  font-size: 15px;
  font-weight: 300;
}

.form-label {
  font-weight: 600;
}
</style>