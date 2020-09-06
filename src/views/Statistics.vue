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



    <!-- Chart 1 -->
    <div>
      <h1>Completed Shopping Data: Quantity vs Date</h1>

      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

      <line-chart :data="chartData"></line-chart>

      <!-- <div class="grid"> -->
        <!-- <ChartBar /> -->
        <!-- <ChartDoughnut /> -->
        <!-- <ChartLine /> -->
      <!-- </div> -->
    </div>

    



    <h1>Chart Data</h1>
    <!-- <p>Graphable Data: {{ completedChart }}</p> -->
    <!-- <p>Timestamp: {{ completedChart }}</p> -->
    <!-- <p>Quantity: {{ completedChart }}</p> -->


    <div v-for="completeChart in completedChart">
      <dialog id=""
      <p>Quantity: {{ completeChart.quantity }}</p>
      <p>Timestamp: {{ completeChart.timestamp }}</p>
      <hr />
    </div>



    <hr>

    
 


   



    <!-- Graph this data:
    v-model="currentComplete.quantity"
    v-model="currentComplete.timestamp" -->
<!-- 
    <div class="logos">
      <img
        class="logo-hc"
        src="./assets/highcharts_logo.png"
        alt="Highcharts Logo"
      />
      <img class="logo-vue" src="./assets/vue_logo.png" alt="Vue Logo" />
    </div>
    <h1>Completed Shopping Data: Quantity vs Date!</h1>
    <hr style="width: 200px; margin: 60px auto;" />
    <h3>Select graph type:</h3>
    <div class="button-grp">
      <button
        @click="select('stockChart')"
        :class="{ btnActive: selected === 'stockChart' }"
      >
        Line Graph
      </button>

      <button
        @click="select('areaChart')"
        :class="{ btnActive: selected === 'areaChart' }"
      >
        Area Graph
      </button>

      <button
        @click="select('chart')"
        :class="{ btnActive: selected === 'chart' }"
      >
        Bar Graph
      </button>
    </div>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>

    <hr> -->

<!-- 
    <div class="maps">
      <img
        class="logo-hc"
        src="./assets/highcharts_logo.png"
        alt="Highcharts Logo"
      />
      <img class="logo-vue" src="./assets/vue_logo.png" alt="Vue Logo" />
    </div>
    <h1>Smart Map Containing: Public/Private Store Notes!</h1>
    <hr style="width: 200px; margin: 60px auto;" />

    <div class="button-grq">

    </div>
    <keep-alive>
      <component :is="currentMap"></component>
    </keep-alive>

    <hr />

    <div v-for="complete in completed">
      <h1>Hide Below Eventually:</h1>
      <h1>Answer #1:</h1>
      <p>Quantity: {{ complete.quantity }}</p>
      <p>Timestamp: {{ complete.timestamp }}</p>
    </div> -->

    <!-- <div v-for="complete in completed">
      <h1>Hide Below Eventually:</h1>
      <h1>Answer #1:</h1>
      <p>Quantity: {{ complete.quantity }}</p>
      <p>Timestamp: {{ complete.timestamp }}</p>
    </div> -->

    <h1>Full Completed Tables:</h1>

    <!-- <p>Graphable Data: {{ completed }}</p> -->

    <div v-for="complete in completed">
      <dialog id=""
      <p>Store Name: {{ complete.store_name }}</p>
      <p>Product Name: {{ complete.product_name }}</p>
      <p>Quantity: {{ complete.quantity }}</p>
      <p>Price: {{ complete.price }}</p>
      <p>Deadline: {{ complete.deadline }}</p>
      <p>Store Notes: {{ complete.store_notes }}</p>
      <p>Timestamp: {{ complete.timestamp }}</p>
      <p>Store Notes Timestamp: {{ complete.store_notes_timestamp }}</p>
      <p>picture: {{ complete.picture }}</p>
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
        <p>Picture: <input type="text" v-model="currentComplete.picture" /></p>


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
// import Chart from "./components/Chart.vue";
import StockChart from "./components/StockChart";
import AreaChart from "./components/AreaChart";
import MapChart from "./components/MapChart";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import ChartBar from "@/components/chart-bar";
import ChartDoughnut from "@/components/chart-doughnut";
import ChartLine from "@/components/chart-line";
import { Line } from 'vue-chartjs';
import { Bar } from 'vue-chartjs';
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
 
Chartkick.use(Chart);



exportingInit(Highcharts);

export default {
  name: "app",
  components: {
    ChartBar,
    ChartDoughnut,
    ChartLine,
  },
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
      selected: "stockChart",
      currentView: "stockChart",
      currentMap: "mapChart",
      chartData: {'2020-07': 1, '2020-08': 2, '2020-09': 5},      
    };
  },
  created: function () {
    this.indexCompleted();
    this.indexChart();
  },  
  methods: {
    indexCompleted: function () {
      console.log("completed index...");

      axios.get("/api/completed").then((response2) => {
        console.log(response2);
        this.completed = response2.data;
      });
    },
    indexChart: function () {
      console.log("Graph Data from Completed2...");

      axios.get("/api/completed/show2").then((response) => {
        console.log(response);
        this.completedChart = response.data;
      });
    },    
    graphData: function () {
      console.log("Prep data before graphing")
      axios.get("/api/completed/show2").then((response3) => {
        console.log(response3);
        this.chartData = {};
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
