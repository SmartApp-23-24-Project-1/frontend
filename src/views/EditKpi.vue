<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <p class="title"> Edit {{ kpi.name }} </p>
        <template v-if="errors.length">
          <div class="alert alert-danger mt-3" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </div>
        </template>
        <form @submit.prevent="checkForm()">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8 form mt-3">
              <label for="kpi-name" class="form-label">Name</label>
              <input type="text" disabled v-model="kpiname" class="form-control mb-4" id="kpi-name"
                     :placeholder="kpi.name">
              <label for="kpi-description" class="form-label">Description</label>
              <input type="text" v-model="kpidescription" class="form-control mb-4" id="kpi-description"
                     :placeholder="kpi.description">
              <label for="taxonomy" class="form-label">Taxonomy</label>
              <input type="text" v-model="taxonomy" class="form-control mb-4" id="taxonomy"
                     :placeholder="kpi.taxonomy">
              <label for="taxonomy" class="form-label">Range</label>
              <input type="text" v-model="range" class="form-control mb-4" id="taxonomy"
                     :placeholder="kpi.kpi_range">
              <label for="kpi-group" class="form-label">Group By</label>
              <select v-model="group_by" id="kpi-group" class="form-select">
                <option :value="kpi.group_by" disabled selected>{{ kpi.group_by }}</option>
                <option v-for="group in groups" v-bind:key="group" :value="group"> {{ group }}</option>
              </select>
              <div class="row my-4">
                <div class="col-lg-6">
                  <label for="kpi-unit" class="form-label">Unit</label>
                  <select v-model="unit" id="kpi-unit" class="form-select">
                    <option :value="kpi.unit" disabled selected>{{ kpi.unit }}</option>
                    <option v-for="unit in units" v-bind:key="unit" :value="unit"> {{ unit }}</option>
                  </select>
                </div>
                <div class="col-lg-6">
                  <label for="kpi-frequency" class="form-label">Frequency</label>
                  <select v-model="frequency" id="kpi-frequency" class="form-select">
                    <option :value="kpi.frequency" disabled selected> {{ kpi.frequency }}</option>
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
                              @input="onInput"> {{ kpi.formula }} </math-field>
                </div>
                <div class="col-lg-1 px-0 my-auto">
                  <button class="icon-undo" @click.prevent="resetFormula">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <button class="primary-btn" type="submit">EDIT</button>
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
import baseKeyboard from './baseKeyboard.json';
import {MathfieldElement} from 'mathlive';

export default {
  name: "EditKpi",
  data() {
    return {
      kpi_id: null,
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
    kpi() {
      return this.$store.getters.getKPI;
    },
    groups() {
      return this.$store.getters.getGroups;
    },
    units() {
      return this.$store.getters.getUnits;
    },
  },
  mounted() {
    this.kpi_id = this.$route.params.kpi_id;
    this.$store.dispatch("getKPI", this.kpi_id);
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
      let kpisKeyboard = [...(chunk(kpiButtons, 4)), ["[separator]"], ["[separator]"]];
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
        this.kpidescription,
        this.frequency,
        this.taxonomy,
        this.range,
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
      await axios.put(BASE_URL + "kpi/" + this.kpi_id, {
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
          title: "KPI edited successfully",
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
        router.push('/edit-kpi/' + this.kpi_id + '/');
      });
    },
    async getRawData() {
      let response = await axios.get(BASE_URL + "raw_data", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      });
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