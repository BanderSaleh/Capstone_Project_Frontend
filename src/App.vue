<template>



  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand"v-if="!isLoggedIn()"</a>
        <a class="navbar-brand"v-if="isLoggedIn()" href="/home">My Shopping List</a>

        
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Welcome</a>
            </li>
            <li class="nav-item"v-if="isLoggedIn()">
              <a class="nav-link" href="statistics.html">Statistics</a>
            </li>
            <li class="nav-item"v-if="isLoggedIn()">
              <a class="nav-link" href="account.html">Account</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">Extra image</a>
            </li>
            <li class="nav-item"v-if="isLoggedIn()">
              <a class="nav-link" href="/logout">Logout</a>
            </li>
            <li class="nav-item"v-if="!isLoggedIn()">
              <a class="nav-link" href="/signup">Signup</a>
            </li>
            <li class="nav-item"v-if="!isLoggedIn()">
              <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/BFAPortfolio">BFA Portfolio</a>
            </li>



          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Header -->
    <header class="masthead" style="background-image: url('img/home-bg.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>Shopping List App,</h1>
              <span class="subheading">Save Paper!</span>
              <span class="subheading">[ To save your Shopping List(s), please Login or Signup! ]</span>

              

            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    
    

    <hr>

    <!-- Footer -->
    

    <router-view/>
    
  </div>

  
</template>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>



<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "My Shopping List:",
      products: [],
      image1: require("@/assets/images/shopping_list_1.jpg"),
      image2: require("@/assets/images/shopping_list_2.jpeg"),
    };
  },
  created: function () {
    this.indexProducts();
  },
  methods: {
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    getUserID: function () {
      return localStorage.getItem("user_id");
    },
    indexProducts: function () {
      console.log("products index...");

      axios.get("/api/products").then((response) => {
        console.log(response);
        this.products = response.data;
      });
    },

    addProduct: function () {
      console.log("adding product...");
      console.log(this.newProductName);

      var params = {
        store_name: this.newStoreName,
        product_name: this.newProductName,
        quantity: this.quantity,
        price: this.price,
        deadline: this.deadline,
        newStoreNotesTimestamp: this.newStoreNotesTimestamp,
        status: this.status,
      };

      axios.post("/api/products", params).then((response) => {
        console.log(response.data);
        this.products.push(response.data);
      });
    },
  },
};
</script>


