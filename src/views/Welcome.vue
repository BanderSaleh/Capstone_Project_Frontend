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
    
    <div class="PressStart">
      <h1>{{ message5 }}</h1>
      <a class="header"v-if="!isLoggedIn()">{{ message6 }}</a>
      <a class="header"v-if="isLoggedIn()" href="/home">{{ message6 }}</a>
    </div>

    <h1>{{ message7 }}</h1>

    <hr>


  
    


    
    

    <div id="body1">
      <h1>App Features:</h1>

      <h4>-Customizable Shopping Lists to save paper!</h4>

      <h4>-Shopping Lists made with Smart Tables for fluidity.</h4>

      <h4>-Statistics page containing Smart Graphs that display how well you have been grocery shopping lately!</h4>

      <h4>-Statistics page also containing a Smart Map that displays visited stores, notes about specific/nonspecific store name locations, and other User's opinions on specific store locations.</h4>

      <h4>-Personal Notes about non specific store locations can be viewed in the "More Info" button. Other people's "Store Notes" can be viewed in the "More Info" button when the Specific Location option is checked.</h4>

      <h4>-Current App Version: 1.74</h4>
    </div>

    <hr>

    <h1> App Running Proof:</h1>

    <img :src="screenshot1" width="1000" alt="Casual Jacket">

    <hr>

    <h1>Inspiration for the "Shopping List App, Save Paper!":</h1>

    <h4> List Style #1:</h4>

    <img :src="image1" width="350" alt="Casual Jacket">

    <hr>

    <h4> List Style #2:</h4>

    <img :src="image2" width="350" alt="Casual Jacket">

    <hr>

    <h4> List Style #3:</h4>

    <img :src="image3" width="350" alt="Casual Jacket">

    <hr>

    <h4> List Style #4:</h4>

    <img :src="image4" width="350" alt="Casual Jacket">

    <hr>

    <h4> List Style #5: Multiple Color Options!</h4>

    <img :src="image5" width="350" alt="Casual Jacket">

    <hr>

    <h4> List Style #6: </h4>

    <img :src="imagegoogle3" width="350" alt="Casual Jacket">

    <hr>

    <h4> List Style #7: </h4>

    <img :src="imagegoogle2" width="350" alt="Casual Jacket">

    <hr>

    <h4> List Style #8: </h4>

    <img :src="imagegoogle1" width="350" alt="Casual Jacket">

    <hr>

    

    <h1>*Customizable* Shopping List App, Save Paper!</h1>

    <hr>


  
  </div>
    

</template>





<style>
.v-card__text {
  color: rgb(0, 0, 0) !important;
}
#body1 {
  text-align: left;
  padding-left: 16px;
}
</style>


<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "My Shopping List:",
      message5:
        "To save your Shopping List, please Login or Signup! Then, click on the:",
      message6: "[ My Shopping List ]",
      message7: "button in the Header above^",
      products: [],
      image1: require("@/assets/images/Inspiration1.jpg"),
      image2: require("@/assets/images/Inspiration2.jpg"),
      image3: require("@/assets/images/Inspiration3.jpg"),
      image4: require("@/assets/images/Inspiration4.jpg"),
      image5: require("@/assets/images/Inspiration5StickyNotes.jpg"),
      screenshot1: require("@/assets/images/screenshot1.png"),
      imagegoogle1: require("@/assets/images/shopping_list_1.jpg"),
      imagegoogle2: require("@/assets/images/shopping_list_2.jpeg"),
      imagegoogle3: require("@/assets/images/shopping_list_3.jpg"),
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


