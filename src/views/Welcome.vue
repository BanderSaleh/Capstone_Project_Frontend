<template>
  <div class="welcome">
  <h1>[ To save your Shopping List(s), please Login or Signup! ]</h1>
  <h1> </h1>
  

  <h2>App Features:</h2>

  <h4>-Customizable Shopping Lists to save paper!</h4>

  <h4>-Shopping Lists made with Smart Tables for fluidity.</h4>

  <h4>-Statistics Page containing Smart Graphs that display how well you have been grocery shopping!</h4>

  <h4>-Statistics Page also contain a Smart Map that display visited stores, notes about specific/nonspecific store name locations, and other User's opinions on specific store locations.</h4>

  <h4>-Personal Notes about non specific store locations can be viewed in the "More Info" button. Other people's "Store Notes" can be viewed in the "More Info" button when the Specific Location option is checked.</h4>

  <h4> App Running Proof:</h4>

  <img :src="image1" width="900" alt="Casual Jacket">

  <h4> List Style #2:</h4>

  <img :src="image2" width="900" alt="Casual Jacket">

  <h4> List Style #3:</h4>
  <h4> [Figure out styles list]</h4>

  <h1>:)</h1>

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


