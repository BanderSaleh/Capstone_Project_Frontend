<template>


  <div id="app">

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      
      <div class="container">
        <hr>
        <hr>

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
              <a class="nav-link" href="/statistics">Statistics</a>
            </li>
            <li class="nav-item"v-if="isLoggedIn()">
              <a class="nav-link" href="/account">Account</a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="contact.html">Extra image</a>
            </li> -->
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
              <a class="nav-link" href="/portfolio">Portfolio</a>
            </li>



          </ul>
        </div>
      </div>
    </nav>

    

    

    

    <!-- Main Content -->
    
    

    

    <!-- Footer -->
    <router-view/>

    <div id="footer">

      <footer>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
              <ul class="list-inline text-center">
              </ul>
              <router-link to="/about">about</router-link> |
              <router-link to="contact">contact</router-link> |
              <router-link to="/faq">faq</router-link> |
              <router-link to="/terms">terms</router-link> |
              <router-link to="/privacy">privacy</router-link>
              <p class="copyright text-muted"></p>
                <p></p>
                <p>A Bander Saleh production</p>
                <p>© 2020, Bander Saleh. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  
    
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

#footer {
  font-weight: bold;
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
// import Chart from "./components/Chart.vue";
import StockChart from "./components/StockChart";
import MapChart from "./components/MapChart";
// import Chartkick from "chartkick";
// import Chart from "chart.js";

// Chartkick.use(Chart);

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
      account: [],
      message: "My Shopping List:",
      products: [],
      image1: require("@/assets/images/shopping_list_1.jpg"),
      image2: require("@/assets/images/shopping_list_2.jpeg"),
      selected: "chart",
      currentView: "chart",
    };
  },
  components: {
    chart: Chart,
    stockChart: StockChart,
    mapChart: MapChart,
  },
  created: function () {
    this.indexProducts();
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
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
    MeUserInfo: function () {
      console.log("Signed in User...");

      axios.get("/api/account").then((response) => {
        console.log(response);
        this.account = response.data;
      });
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


