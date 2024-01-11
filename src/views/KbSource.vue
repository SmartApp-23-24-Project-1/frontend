<template>
  <div class="container-fluid">
    <div class="row" style="background: var(--bg-color);">
      <div class="col-lg-12 mb-4 p-0 px-4">
        <p class="title text-center mb-4"> Library </p>
        <input class="search-kpi" v-model="kpiName" placeholder="Search KPI..." />
        
        <div class="table-responsive">
          <table>
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
                  <p style="margin: 20px 0" class="actions">
                    <router-link :to="'/kpi/' + kpi.uid + '/'">
                      <i class="bi bi-question-circle"></i>
                    </router-link>
                    <router-link v-if="!kpi.default" :to="'/edit-kpi/' + kpi.uid + '/'">
                      <i class="bi bi-pencil-square"></i>
                    </router-link>
                    <button v-if="!kpi.default" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style="background-color: transparent; border: none; padding: 0;">
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                    <button v-if="kpi.enabled" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" style="background-color: transparent; border: none; padding: 0;">
                      <i class="bi bi-pause-fill"></i>
                    </button>
                    <button v-else type="button" data-bs-toggle="modal" data-bs-target="#exampleModal3" style="background-color: transparent; border: none; padding: 0;">
                      <i class="bi bi-play-fill"></i>
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
                          <button type="button" v-on:click="deleteKPI(kpi.uid)" data-bs-dismiss="modal" class="primary-btn"> Yes, delete KPI</button>
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
                          <button type="button" v-else v-on:click="calculationKPI(kpi.uid)" data-bs-dismiss="modal" class="primary-btn"> Yes, enable KPI</button>
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
                          <button type="button" v-on:click="calculationKPI(kpi.uid)" data-bs-dismiss="modal" class="primary-btn"> Yes, enable KPI</button>
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
        }).then(()=> {
          window.location.reload();
        });
      }).catch(() => {
        Swal.fire({
          title: "Something went wrong. Check data or try later.",
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d41b2',
        }).then(()=> {
          window.location.reload();
        });
      });
    },
    async calculationKPI(id) {
      await axios.put(BASE_URL + 'toggle_kpi/' + id + '/', {}, {
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
        }).then(()=> {
          window.location.reload();
        });
      }).catch(() => {
        Swal.fire({
          title: "Something went wrong. Check data or try later.",
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d41b2',
        }).then(()=> {
          window.location.reload();
        });
      });
    }
  }
}

</script>

<style scoped>

.actions {
  display: flex;
  column-gap: 10px;
  align-items: center;
  justify-content: center;
}

.actions > * {
  font-size: 20px;
}

.actions > :last-child {
  font-size: 25px;
}

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
  border-left: 0;
}

thead th:last-child {
  border-top-right-radius: 13px;
}

tbody tr td {
  padding-left: 15px;
  padding-right: 15px;
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
  color: var(--fg-color);
}

.modal-content {
  background-color: var(--bg-color);
}

.search-kpi {
  border: none;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 5px 5px 5px var(--shadow-color);
  background-color: var(--second-color);
  color: var(--fg-color);
}

.disabledKPI {
  background-color: var(--second-color);
}

.disabledKPI p {
  color: #777;
}

tr {
  background-color: var(--second-color);
}

svg, .t-icons {
  fill: var(--fg-color);
}

p {
  color: var(--fg-color);
}

@media screen and (max-width: 770px) {
  .search-kpi {
    width: 100%;
  }
}

</style>