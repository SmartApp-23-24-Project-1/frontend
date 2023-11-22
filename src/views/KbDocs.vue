<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-12">
        <h1 class="text-center mb-5">Documentation</h1>

        <p class="text my-4">
          The website is divided into three sections (visibles in the sidebar on the left). Each section has different functionalities.
        </p>

        <p class="text my-4">
          At the top right corner there is a button. It allows us to switch user.
        </p>

        <hr>
        <h3>Debug board</h3>

        <p class="text my-4">
          This is the main page of the application and allows to give a quick look to the relevant informations of the Knowledge Base. It's made up of three parts:
        </p>

        <ul>
          <li>A welcome text on the top of the page</li>
          <li>A preview of the value of four KPIs (chosen from the KPI mantainer)</li>
          <li>And last, some visual indicators about the Knowledge Base</li>
        </ul>

        <hr>
        <h3>Add a KPI</h3>

        <p class="text my-4">
          In this page the KPI mantainer can add a new KPI to the Knowledge Base. Each KPI has different attributes, let's see all of them in detail:
        </p>

        <div class="table-responsive">
          <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Attribute</th>
              <th scope="col">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>the visible name of the KPI</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>a brief description of the KPI</td>
            </tr>
            <tr>
              <td>Unit</td>
              <td>the unit of measure of the KPI (e.g. the uptime of a server could be measured in days or hours)</td>
            </tr>
            <tr>
              <td>Frequency</td>
              <td>refresh time of the KPI (e.g. 1 hour = it updates every hour)</td>
            </tr>
            <tr>
              <td>Formula</td>
              <td>the mathematical formula used to compute the KPI</td>
            </tr>
            <tr>
              <td>Source</td>
              <td>source</td>
            </tr>
          </tbody>
        </table>
        </div>

        <hr>
        <h3>Source</h3>

        <p class="text my-4">
          In this page we can see a list of currently active KPIs, along with their respective definitions and formulas. At the end of each row, we have some actions on the KPI.
        </p>

        <ul>
          <li><em>A question mark</em>, shows detailed informations about the KPI</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KbDocs",
  data() {
    return {}
  },
}
</script>

<style scoped>
hr {
  margin-top: 40px;
}

td, li {
  font-size: 16px;
}

th {
  min-width: 150px;
}

table {
  max-width: 70%;
}
</style>