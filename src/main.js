import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import * as MathLive from "./mathlive";
import VueMathfield from "./vue-mathlive";

let arr = [];
let kpi = 1;
const NUM_OF_KPI_ROWS = 4;
const NUM_OF_KPI_COLS = 8;

for (let i = 0; i < NUM_OF_KPI_ROWS; i++) {
  arr.push([]);

  for (let j = 0; j < NUM_OF_KPI_COLS; j++) {
    arr[i][j] = {
      label: "KPI" + kpi,
      class: 'small'
    };
    kpi++;
  }
}

mathVirtualKeyboard.layouts = [
  {
    label: 'Basic',
    rows: [
      [
        '[7]',
        '[8]',
        '[9]',
        '[+]',
        "[separator-5]",
        "\\sqrt{#0}",
        "",
      ],
      [
        '[4]',
        '[5]',
        '[6]',
        '[-]',
        "[separator-5]",
        "max(#0)",
        "count(#0)",
      ],
      [
        '[1]',
        '[2]',
        '[3]',
        '*',
        "[separator-5]",
        "(",
        "",
      ],
      [
        { label: '[0]', width: 2 },
        ",",
        '/',
        "[separator-5]",
        ")",
        "",
      ],
    ],
  },
  {
    label: 'KPI',
    rows: arr,
  }
];

mathVirtualKeyboard.layouts[1].rows = arr;

createApp(App).use(store, VueMathfield, MathLive).use(router).mount('#app')
