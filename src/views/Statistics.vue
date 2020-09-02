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

  
    

    
    
    
    <h1>My Statistics!</h1>
    
    <h2>{{ message }}</h2>

    
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


      <h2> ---------------------------------------------------------------------------------------------</h2>
     
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


    <h2>(Customizable Smart Graph Goes Here!)</h2>


    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <ul class="list-inline text-center">
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
            <router-link to="/about">[about]</router-link> |
            <router-link to="/contact">[contact]</router-link> |
            <router-link to="/faq">[faq]</router-link> |
            <router-link to="/terms">[terms]</router-link> |
            <router-link to="/privacy">[privacy]</router-link>
            <p class="copyright text-muted"></p>
              <p></p>
              <p>A Bander Saleh production</p>
              <p>© 2020, Bander Saleh. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>

  </div>



</template>

<style>
</style>

<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue2-filters/dist/vue2-filters.min.js"></script>




<script>
import axios from "axios";

export default {
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

