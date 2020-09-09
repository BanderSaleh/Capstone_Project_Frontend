<template>
  <div class="Statistics">
    <!-- Page Header -->
    <header class="masthead" style="background-image: url('img/about-bg.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="page-heading">
              <h1>My Statistics</h1>
              <span class="subheading">[Smart Graph] [Smart Map]</span>
              <!-- <span class="subheading">[Smart Table]</span> -->
            </div>
          </div>
        </div>
      </div>
    </header>



    <!-- Chart 3 -->
   <div id="chart3">
    <h1>Completed Shopping Data: Quantity vs Date</h1>
    <apexchart width="500" align="center" type="line" :options="chartOptions" :series="series"></apexchart>
    <hr>
   </div>
   
   <h1>Chart Data:</h1>
   

   


   
    <h1>Full Completed Tables:</h1>


    <div v-for="complete in completed">
      <p>Store Name: {{ complete.store_name }}</p>
      <p>Product Name: {{ complete.product_name }}</p>
      <p>Quantity: {{ complete.quantity }}</p>
      <p>Price: {{ complete.price }}</p>
      <p>Deadline: {{ complete.deadline }}</p>
      <p>Store Notes: {{ complete.store_notes }}</p>
      <p>Timestamp: {{ complete.timestamp }}</p>
      <p>Store Notes Timestamp: {{ complete.store_notes_timestamp }}</p>
      <p>Picture: <img v-bind:src="complete.picture" height=" 120px"></p>
      <p>Status: Completed</p>

      <h1>
        <button v-on:click="showInfo(complete)">EDIT</button>
      </h1>

      <hr />
    </div>

    <dialog id="completed-details">
      <form method="dialog">
        <h1>Product info</h1>
        <p>Store Name: <input type="text" v-model="currentComplete.store_name" /></p>
        <p>Product Name: <input type="text" v-model="currentComplete.product_name" /></p>
        <p>Quantity: <input type="text" v-model="currentComplete.quantity" /></p>
        <p>Price: <input type="text" v-model="currentComplete.price" /></p>
        <p>Deadline: <input type="text" v-model="currentComplete.deadline" /></p>
        <p>Store Notes: <input type="text" v-model="currentComplete.store_notes" /></p>
        <p>Timestamp: <input type="text" v-model="currentComplete.timestamp" /></p>
        <p>Store Notes Timestamp: <input type="text" v-model="currentComplete.store_notes_timestamp" /></p>
        <p>Picture (URL): <input type="text" v-model="currentComplete.picture" /></p>


        <p>Status: Completed</p>

        <button v-on:click="updateComplete(currentComplete)">Update</button>

        <button v-on:click="destroyComplete(currentComplete)">
          Delete Product
        </button>

        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import StockChart from "./components/StockChart";
import AreaChart from "./components/AreaChart";
import MapChart from "./components/MapChart";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import ChartBar from "@/components/chart-bar";
import ChartDoughnut from "@/components/chart-doughnut";
import ChartLine from "@/components/chart-line";
import { Line } from "vue-chartjs";
import { Bar } from "vue-chartjs";
import { mixins } from "vue-chartjs";
import VueCharts from "vue-chartjs";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import LineChart from "@/components/LineChart";
import VueApexCharts from "vue-apexcharts";

Chartkick.use(Chart);

exportingInit(Highcharts);

export default {
  name: "app",
  data: function () {
    return {
      message: "My Completed Shopping List History:",
      completed: [],
      complete: [],
      completedChart: [],
      completeChart: [],
      newCompletedStoreName: "",
      newCompletedProductName: "",
      newCompletedQuantity: "",
      newCompletedPrice: "",
      newCompletedDeadline: "",
      newCompletedStoreNotes: "",
      newCompletedTimestamp: "",
      newCompletedStoreNotesTimestamp: "",
      newCompletedStatus: "",
      currentComplete: {},
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "2020-01-01",
            "2020-02-01",
            "2020-03-01",
            "2020-04-01",
            "2020-05-01",
            "2020-06-01",
            "2020-07-01",
            "2020-08-01",
            "2020-09-01",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91, 40],
        },
      ],
    };
  },
  created: function () {
    this.indexCompleted();
  },
  methods: {
    indexCompleted: function () {
      console.log("completed index...");

      axios.get("/api/completed").then((response2) => {
        console.log(response2);
        this.completed = response2.data;
      });
    },

    showInfo: function (complete) {
      console.log(complete);
      this.currentComplete = complete;
      document.querySelector("#completed-details").showModal();
    },
    updateComplete: function (complete) {
      console.log(complete);

      var params = {
        id: complete.id,
        store_name: complete.store_name,
        product_name: complete.product_name,
        quantity: complete.quantity,
        price: complete.price,
        deadline: complete.deadline,
        store_notes: complete.store_notes,
        timestamp: complete.timestamp,
        store_notes_timestamp: complete.store_notes_timestamp,
        picture: complete.picture,
        status: "Completed",
      };

      axios.patch("/api/completed/" + complete.id, params).then((response) => {
        console.log(response.data);
        this.currentComplete = {};
      });
    },
    destroyComplete: function (complete) {
      axios.delete("/api/completed/" + complete.id).then((response) => {
        console.log(response);
        var index = this.completed.indexOf(complete);
        this.completed.splice(index, 1);
      });
    },
  },
};
</script>
