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
                placeholder="Put a name for your KPI">
              <label for="kpi-description" class="form-label">Description</label>
              <input type="text" v-model="kpidescription" class="form-control mb-4" id="kpi-description"
                placeholder="Put a short description for your KPI">
              <label for="taxonomy" class="form-label">Taxonomy</label>
              <input type="text" v-model="taxonomy" class="form-control mb-4" id="taxonomy"
                placeholder="Put taxonomy for your KPI">
              <label for="taxonomy" class="form-label">Range</label>
              <input type="text" v-model="range" class="form-control mb-4" id="taxonomy"
                placeholder="Describe the ranges in which your KPI value could be">
              <div class="row my-4">
                <div class="col-lg-6">
                  <label for="kpi-unit" class="form-label">Unit</label>
                  <select v-model="unit" id="kpi-unit" class="form-select">
                    <option :value="null" disabled selected>Select one</option>
                    <option v-for="unit in units" v-bind:key="unit" :value="unit"> {{ unit }}</option>
                  </select>
                </div>
                <div class="col-lg-6">
                  <label for="kpi-frequency" class="form-label">Frequency</label>
                  <select v-model="frequency" id="kpi-frequency" class="form-select">
                    <option value="null" disabled selected>Select one</option>
                    <option value="1 Day">1 Day</option>
                    <option value="1 Week">1 Week</option>
                    <option value="1 Month">1 Month</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </div>
              </div>
              <div class="row mb-4">
                <label for="kpi-formula" class="form-label">Formula</label>
                <div class="col-lg-11">
                  <!-- TODO: RIMETTERE FOCUS -->
                  <math-field id="inputFormula" class="w-100 form-control init" v-model="formula"
                    @input="prova"></math-field>
                </div>
                <div class="col-lg-1 px-0 my-auto">
                  <button class="icon-undo" @click.prevent="resetFormula"><svg xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path
                        d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" />
                    </svg></button>
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
import { BASE_URL } from "@/constants/constants";
import router from "@/router";
import Swal from "sweetalert2";
import baseKeyboard from './baseKeyboard.json';
import { MathfieldElement } from 'mathlive';

export default {
  name: "AddKpi",
  data() {
    return {
      kpis: [],
      units: [],
      rd: [],
      kpiname: null,
      kpidescription: null,
      taxonomy: null,
      range: null,
      unit: null,
      frequency: null,
      formula: "",
      kpis_formula: [],
      rd_formula: [],
      /* type1: "on",
      type2: null, */
      errors: [],
    }
  },
  mounted() {
    // this.getUnits();
    this.getKPIs().then(kpis => { // brutto, ma l'async sul mounted non va
      this.getRawData().then(rawData => {
        const emptyRows = [["[separator]"], ["[separator]"], ["[separator]"]];

        let kpisKeyboard = [kpis.map(x => x.name.toUpperCase()), ...emptyRows];
        let rawDataKeyboard = [rawData.map(x => {
          return { label: x.replace("_", ""), class: "small" };
        }), ...emptyRows]; // il replace serve a evitare errori di escape  

        let fullLayout = baseKeyboard["mathKeyboard"];
        fullLayout[1].rows = kpisKeyboard;
        fullLayout[2].rows = rawDataKeyboard;

        mathVirtualKeyboard.layouts = fullLayout;
      })
    })
  },
  methods: {
    /* TEST() {
      robe da inviare al backend
      
      const rawDataToSend = this.rd.map(x => x);
      const kpisToSend = this.kpis.map(x => {
        return {
          [x.name]: x.formula
        }
      });
    }, */
    checkForm() {
      this.errors = [];
      if (!this.kpiname || !this.kpidescription || !this.unit || !this.frequency || !this.formula
        || !this.taxonomy) {
        window.scrollTo(0, 0);
        this.errors.push('Fields are mandatory to fill.');
      }
      if (this.errors.length === 0) {
        this.addKPI();
      }
    },
    async addKPI() {
      await axios.post(BASE_URL + "add_kpi", {
        "name": this.kpiname,
        "description": this.kpidescription,
        "taxonomy": this.taxonomy,
        "range": this.range,
        "unit": this.unit,
        "frequency": this.frequency,
        "formula": this.formula,
        "kpis": this.kpis_formula,
        "rawdata": this.rd
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
    async getRawData() {
      let response = await axios.get(BASE_URL + "raw_data", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      });

      this.rd = response.data["raw data available"];
      return this.rd;
    },
    async getKPIs() {
      let response = await axios.get(BASE_URL + "kpis", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      })/* .then(response => {
        mathVirtualKeyboard.layouts[2] = {
          label: "KPIs",
          rows: response.data.data.map(x => x.name)
        };
        this.kpis = response.data.data;
      }).catch((error) => {
        console.log(error);
      }); */

      this.kpis = response.data.data;
      return this.kpis;
    },
    async getUnits() {
      await axios.get(BASE_URL + "units", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(response => {
        this.units = response.data["units available for the KPIs"];
      }).catch(() => {
      });
    },
    resetFormula() {
      let x = document.getElementById("inputFormula");
      x.value = "";
    },
    prova() {
      let x = document.getElementById("inputFormula");
      this.formula = x.value;
    }
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

.init {
  height: initial;
  font-size: 24px;
}

.icon-undo {
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none
}

.icon-undo svg {
  width: 70%;
  fill: #484848;
}
</style>