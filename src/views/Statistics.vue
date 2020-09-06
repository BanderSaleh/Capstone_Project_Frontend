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
              <span class="subheading">[Smart Table]</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Graph this data:
    v-model="currentComplete.quantity"
    v-model="currentComplete.timestamp" -->

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

    <hr>

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

    <!-- <hr> -->

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

<style></style>

<script>
import axios from "axios";
import Chart from "./components/Chart.vue";
import StockChart from "./components/StockChart";
import AreaChart from "./components/AreaChart";
import MapChart from "./components/MapChart";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";

exportingInit(Highcharts);

export default {
  name: "app",
  components: {
    chart: Chart,
    stockChart: StockChart,
    areaChart: AreaChart,
    mapChart: MapChart,
  },
  data: function () {
    return {
      message: "My Completed Shopping List History:",
      completed: [],
      complete: [],
      completedChart: [],
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
    };
  },
  created: function () {
    this.indexCompleted();
  },
  methods: {
    indexCompleted: function () {
      console.log("completed index...");

      axios.get("/api/completed").then((response) => {
        console.log(response);
        this.completed = response.data;
      });
      axios.get("/api/completed").then((response) => {
        console.log(response);
        this.completedChart = response.data;
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
    activate(elem) {
      this.selected = elem;
    },
    handler() {
      var args = arguments;
      for (var arg of args) {
        if (arg instanceof Function) {
          arg();
        }
      }
    },
    select(elem) {
      this.currentView = elem;
      this.activate(elem);
    },
    // addCompleted: function () {
    //   console.log("adding product...");
    //   console.log(this.newProductName);

    //   var params = {
    //     store_name: this.newStoreName,
    //     product_name: this.newProductName,
    //     quantity: this.quantity,
    //     price: this.price,
    //     deadline: this.deadline,
    //     newStoreNotesTimestamp: this.newStoreNotesTimestamp,
    //     status: this.status,
    //   };

    //   axios.post("/api/completed", params).then((response) => {
    //     console.log(response.data);
    //     this.completed.push(response.data);
    //   });
    // },
  },
};
</script>
