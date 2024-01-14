<template>
  <div class="container">
    <div class="row" style="background: var(--bg-color);">
      <div class="col-lg-12">
        <p class="title text-center mb-4" style="color: var(--fg-color);"> Edit {{ kpi.name }} </p>
        <template v-if="errors.length">
          <div class="alert alert-danger mt-3" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </div>
        </template>
        <form @submit.prevent="checkForm()">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8 form mt-3" style="background: var(--bg-color);">
              <label for="kpi-name" class="form-label">Name</label>
              <input type="text" disabled class="form-control mb-4" id="kpi-name"
                     :placeholder="kpi.name">
              <label for="kpi-description" class="form-label">Description</label>
              <input type="text" v-model="kpi.description" class="form-control mb-4" id="kpi-description"
                     :placeholder="kpi.description">
              <label for="taxonomy" class="form-label">Taxonomy</label>
              <input type="text" v-model="kpi.taxonomy" class="form-control mb-4" id="taxonomy"
                     :placeholder="kpi.taxonomy">
              <label for="range" class="form-label">Range</label>
              <input type="text" v-model="kpi.kpi_range" class="form-control mb-4" id="range"
                     :placeholder="kpi.kpi_range">
              <label for="kpi-group" class="form-label">Granularity</label>
              <select v-model="kpi.group_by" id="kpi-group" class="form-select">
                <option :value="kpi.group_by" disabled selected>{{ kpi.group_by }}</option>
                <option v-for="group in groups" v-bind:key="group" :value="group"> {{ group }}</option>
              </select>
              <div class="row my-4">
                <div class="col-lg-6">
                  <label for="kpi-unit" class="form-label">Unit</label>
                  <select v-model="kpi.unit" id="kpi-unit" class="form-select">
                    <option :value="kpi.unit" disabled selected>{{ kpi.unit }}</option>
                    <option v-for="unit in units" v-bind:key="unit" :value="unit"> {{ unit }}</option>
                  </select>
                </div>
                <div class="col-lg-6">
                  <label for="kpi-frequency" class="form-label">Frequency</label>
                  <select v-model="kpi.frequency" id="kpi-frequency" class="form-select">
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
                    <i class="bi bi-arrow-clockwise"></i>
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
      /*kpidescription: '',
      taxonomy: '',
      range: '',
      group_by: '',
      unit: '',
      frequency: '',
      formula: "",*/

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
        this.kpi.description,
        this.kpi.frequency,
        this.kpi.taxonomy,
        this.kpi.kpi_range,
        this.kpi.formula,
        this.kpi.unit
      ];
      if (!this.kpi.description || !this.kpi.frequency || !this.kpi.taxonomy || !this.kpi.kpi_range
        || !this.kpi.formula || !this.kpi.unit ) {
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
            "description": this.kpi.description,
            "taxonomy": this.kpi.taxonomy,
            "kpi_range": this.kpi.kpi_range,
            "group_by": this.kpi.group_by,
            "unit": this.kpi.unit,
            "frequency": this.kpi.frequency,
            "formula": this.kpi.formula,
            "enabled": this.kpi.enabled,
            "kpis": this.kpi.kpis,
            "raw_data": this.kpi.raw_data
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

.form {
  background-color: var(--form-color) !important;
  box-shadow: 5px 5px 5px var(--shadow-color);
}

.form-control::placeholder {
  color: var(--text-placeholder) !important;
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
}
</style>


