<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12 p-0">
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-sm-12">
                <div class="home-tab">

                  <div class="tab-content tab-content-basic">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="statistics-details d-flex align-items-center justify-content-between">
                            <div>
                              <p class="statistics-title">KPI1</p>
                              <h3 class="rate-percentage">32.53%</h3>
                            </div>
                            <div>
                              <p class="statistics-title">KPI2</p>
                              <h3 class="rate-percentage">7,682</h3>
                            </div>
                            <div>
                              <p class="statistics-title">KPI3</p>
                              <h3 class="rate-percentage">68.8</h3>
                            </div>
                            <div class="d-none d-md-block">
                              <p class="statistics-title">KPI4</p>
                              <h3 class="rate-percentage">2m:35s</h3>
                            </div>
                            <div class="d-none d-md-block">
                              <p class="statistics-title">KPI5</p>
                              <h3 class="rate-percentage">68.8</h3>
                            </div>
                            <div class="d-none d-md-block">
                              <p class="statistics-title">KPI6</p>
                              <h3 class="rate-percentage">2m:35s</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-8 d-flex flex-column">
                          <div class="row flex-grow">
                            <div class="col-12 grid-margin stretch-card">
                              <div class="card card-rounded">
                                <div class="card-body">
                                  <div class="d-sm-flex justify-content-between align-items-start">
                                    <div>
                                      <h4 class="card-title card-title-dash">Lorem ipsum</h4>
                                      <p class="card-subtitle card-subtitle-dash">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                                    </div>
                                  </div>
                                  <div class="d-sm-flex align-items-center mt-1 justify-content-between">
                                    <div class="d-sm-flex align-items-center mt-4 justify-content-between">
                                      <h2 class="me-2 fw-bold">€36,251.00</h2><h4 class="me-2">EUR</h4> <!--<h4 class="text-success">(+1.37%)</h4>--></div>
                                    <div class="me-3"><div id="marketing-overview-legend"></div></div>
                                  </div>
                                  <div>
                                    <canvas id="KPI1"></canvas>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row flex-grow">
                          </div>
                        </div>
                        <div class="col-lg-4 d-flex flex-column">
                          <div class="row flex-grow">
                            <div class="col-12 grid-margin stretch-card">
                              <div class="card card-rounded">
                                <div class="card-body">
                                  <div class="row">
                                    <div class="col-lg-12">
                                      <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h4 class="card-title card-title-dash">Type By Amount</h4>
                                      </div>
                                      <canvas class="my-auto" id="KPI2" height="200"></canvas>
                                      <div id="doughnut-chart-legend" class="mt-5 text-center"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Chart from 'chart.js/auto'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {},

  mounted() {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
    const data_1 = {
      labels: labels,
      datasets: [{
        label: 'Profits',
        data: [15000, 23432, 25000, 20000, 19000, 23000, 24000,27000, 28000, 30000, 36251],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const config_1 = {
      type: 'line',
      data: data_1,
      options: {
        responsive: true,
      }
    }

    const ctx_1 = document.getElementById('KPI1');

    new Chart(ctx_1, config_1);


    const data_2 = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const config_2 = {
      type: 'doughnut',
      data: data_2,
    };

    const ctx_2 = document.getElementById('KPI2');

    new Chart(ctx_2, config_2);

  }
}


</script>

<style scoped>

</style>