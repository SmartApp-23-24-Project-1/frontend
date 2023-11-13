<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <p class="title"> Modify a KPI </p>
        <form @submit.prevent="checkForm()">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8 form mt-3">
              <label for="kpi-name" class="form-label">Name</label>
              <input type="text"  v-model="kpiname" class="form-control mb-4" id="kpi-name" placeholder="oldvalue">
              <label for="kpi-description" class="form-label">Description</label>
              <input type="text"  v-model="kpidescription" class="form-control mb-4" id="kpi-description"
                     placeholder="oldvalue">
              <label for="kpi-formula" class="form-label">Formula</label>
              <p class="mb-5"> You can't change the formula for this version: delete this KPI and create a new one.</p>
              <div class="d-flex justify-content-center mt-3">
                <button class="primary-btn" type="submit">MODIFY KPI</button>
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
  name: "ModifyKpi",
  data() {
    return {
      kpiname: null,
      kpidescription: null,
      errors: [],
    }
  },
  mounted() {
    this.getKPI();
  },
  methods: {
    checkForm() {
      this.errors = [];
      if (!this.kpiname || !this.kpidescription) {
        window.scrollTo(0, 0);
        this.errors.push('These fields are mandatory to fill.');
      }
      if (this.errors.length === 0) {
        this.editKPI();
      }
    },
    async editKPI() {

    },
    async getKPI() {

    }
  }
}
</script>

<style scoped>

.form {
  background-color: white;
  border-radius: 20px;
  padding: 40px 70px;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0;
}


</style>