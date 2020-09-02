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
              <span class="subheading">Completed Shopping List Data.</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    
    <div v-for="complete in completed">
      <p>Store Name: {{ complete.store_name }}</p>
      <p>Product Name: {{ complete.product_name }}</p> 
      <p>Quantity: {{ complete.quantity }}</p>
      <p>Price: {{ complete.price }}</p>
      <p>Deadline: {{ complete.deadline }}</p>
      <p>Store Notes: {{ complete.store_notes }}</p>
      <p>Timestamp: {{ complete.timestamp }}</p>
      <p>Store Notes Timestamp: {{ complete.store_notes_timestamp }}</p>
      <p>Status: Completed</p>

      <h1>
        <button v-on:click="showInfo(complete)">EDIT</button>
      </h1>


      <hr>
     
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
        <p>Status: Completed</p>
        
        <button v-on:click="updateProduct(currentProduct)">Update</button>

        <button v-on:click="destroyProduct(currentProduct)">Delete Product</button>

        <button>Close</button>


      </form>
    </dialog>

    

    <h2>Customizable Smart Graph (Goes Below):</h2>

    <hr>

    <canvas id="myChart" width="400" height="400"></canvas>

    

    <h2>Customizable Smart Map (Goes Below):</h2>

    <hr>

    <h2>Smart Map goes here.</h2>

   

  </div>



</template>

<style>
</style>







<script>
import axios from "axios";
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    this.renderChart(data, options);
  },
  data: function () {
    return {
      message: "My Completed Shopping List History:",
      completed: [],
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
    },
    showInfo: function (complete) {
      console.log(complete);
      this.currentComplete = complete;
      document.querySelector("#completed-details").showModal();
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

