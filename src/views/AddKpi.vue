<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="title mb-4 text-center"> Add a KPI </h1>
        <template v-if="errors.length">
          <div class="alert alert-danger mt-3" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </div>
        </template>
        <form @submit.prevent="checkForm()">
          <div class="row d-flex justify-content-center">
            <div class="col-11 col-lg-10 col-xl-8 form mt-3">
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
              <input type="text" v-model="range" class="form-control mb-4" id="range"
                placeholder="Describe the ranges in which your KPI value could be">
              <label for="kpi-group" class="form-label">Group By</label>
              <select v-model="group_by" id="kpi-group" class="form-select">
                <option :value="null" disabled selected>Click to select one</option>
                <option v-for="group in groups" v-bind:key="group" :value="group"> {{ group }}</option>
              </select>
              <div class="row my-4 gy-2">
                <div class="col-lg-6">
                  <label for="kpi-unit" class="form-label">Unit</label>
                  <select v-model="unit" id="kpi-unit" class="form-select">
                    <option :value="null" disabled selected>Click to select one</option>
                    <option v-for="unit in units" v-bind:key="unit" :value="unit"> {{ unit }}</option>
                  </select>
                </div>
                <div class="col-lg-6">
                  <label for="kpi-frequency" class="form-label">Frequency</label>
                  <select v-model="frequency" id="kpi-frequency" class="form-select">
                    <option value="null" disabled selected>Click to select one</option>
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
                  <math-field id="inputFormula" class="w-100 form-control init" v-model="formula"
                    @input="onInput"></math-field>
                </div>
                <div class="col-lg-1 px-0 my-auto">
                  <button class="icon-undo" @click.prevent="resetFormula">
                    <i class="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary" style="background-color: var(--primary-color);" type="submit">ADD</button>
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
      rd: [],
      kpiname: null,
      kpidescription: null,
      taxonomy: null,
      range: null,
      group_by: null,
      unit: null,
      frequency: null,
      formula: "",
      kpis_formula: [],
      rd_formula: [],
      errors: []
    }
  },
  computed: {
    groups() {
      return this.$store.getters.getGroups;
    },
    units() {
      return this.$store.getters.getUnits;
    },
  },
  mounted() {
    this.$store.commit("showSpinner");
    this.$store.dispatch("getUnits");
    function chunk(array, size = 1) {
      const length = array.length;
      if (!length || size < 1) {
        return [];
      }
      let index = 0;
      let resIndex = 0;
      const result = new Array(Math.ceil(length / size));
      while (index < length) {
        result[resIndex++] = array.slice(index, (index += size));
      }
      return result;
    }
    Promise.all([this.getKPIs(), this.getRawData()]).then(([kpis, rawData]) => {
      const emptyRows = [["[separator]"], ["[separator]"], ["[separator]"]];
      let kpiButtons = kpis.map(x => {
        return {
          label: x.name.replace("_", ""),
          latex: x.name.replace("_", ""),
          class: "small",
          width: "1.5"
        };
      });
      let kpisKeyboard = [...(chunk(kpiButtons, 4)), ...emptyRows];
      let rawDataKeyboard = [rawData.map(x => {
        return { label: x.replace("_", ""), class: "small" };
      }), ...emptyRows]; // il replace serve a evitare errori di escape
      let fullLayout = baseKeyboard["mathKeyboard"];
      fullLayout[1].rows = kpisKeyboard;
      fullLayout[2].rows = rawDataKeyboard;
      mathVirtualKeyboard.layouts = fullLayout;
      this.$store.commit("hideSpinner");
    })
  },
  methods: {
    checkForm() {
      this.errors = [];
      let fieldsToCheck = [
        this.kpiname,
        this.kpidescription,
        this.frequency,
        this.formula,
        this.unit
      ];

      if (fieldsToCheck.some(v => !v)) {
        window.scrollTo(0, 0);
        this.errors.push('Fields are mandatory to fill.');
      }
      if (this.errors.length === 0) {
        this.addKPI();
      }
    },
    async addKPI() {
      this.kpis_formula = []; //tmp
      await axios.post(BASE_URL + "add_kpi", {
        "name": this.kpiname,
        "description": this.kpidescription,
        "taxonomy": this.taxonomy,
        "kpi_range": this.range,
        "group_by": this.group_by,
        "unit": this.unit,
        "frequency": this.frequency,
        "formula": this.formula,
        "kpis": this.kpis_formula,
        "raw_data": this.rd
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
          router.push('/library');
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
    async getRawData() {
      let response = await axios.get(BASE_URL + "raw_data", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      });
      // this.rd = response.data.data.raw_data;
      return response.data.data.raw_data;
    },
    async getKPIs() {
      let response = await axios.get(BASE_URL + "kpis", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      });
      this.kpis = response.data.data;
      return this.kpis;
    },
    resetFormula() {
      let x = document.getElementById("inputFormula");
      x.value = "";
    },
    onInput() {
      let x = document.getElementById("inputFormula");
      this.formula = x.value;
    }
  }
}
</script>

<style scoped>

.form {
  background-color: var(--bg-color);
}

.form-label {
  color: var(--fg-color);
}

.form-control, .form-control:focus, .form-select {
  background: var(--second-color);
    color: var(--fg-color);
    border: 0;
}

.form-control::placeholder {
  color: var(--text-placeholder);
}

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

.icon-undo i.bi {
  font-size: 30px;
  color: var(--fg-color);
}
</style>