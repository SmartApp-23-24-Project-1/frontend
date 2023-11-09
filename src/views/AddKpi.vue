<template>
  <!-- TODO: OTTENERE KPI DA DB, MANDARE DATI AL DB -->
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <p class="title"> Add a KPI </p>
        <form @submit.prevent="checkForm()">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8 form mt-3">
              <label for="kpi-name" class="form-label">Name</label>
              <input type="text" required v-model="kpiname" class="form-control mb-4" id="kpi-name" placeholder="Put a non-existent name for your KPI">
              <label for="kpi-description" class="form-label">Description</label>
              <input type="text" required v-model="kpidescription" class="form-control mb-4" id="kpi-description"
                     placeholder="Put a short description for your KPI">
              <label for="kpi-formula" class="form-label">Formula</label>
              <div class="row mb-4">
                <div class="col-lg-6">
                  <label for="kpi-type-formula" class="form-label">Choose a type of formula</label>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="type1" :checked="type1" v-model="type1" v-on:click="selectType()">
                    <label class="form-check-label" for="type1">
                      KPI1 OP KPI2
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="type2" :checked="type2" v-model="type2" v-on:click="selectType()">
                    <label class="form-check-label" for="type2">
                      (KPI1 OP KPI2) / KPI3
                    </label>
                  </div>
                  <p class="notes"> where OP is an operation between +, -, *, /, %</p>
                </div>
                <div class="col-lg-6">
                  <label class="form-label">Complete the formula</label>
                  <!--if type1 is selected -->
                  <section v-if="type1 === 'on'">
                    <div class="input-group my-4">
                      <select v-model="kpi1" required class="form-select">
                        <option disabled selected>KPI1</option>
                        <option value="1">Opt1</option>
                        <option value="2">Opt2</option>
                        <option value="3">Opt3</option>
                      </select>
                      <select v-model="operation" required class="form-select">
                        <option disabled selected>OP</option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">*</option>
                        <option value="/">/</option>
                        <option value="%">%</option>
                      </select>
                      <select v-model="kpi2" required class="form-select">
                        <option disabled selected>KPI2</option>
                        <option value="1">Opt1</option>
                        <option value="2">Opt2</option>
                        <option value="3">Opt3</option>
                      </select>
                    </div>
                  </section>
                  <!-- if type2 is selected -->
                  <section v-else>
                    <div class="input-group my-4">
                      <select v-model="kpi1" required class="form-select">
                        <option disabled selected>KPI1</option>
                        <option value="1">Opt1</option>
                        <option value="2">Opt2</option>
                        <option value="3">Opt3</option>
                      </select>
                      <select v-model="operation" required class="form-select">
                        <option disabled selected>OP</option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">*</option>
                        <option value="/">/</option>
                        <option value="%">%</option>
                      </select>
                      <select v-model="kpi2" required class="form-select">
                        <option disabled selected>KPI2</option>
                        <option value="1">Opt1</option>
                        <option value="2">Opt2</option>
                        <option value="3">Opt3</option>
                      </select>
                      <select v-model="kpi3" required class="form-select">
                        <option disabled selected>KPI3</option>
                        <option value="1">Opt1</option>
                        <option value="2">Opt2</option>
                        <option value="3">Opt3</option>
                      </select>
                    </div>
                  </section>
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
export default {
  name: "AddKpi",
  data() {
    return {
      kpiname: null,
      kpidescription: null,
      type1: "on",
      type2: null,
      kpi1: null,
      kpi2: null,
      kpi3: null,
      operation: null,
      errors: [],
    }
  },
  mounted() {
    this.getKPIs();
  },
  methods: {
    checkForm() {
      this.errors = [];
      if (!this.kpiname || !this.kpidescription || (!this.type1 && !this.type2)) {
        window.scrollTo(0, 0);
        this.errors.push('These fields are mandatory to fill.');
      }
      if(this.type1 && (!this.kpi1 || !this.operation || !this.kpi2)) {
        window.scrollTo(0, 0);
        this.errors.push('The formula is mandatory to fill.');
      }
      /* DA FARE ANCHE PER TYPE2 */
      if (this.errors.length === 0) {
        this.addKPI();
      }
    },
    async addKPI() {

    },
    selectType() {
      if(!this.type1) {
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
</style>