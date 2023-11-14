<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <p class="title"> Add a KPI </p>
        <template v-if="errors.length">
          <div class="alert alert-danger mt-3" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </div>
        </template>
        <form @submit.prevent="checkForm()">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8 form mt-3">
              <label for="kpi-name" class="form-label">Name</label>
              <input type="text" v-model="kpiname" class="form-control mb-4" id="kpi-name"
                     placeholder="Put a non-existent name for your KPI">
              <label for="kpi-description" class="form-label">Description</label>
              <input type="text" v-model="kpidescription" class="form-control mb-4" id="kpi-description"
                     placeholder="Put a short description for your KPI">
              <div class="row my-4">
                <div class="col-lg-4">
                  <label for="kpi-source" class="form-label">Source</label>
                  <select v-model="source" id="kpi-source" class="form-select">
                    <option :value="null" disabled selected>Select one</option>
                    <option v-for="source in sources" v-bind:key="source" :value="source"> {{ source }}</option>
                  </select>
                </div>
                <div class="col-lg-4">
                  <label for="kpi-unit" class="form-label">Unit</label>
                  <select v-model="unit" id="kpi-unit" class="form-select">
                    <option :value="null" disabled selected>Select one</option>
                    <option v-for="unit in units" v-bind:key="unit" :value="unit"> {{ unit }}</option>
                  </select>
                </div>
                <div class="col-lg-4">
                  <label for="kpi-source" class="form-label">Expiring in</label>
                  <select v-model="expiring" id="kpi-source" class="form-select">
                    <option value="null" disabled selected>Select one</option>
                    <option value="1 Day">1 Day</option>
                    <option value="1 Week">1 Week</option>
                    <option value="1 Month">1 Month</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </div>
              </div>
              <label for="kpi-formula" class="form-label">Formula</label>
              <div class="row mb-4">
                <div class="col-lg-6">
                  <label for="kpi-type-formula" class="form-label">Choose a type of formula</label>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="type1" :checked="type1" v-model="type1"
                           v-on:click="selectType()">
                    <label class="form-check-label" for="type1"> KPI1 OP KPI2 </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="type2" :checked="type2" v-model="type2"
                           v-on:click="selectType()">
                    <label class="form-check-label" for="type2"> (KPI1 OP KPI2) / KPI3 </label>
                  </div>
                  <p class="notes"> where OP is an operation between +, -, *, /, %</p>
                </div>
                <div class="col-lg-6">
                  <label class="form-label">Complete the formula</label>
                  <!--if type1 is selected -->
                  <div class="input-group my-4">
                    <select v-model="kpi1" class="form-select">
                      <option :value="null" disabled selected>KPI1</option>
                      <option v-for="kpi in kpis" v-bind:key="kpi" :value="kpi.value"> {{ kpi.name }}</option>
                    </select>
                    <select v-model="operation" class="form-select">
                      <option :value="null" disabled selected>OP</option>
                      <option v-bind:key="'+'" :value="'+'">+</option>
                      <option v-bind:key="'-'" :value="'-'">-</option>
                      <option v-bind:key="'*'" :value="'*'">*</option>
                      <option v-bind:key="'/'" :value="'/'">/</option>
                      <option v-bind:key="'%'" :value="'%'">%</option>
                    </select>
                    <select v-model="kpi2" class="form-select">
                      <option :value="null" disabled selected>KPI2</option>
                      <option v-for="kpi in kpis" v-bind:key="kpi" :value="kpi.value"> {{ kpi.name }}</option>
                    </select>
                    <select v-model="kpi3" class="form-select" v-if="type2 === 'on'">
                      <option :value="null" disabled selected>KPI3</option>
                      <option v-for="kpi in kpis" v-bind:key="kpi" :value="kpi.value"> {{ kpi.name }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <button class="primary-btn" type="submit">ADD</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "@/constants/constants";
import router from "@/router";
import Swal from "sweetalert2";

export default {
  name: "AddKpi",
  data() {
    return {
      kpis: [],
      units: [],
      sources: [],
      kpiname: null,
      kpidescription: null,
      source: null,
      unit: null,
      expiring: null,
      type1: "on",
      type2: null,
      formula: null,
      kpi1: null,
      kpi2: null,
      kpi3: null,
      operation: null,
      errors: [],
    }
  },
  mounted() {
    this.getKPIs();
    this.getUnits();
    this.getSources();
  },
  methods: {
    checkForm() {
      this.errors = [];
      if (!this.kpiname || !this.kpidescription || (!this.type1 && !this.type2)) {
        window.scrollTo(0, 0);
        this.errors.push('These fields are mandatory to fill.');
      }
      /*if (this.type1 && (!this.kpi1 || !this.operation || !this.kpi2)) {
        window.scrollTo(0, 0);
        this.errors.push('The formula is mandatory to fill.');
      }
      if (this.type2 && (!this.kpi1 || !this.operation || !this.kpi2 || !this.kpi3)) {
        window.scrollTo(0, 0);
        this.errors.push('The formula is mandatory to fill.');
      }*/
      if (this.errors.length === 0) {
        this.addKPI();
      }
    },
    async addKPI() {
      await axios.post(BASE_URL + "add_kpi", {
            "name": this.kpiname,
            "description": this.kpidescription,
            "formula": "kpi1 + kpi2",
            "unit": this.unit,
            "source": this.source,
            "expiring_in": this.expiring,
          },
          {
            headers: {
              withCredentials: 'true',
              'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
            }
          }).then(() => {
        Swal.fire({
          title: "KPI added successfully",
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d41b2',
        });
        router.push('/');
      }).catch(() => {
        Swal.fire({
          title: "Something went wrong. Check data or try later.",
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d41b2',
        });
        router.push('/add-a-kpi');
      });
    },
    selectType() {
      if (!this.type1) {
        this.type1 = 'on';
        document.getElementById("type1").checked = 'on';
        this.type2 = null;
        document.getElementById("type1").type2 = null;
      } else if (!this.type2) {
        this.type1 = null;
        document.getElementById("type1").checked = null;
        this.type2 = 'on';
        document.getElementById("type2").checked = 'on';
      }
    },
    async getKPIs() {
      await axios.get(BASE_URL + "kpis", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(response => {
        console.log(response);
        this.kpis = response.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    async getUnits() {
      await axios.get(BASE_URL + "units", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(response => {
        console.log(response);
        this.units = response.data["units available for the KPIs"];
      }).catch((error) => {
        console.log(error);
      });
    },
    async getSources() {
      await axios.get(BASE_URL + "sources", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      })
          .then(response => {
            console.log(response);
            this.sources = response.data;
          }).catch((error) => {
            console.log(error);
          });
    },

  }
}
</script>

<style scoped>

.form-check-label {
  font-size: 15px;
  font-style: italic;
}

.notes {
  font-size: 11px;
  color: #b2b2b2;
}

.form-select {
  color: #6c757d;
}
</style>