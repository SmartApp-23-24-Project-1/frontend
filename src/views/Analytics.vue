<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-12 d-flex flex-column ">
        <p class="title mb-5"> Analytics </p>
        <div class="card card-rounded">
          <div class="card-body">
            <div class="d-sm-flex justify-content-between align-items-start">
              <div>
                <h4 class="card-title card-title-dash">KPIs usage</h4>
                <p class="card-subtitle card-subtitle-dash">A bar graph about the usage of the
                  {{ usage_entries }} most called KPI is shown here.</p>
              </div>
            </div>
            <div>
              <canvas id="KPI_usage"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5 justify-content-center">
      <div class="col-lg-12">
        <div class="card card-rounded">
          <div class="card-body">
            <h4 class="card-title card-title-dash">Updates</h4>
            <p class="card-subtitle card-subtitle-dash">Missing KPI calculation will be reported here if
              present.</p>
            <template v-for="kpi in kpis" v-bind:key="kpi.name">
              <p v-if="kpi.counter >= 1 && lastUpdate(kpi.last_update, kpi.frequency) === 0">
                {{ kpi.name }} last calculation exceeds its calculation frequency.
              </p>
              <!--<p v-else-if="kpi.counter >= 1 && lastUpdate(kpi.last_update, kpi.frequency) === 1">
                TARANTELLE
              </p>-->
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from "axios";
import {BASE_URL} from "@/constants/constants";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      kpis: [],
      usage_entries: 10
    }
  },
  components: {},
  async mounted() {

    await this.getKPIs();

    // adapt the usage entries to the number of the kpis, if there are not enough kpis
    this.usage_entries = Math.min(this.usage_entries, this.kpis.length)

    // GRAPHS

    /* ###################### KPI USAGE GRAPH #######################*/
    let kpi_usage_dict = {};
    for (let i of this.kpis) {
      kpi_usage_dict[i["name"]] = i["counter"]; //+ Math.floor(Math.random()*10)
    }

    // Sorting the kpis wrt the number of calls
    let sorted_kpi_usage_array = Object.entries(kpi_usage_dict);
    sorted_kpi_usage_array.sort((a, b) => b[1] - a[1]);

    // Keeping only the first 'usage_entries' kpis with the most number of calls
    kpi_usage_dict = Object.fromEntries(sorted_kpi_usage_array.slice(0, this.usage_entries));

    // Building the KPI_Usage graph
    const usage_graph_ctx = document.getElementById('KPI_usage');

    const usage_graph_data = {
      labels: Object.keys(kpi_usage_dict),
      datasets: [{
        label: 'Number of calls',
        data: Object.values(kpi_usage_dict),
        borderWidth: 1
      }]
    };

    const usage_graph_config = {
      type: 'bar',
      data: usage_graph_data,
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: '# of calls'
            },
            min: 0,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    };

    new Chart(usage_graph_ctx, usage_graph_config);

    /* ###################### KPI USAGE GRAPH #######################*/


    /*
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
    */

  },
  methods: {
    async getKPIs() {
      this.$store.commit("showSpinner");
      await axios.get(BASE_URL + "kpis", {
        headers: {
          withCredentials: 'true',
          'Authorization': 'Basic ' + btoa('smartapp' + ':' + 'api'),
        }
      }).then(response => {
        this.kpis = response.data.data;
        for (let i = 0; i < this.kpis.length; i++) {
          if (this.kpis[i].name === 'oee') {
            this.medical = false;
          } else {
            this.medical = true;
          }
        }
        while (this.kpis.length === 0) {
          this.$store.commit("showSpinner");
        }
        this.$store.commit("hideSpinner");
      }).catch((error) => {
        console.log(error);
      });
    },
    lastUpdate(last_update, frequency) {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      today = dd + '-' + mm + '-' + yyyy;
      let lastup = this.format(last_update);
      let lastupDate = new Date(lastup);
      let todayDate = new Date(today);
      let frequence;
      if (frequency === 'daily') {
        frequence = 86400000;
        if (todayDate.getTime() - lastupDate.getTime() > frequence) {
          console.log('fr sup');
          return 0;
        } else {
          console.log('fr not sup');
          return 1;
        }
      } else if (frequency === 'monthly') {
        let months;
        months = (todayDate.getFullYear() - lastupDate.getFullYear()) * 12;
        months -= lastupDate.getMonth();
        months += todayDate.getMonth();
        if (frequence > 0) {
          console.log('fr sup');
          return 0;
        } else {
          console.log('fr not sup');
          return 1;
        }
      } else if (frequency === 'weekly') {
        let diffInMs = todayDate - lastupDate;
        frequence = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (frequence > 7) {
          console.log('fr sup');
          return 0;
        } else {
          console.log('fr not sup');
          return 1;
        }
      }

      if (todayDate.getTime() - lastupDate.getTime() > frequence) {
        console.log('lastup and today are equal');
      } else {
        console.log('lastup is greater than today');
      }

    },
    format(value) {
      let date = new Date(value);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      return day + '-' + month + '-' + year;
    }
  }
}


</script>

<style scoped>
.card-body {
  box-shadow: 5px 5px 5px var(--shadow-color);
}
</style>