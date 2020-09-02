<template>



  <div class="welcome">

    <!-- Page Header -->
    <header class="masthead" style="background-image: url('img/home-bg.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>Shopping List App,</h1>
              <span class="subheading">Save Paper!</span>
              

              

            </div>
          </div>
        </div>
      </div>
    </header>

    
    <hr>

    <h1>To save your Shopping List(s), please Login or Signup!</h1>

    <hr>
    
    <h1>App Features:</h1>

    <h4>-Customizable Shopping Lists to save paper!</h4>

    <h4>-Shopping Lists made with Smart Tables for fluidity.</h4>

    <h4>-Statistics page containing Smart Graphs that display how well you have been grocery shopping lately!</h4>

    <h4>-Statistics page also containing a Smart Map that displays visited stores, notes about specific/nonspecific store name locations, and other User's opinions on specific store locations.</h4>

    <h4>-Personal Notes about non specific store locations can be viewed in the "More Info" button. Other people's "Store Notes" can be viewed in the "More Info" button when the Specific Location option is checked.</h4>

    <h4> App Running Proof:</h4>

    <h1>N/A</h1>

    <h2>Inspiration for the "Shopping List App, Save Paper!":</h2>

    <h4> List Style #1:</h4>

    <img :src="image1" width="900" alt="Casual Jacket">

    <h4> List Style #2:</h4>

    <img :src="image2" width="900" alt="Casual Jacket">

    <h4> List Style #3:</h4>

    <img :src="image3" width="900" alt="Casual Jacket">

    <h4> List Style #4:</h4>

    <img :src="image4" width="900" alt="Casual Jacket">

    <h4> List Style #5:</h4>

    <img :src="image5" width="900" alt="Casual Jacket">

    <h4> List Style #3:</h4>
    <h4> [Figure out styles list]</h4>

    <h1>:)</h1>

  
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
      image1: require("@/assets/images/Inspiration1.jpg"),
      image2: require("@/assets/images/Inspiration2.jpg"),
      image3: require("@/assets/images/Inspiration3.jpg"),
      image4: require("@/assets/images/Inspiration4.jpg"),
      image5: require("@/assets/images/Inspiration5StickyNotes.jpg"),
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


