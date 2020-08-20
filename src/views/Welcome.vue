<template>

  <div class="welcome">
    
    
    
    <h1>Shopping List App, save paper!</h1>

    <h2>[ To save your Shopping List(s), please Login or Signup! ]</h2>

    <h3>App Features:</h3>

    <h4>-Customizable Shopping Lists to save paper!</h4>

    <h4>-Statistics Page containing Smart Graphs that show how well you have been grocery shopping!</h4>

    <h4> List Style #1:</h4>

    <img :src="image1" width="900" alt="Casual Jacket">

    <h4> List Style #2:</h4>

    <img :src="image2" width="900" alt="Casual Jacket">

    <h4> List Style #3:</h4>
    <h4> [Figure out styles list]</h4>

    <h1>:)</h1>
    
  </div>


  
  
  


</template>

<style>
</style>

<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue2-filters/dist/vue2-filters.min.js"></script>

<script>
  new Vue({
    ...
    mixins: [Vue2Filters.mixin],
    ...
  })
</script>

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


