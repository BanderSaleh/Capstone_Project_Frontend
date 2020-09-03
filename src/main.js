import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SortedTablePlugin from "vue-sorted-table";
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import stockInit from 'highcharts/modules/stock';
import mapInit from 'highcharts/modules/map';
import addWorldMap from './js/worldmap';


stockInit(Highcharts);
mapInit(Highcharts);
addWorldMap(Highcharts);

Vue.use(HighchartsVue);
Vue.use(SortedTablePlugin);












axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
