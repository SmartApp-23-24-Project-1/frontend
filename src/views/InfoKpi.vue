<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <!-- <p class="title"> Info about {{ kpi.name }} </p> -->
        <p class="title"> Info about KPI </p>
        <div class="row d-flex justify-content-center">
          <div class="col-lg-8 form mt-3">
            <div class="row">
              <div class="col-lg-6">
                <!--<p class="form-label my-4">Name: <span class="value"> {{ kpi.name }}</span></p>
                <p class="form-label my-4">Source: <span class="value"> {{ kpi.source }}</span></p>
                e così via
                -->
                <p class="form-label my-4">Name: <span class="value"> Tarantelle</span></p>
                <p class="form-label my-4">Source: <span class="value"> Pancarrè</span></p>
                <p class="form-label my-4">Formula: <span class="value"> Arrosticini</span></p>
                <p class="form-label my-4">Description: <span class="value"> Pizza fritta</span></p>
              </div>
              <div class="col-lg-6">
                <!--<p class="form-label my-4">Name: <span class="value"> {{ kpi.name }}</span></p>
                <p class="form-label my-4">Source: <span class="value"> {{ kpi.source }}</span></p>
                e così via
                -->
                <p class="form-label my-4">Expiring in: <span class="value"> Nutella</span></p>
                <p class="form-label my-4">Creation date: <span class="value"> Burro</span></p>
              </div>
            </div>
            <div class="text-end">
              <router-link to="/source">
                <svg xmlns="http://www.w3.org/2000/svg" height="3em" fill="#1b3fb0" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
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
    }
  },
  mounted() {
    this.getKPI();
  },
  async getKPI() {
    await axios.get(BASE_URL + "list_kpi"/* ID DELLA KPI, {
            headers: {Authorization: `Bearer ${token}`}
        }*/)
        .then(response => {
          console.log(response);
          this.kpi = response.data;
        }).catch((error) => {
          console.log(error);
        });
  },
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