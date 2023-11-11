<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <p class="title"> Source </p>
        <table style="width: 100%">
          <thead>
          <tr>
            <th style="width: 20%">Name</th>
            <th style="width: 20%">Description</th>
            <th style="width: 35%">Formula</th>
            <th style="width: 15%">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style="width: 20%">
              <!--<p v-for="kpi in kpis" v-bind:key="kpi" class="t-text"> {{ kpi }} </p>-->
              <p class="t-text"> KPI 1 </p>
              <p class="t-text"> KPI 2 </p>
              <p class="t-text"> KPI 3 </p>
            </td>
            <td style="width: 20%">
              <!--<p v-for="desc in descriptions" v-bind:key="desc" class="t-text"> {{ desc }} </p>-->
              <p class="t-text"> DESCRIPTION 1 </p>
              <p class="t-text"> DESCRIPTION 2 </p>
              <p class="t-text"> DESCRIPTION 3 </p>
            </td>
            <td style="width: 35%">
              <!--<p v-for="formula in formulas" v-bind:key="formula" class="t-text"> {{ formula }} </p>-->
              <p class="t-text"> KPI 1 * KPI 2 / KPI 3</p>
              <p class="t-text"> KPI 1 * KPI 2 / KPI 3 </p>
              <p class="t-text"> KPI 1 * KPI 2 / KPI 3 </p>
            </td>
            <td style="width: 15%">
              <!--
              <section v-for="kpi in kpis" v-bind:key="kpi">
              METTERE I TRE P DELLE ICONE
              </section>
              -->

              <p class="mb-3">
                <router-link to="/info-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 512 512">
                    <path
                        d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                  </svg>
                </router-link>
                <!--<router-link to="/edit-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 512 512">
                    <path
                        d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                  </svg>
                </router-link>
                <router-link to="/delete-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 448 512">
                    <path
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                  </svg>
                </router-link>-->
              </p>
              <p class="mb-3">
                <router-link to="/info-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 512 512">
                    <path
                        d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                  </svg>
                </router-link>
                <!--<router-link to="/edit-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 512 512">
                    <path
                        d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                  </svg>
                </router-link>
                <router-link to="/delete-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 448 512">
                    <path
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                  </svg>
                </router-link>-->
              </p>
              <p>
                <router-link to="/info-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 512 512">
                    <path
                        d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                  </svg>
                </router-link>
                <!--<router-link to="/edit-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 512 512">
                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                  </svg>
                </router-link>
                <router-link to="/delete-kpi">
                  <svg xmlns="http://www.w3.org/2000/svg" class="t-icons" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                  </svg>
                </router-link>-->
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "@/constants/constants";

export default {
  name: "KbSource",
  components: {},
  data() {
    return {
      kpis: [],
      descriptions: [],
      formulas: []
    }
  },
  mounted() {
    this.getKPIs();
  },
  methods: {
    async getKPIs() {
      await axios.get(BASE_URL + "list_kpi"/*, {
            headers: {Authorization: `Bearer ${token}`}
        }*/)
          .then(response => {
            console.log(response);
            this.kpis = response.data;
          }).catch((error) => {
            console.log(error);
          });
    },
  }
}
</script>

<style scoped>

table {
  margin-top: 30px;
  background-color: #fff;
  border-radius: 13px;
}

thead th {
  padding: 15px;
  background-color: #1f3bb3;
  color: #fff;
  font-size: 21px;
  font-weight: 600;
  border-left: 1px solid #fff;
}

thead th:first-child {
  border-top-left-radius: 13px;
}

thead th:last-child {
  border-top-right-radius: 13px;
}

tbody tr td {
  padding-left: 20px;
}

tbody tr td:not(:first-child) {
  border-left: 0.5px solid #c9c9c9;
}

.t-text {
  font-size: 17px;
  font-weight: 400;
  margin: 20px 0;
}

.t-icons {
  width: 18px;
  margin: 0 15px 0 0;
  fill: #494949;
}

</style>