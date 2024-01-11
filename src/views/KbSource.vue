<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 mb-4 p-0">
        <p class="title text-center mb-4"> Library </p>
        <input class="search-kpi" v-model="kpiName" placeholder="Search KPI..." />
        <table style="width: 99%">
          <thead>
          <tr>
            <th style="width: 15%">Name</th>
            <th style="width: 30%">Description</th>
            <th style="width: 35%">Formula</th>
            <th style="width: 15%">Actions</th>
          </tr>
          </thead>
          <template v-if="searchedKPIs.length > 0">
            <tbody v-for="kpi in searchedKPIs" v-bind:key="kpi.uid">
            <tr v-bind:class="{'disabledKPI' : kpi.enabled === false}">
              <td style="width: 15%">
                <p class="t-text"> {{ kpi.name }} </p>
              </td>
              <td style="width: 30%">
                <p class="t-text"> {{ kpi.description }} </p>
              </td>
              <td style="width: 35%">
                <p v-bind:key="kpi" class="t-text"> {{ kpi.formula }} </p>
              </td>
              <td style="width: 15%">
                <section v-bind:key="kpi">
                  <p style="margin: 20px 0">
                    <router-link :to="'/kpi/' + kpi.uid + '/'">
                      <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 512 512">
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                      </svg>
                    </router-link>
                    <router-link v-if="!kpi.default" :to="'/edit-kpi/' + kpi.uid + '/'">
                      <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 512 512">
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                      </svg>
                    </router-link>
                    <button v-if="!kpi.default" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style="background-color: transparent; border: none; padding: 0;">
                      <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                      </svg>
                    </button>
                    <button v-if="kpi.enabled" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" style="background-color: transparent; border: none; padding: 0; margin-left: 2px">
                      <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 384 512">
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                      </svg>
                    </button>
                    <button v-else type="button" data-bs-toggle="modal" data-bs-target="#exampleModal3" style="background-color: transparent; border: none; padding: 0; margin-left: 2px">
                      <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 320 512">
                        <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                      </svg>
                    </button>
                  </p>
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" style="border-radius: 16px">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Delete KPI</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <p class="text"> You are going to delete all the KPIs that contain this KPI in their formula too. <br>
                            Are you sure to proceed? </p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="secondary-btn" data-bs-dismiss="modal">No </button>
                          <button type="button" v-on:click="deleteKPI(kpi.uid)" class="primary-btn"> Yes, delete KPI</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog" style="border-radius: 16px">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel2">Disable KPI</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div v-if="kpi.enabled" class="modal-body">
                          <p class="text"> You are going to disable all the KPIs that contain this KPI in their formula too. <br>
                            Are you sure to proceed? </p>
                        </div>
                        <div v-else class="modal-body">
                          <p class="text"> You are going to enable all the KPIs that contain this KPI in their formula too. <br>
                            Are you sure to proceed? </p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="secondary-btn" data-bs-dismiss="modal"> No </button>
                          <button type="button" v-if="kpi.enabled" v-on:click="calculationKPI(kpi.uid)" class="primary-btn"> Yes, disable KPI </button>
                          <button type="button" v-else v-on:click="calculationKPI(kpi.uid)" class="primary-btn"> Yes, enable KPI</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                    <div class="modal-dialog" style="border-radius: 16px">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel2">Enable KPI</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <p class="text"> You are going to enable all the KPIs that contain this KPI in their formula too. <br>
                            Are you sure to proceed? </p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="secondary-btn" data-bs-dismiss="modal"> No </button>
                          <button type="button" v-on:click="calculationKPI(kpi.uid)" class="primary-btn"> Yes, enable KPI</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </td>
            </tr>
            </tbody>
          </template>
          <template v-else>
            <tbody>
            <tr>
              <td style="background-color: white">
                <p class="text my-3"> No KPIs here. </p>
              </td>
            </tr>
            </tbody>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";
import {BASE_URL} from "@/constants/constants";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "KbSource",
  data() {
    return {
      kpiName: "",
    }
  },
  mounted() {
    this.$store.dispatch("getKPIs", null);
  },
  computed: {
    searchedKPIs(){
      let all_kpis = this.$store.getters.getKPIs;
      return all_kpis.filter((all_kpis) => all_kpis.name.toLowerCase().includes(this.kpiName.toLowerCase()))
    }
  },
  methods: {
    async deleteKPI(id) {
      await axios.delete(BASE_URL + 'kpi/' + id + '/', {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(() => {
        Swal.fire({
          title: "KPI deleted successfully",
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d41b2',
        });
      }).catch(() => {
        Swal.fire({
          title: "Something went wrong. Check data or try later.",
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d41b2',
        });
      });
    },
    async calculationKPI(id) {
      await axios.put(BASE_URL + 'toggle_kpi/' + id + '/', {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(() => {
        Swal.fire({
          title: "Operation completed successfully",
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d41b2',
        });
      }).catch(() => {
        Swal.fire({
          title: "Something went wrong. Check data or try later.",
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d41b2',
        });
      });
    }
  }
}

</script>

<style scoped>

table {
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 5px 5px 5px var(--shadow-color);
  border-radius: 13px;
}

thead th {
  padding: 15px;
  background-color: var(--primary-color);
  color: #fff;
  font-size: 21px;
  font-weight: 600;
  border-left: 1px solid #fff;
}

thead th:first-child {
  border-top-left-radius: 13px;
}

thead th:last-child {
  border-top-right-radius: 13px;
}

tbody tr td {
  padding-left: 20px;
}

tbody tr td:not(:first-child) {
  border-left: 0.5px solid #c9c9c9;
}

.t-text {
  font-size: 17px;
  font-weight: 400;
  margin: 20px 0;
}

.t-icons {
  width: 18px;
  margin: 0 15px 0 0;
  fill: #494949;
}

.modal-title {
  font-weight: 600 !important;
}

.search-kpi {
  border: none;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 5px 5px 5px var(--shadow-color);
}

.disabledKPI {
  background-color: #dedede;
}

tr {
  background-color: var(--bg-color);
}

svg, .t-icons {
  fill: var(--fg-color);
}

p {
  color: var(--fg-color);
}


</style>