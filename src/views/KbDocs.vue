<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12" style="background-color: var(--bg-color);">
        <h1 class="title text-center mb-4">Documentation</h1>

        <p class="text-doc">
          The website is divided into 4 sections (visible in the sidebar on the left). <br> Each section has different functionalities.
          Moreover, in the top right corner there is a button to switch current user.
        </p>

        <div class="my-4">
          <h4>1. Overview</h4>
          <p class="text-doc">
            This is the main page of the application and allows to give a quick look to the relevant informations of the Knowledge Base.
            Here KPIs are retrieved based on their source, which can be changed from a dedicated button.
          </p>
        </div>

        <div class="my-4">
          <h4>2. Analytics</h4>
          <p class="text-doc">
            In this page Analytics are shown, like the most called KPIs and some notification about the missing KPI calculation.
          </p>
        </div>

        <div class="my-4">
          <h4>3. Library</h4>
          <p class="text-doc">
            In this page there is a list of all KPIs, along with their respective definitions and formulas.  <br>
            For each KPI there is the possibility to perform different actions:  <br>
            • See information about KPI;  <br>
            • Edit the KPI;  <br>
            • Delete KPI (!this action leads to delete all KPIs that employ it in their formula);  <br>
            • Enable/Disable KPI   <br>
            <br>
            Furthermore, it is not possible to edit or delete default KPIs.
          </p>
        </div>

        <div class="my-4">
          <h4>4. Add a KPI</h4>
          <p class="text-doc">
            In this page there is the possibility to add a new KPI to the Knowledge Base.
            Each KPI has different attributes to be specified, let's see all of them in detail:
          </p>
          <div class="table-responsive">
            <table class="table table-hover" :class="{ 'table-dark': darkMode }">
              <thead>
              <tr>
                <th scope="col">Attribute</th>
                <th scope="col">Meaning</th>
                <th scope="col">Example</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Name</td>
                <td>The visible name of the KPI</td>
                <td>Inventory costs</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>A brief description of the KPI</td>
                <td>The total amount of all expenses related to storing unsold goods</td>
              </tr>
              <tr>
                <td>Unit</td>
                <td>The unit of measure of the KPI</td>
                <td>m, kg, m/s, ...</td>
              </tr>
              <tr>
                <td>Frequency</td>
                <td>Refresh time of the KPI</td>
                <td>1 Hour</td>
              </tr>
              <tr>
                <td>Formula</td>
                <td>The mathematical formula used to compute the KPI</td>
                <td>3 + 4 * KPI2</td>
              </tr>
              <tr>
                <td>Taxonomy</td>
                <td>The domain which the KPI belongs to</td>
                <td>Industrial</td>
              </tr>
              <tr>
                <td>Range</td>
                <td>The range in which it is contained the KPI value</td>
                <td>1-10</td>
              </tr>
              <tr>
                <td>Group By</td>
                <td>The source of the KPI we're defining</td>
                <td>All, Average</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KbDocs",
  mounted() {
    this.$store.commit("hideSpinner")
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode
    }
  }
}
</script>

<style scoped>
.text-doc {
  font-size: 16px;
  color: var(--fg-color);
}

h4, td, th, p {
  color: var(--fg-color);
}

h4 {
  font-weight: bolder;
  margin-top: 40px;
}
</style>