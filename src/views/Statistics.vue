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



    <!-- Chart 3 -->
   <div id="chart3">
    <h1>Completed Shopping Data: Quantity vs Date</h1>
    <apexchart width="500" align="center" type="line" :options="chartOptions" :series="series"></apexchart>
    <hr>
   </div>
   
   <h1>Chart Data:</h1>
   <h4>Timestamp vs Quantity</h4>

   <hr>
   


   
    <h1>Completed Products Table:</h1>

    <hr>

    <!-- Smart Table Structure -->
    <div id="app">
      <div :style="{ backgroundImage: `url('${wallpaper1}' )` }">
        <SortedTable :values="completed">
          <thead>
            <tr>
              <th scope="col" style="button: left; width: 10rem;">
                <SortLink name="button">Edit</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="store_name">Store Name</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="product_name">Product Name</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="quantity">Quantity</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="price">Price</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="deadline">Deadline</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="store_notes">Notes</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="timestamp">Timestamp</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="picture">Picture</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="status">Status</SortLink>
              </th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="product in sort.values" :key="product.id">
              <td>
                <button v-on:click="showInfo(product)">EDIT</button>
              </td>

              <td>{{ product.id }}</td>
              <td>{{ product.store_name }}</td>
              <td>{{ product.product_name }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.deadline }}</td>
              <td>{{ product.store_notes }}</td>
              <td>{{ product.timestamp }}</td>
              <img v-bind:src="product.picture" height=" 120px" />
              <td>{{ product.status }}</td>
            </tr>
          </tbody>
        </SortedTable>
      </div>
    </div>    

    <hr>

    <!-- Show Product Editable Section -->
    <dialog id="product-details">
      <form method="dialog">
        <h1>Product info</h1>
        <p>
          Store Name: <input type="text" v-model="currentProduct.store_name" />
        </p>
        <p>
          Product Name:
          <input type="text" v-model="currentProduct.product_name" />
        </p>
        <p>Quantity: <input type="text" v-model="currentProduct.quantity" /></p>
        <p>Price: <input type="text" v-model="currentProduct.price" /></p>
        <p>Deadline: <input type="text" v-model="currentProduct.deadline" /></p>
        <p>Notes: <input type="text" v-model="currentProduct.store_notes" /></p>
        <p>
        <p>Timestamp: <input type="text" v-model="currentProduct.timestamp" /></p>
        <p>
          Picture (URL): <input type="text" v-model="currentProduct.picture" />
        </p>
        <p>Status: "Completed"</p>

        <button v-on:click="updateProduct(currentProduct)">Update</button>

        <button v-on:click="destroyProduct(currentProduct)">
          Delete Product
        </button>

        <button>Close</button>
      </form>
    </dialog>


    <!-- <div v-for="complete in completed">
      <p>Store Name: {{ complete.store_name }}</p>
      <p>Product Name: {{ complete.product_name }}</p>
      <p>Quantity: {{ complete.quantity }}</p>
      <p>Price: {{ complete.price }}</p>
      <p>Deadline: {{ complete.deadline }}</p>
      <p>Store Notes: {{ complete.store_notes }}</p>
      <p>Timestamp: {{ complete.timestamp }}</p>
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

        <p>Picture (URL): <input type="text" v-model="currentComplete.picture" /></p>


        <p>Status: Completed</p>

        <button v-on:click="updateComplete(currentComplete)">Update</button>

        <button v-on:click="destroyComplete(currentComplete)">
          Delete Product
        </button>

        <button>Close</button>
      </form>
    </dialog> -->
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
      currentProduct: {},
      newCompletedStoreName: "",
      newCompletedProductName: "",
      newCompletedQuantity: "",
      newCompletedPrice: "",
      newCompletedDeadline: "",
      newCompletedStoreNotes: "",
      newCompletedTimestamp: "",
      newCompletedStoreNotesTimestamp: "",
      newCompletedStatus: "",
      wallpaper1: require("@/assets/images/Wallpaper1.jpg"),
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
    showInfo: function (product) {
      console.log(product);
      this.currentProduct = product;
      document.querySelector("#product-details").showModal();
    },
    updateProduct: function (product) {
      console.log(product);

      var params = {
        store_name: product.store_name,
        product_name: product.product_name,
        quantity: product.quantity,
        price: product.price,
        deadline: product.deadline,
        store_notes: product.store_notes,
        timestamp: product.timestamp,
        picture: product.picture,
        // status: "Carted",
      };

      axios.patch("/api/products/" + product.id, params).then((response) => {
        console.log(response.data);
        this.currentProduct = {};
      });
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
