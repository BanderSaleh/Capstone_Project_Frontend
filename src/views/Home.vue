<template>


  <div class="home">

    
    
    
    
    <h1>Shopping List App, save paper!</h1>

    <h2>Welcome to your Shopping List!</h2>

    <h2>Create New Shopping List Item:</h2>
    <p>Store Name: <input v-model="newProductStoreName" type="text"></p>
    <p>Product Name: <input v-model="newProductName" type="text"></p>
    <p>Quantity: <input v-model="newProductQuantity" type="text"></p>
    <p>Price: <input v-model="newProductPrice" type="text"></p>
    <p>Deadline: <input v-model="newProductDeadline" type="text"></p>
    <p>Store Notes: <input v-model="newProductStoreNotes" type="text"></p>
    <p>Status: <input v-model="newProductStatus" type="text"></p>
    
    <button v-on:click="addProduct()">Add Product</button>
  
  

    <h2>---------------------------------------------------------------------------------------------</h2>
  <h2>
    <button v-on:click="changeDesign()">Customize Your Shopping List's Display!</button>
    </h2>

    <!-- <h4> List Style #1:</h4>

    <img :src="image1" width="900" alt="Casual Jacket"> -->

    <!-- <h4> List Style #2:</h4>

    <img :src="image2" width="900" alt="Casual Jacket">

    <h4> List Style #3:</h4>
    <h4> [Figure out styles list]</h4> -->

    

    <h2>---------------------------------------------------------------------------------------------</h2>
    
   
    <h2>{{ message }}</h2>

    

    <div v-for="product in products">
      <h2><button>Complete</button> Store Name: {{ product.store_name }}</h2>
      <h2><button>Complete</button> Product Name: {{ product.product_name }}</h2> 
      <h2><button>Complete</button> Quantity: {{ product.quantity }}</h2>
      <h2>Price: {{ product.price }}</h2>
      <h2>Deadline: {{ product.deadline }}</h2>
      <h2>Store Notes: {{ product.store_notes }}</h2>
      <h2>Status: {{ product.status }}</h2>
       <h1>
        <button v-on:click="showInfo(product)">EDIT</button>
      </h1>
        
      <h2>---------------------------------------------------------------------------------------------</h2>
     
    </div>

    <dialog id="product-details">
      <form method="dialog">
        <h1>Product info</h1>
        <p>Store Name: <input type="text" v-model="currentProduct.store_name" /></p>
        <p>Product Name: <input type="text" v-model="currentProduct.product_name" /></p>
        <p>Quantity: <input type="text" v-model="currentProduct.quantity" /></p>
        <p>Price: <input type="text" v-model="currentProduct.price" /></p>
        <p>Deadline: <input type="text" v-model="currentProduct.deadline" /></p>
        <p>Store Notes: <input type="text" v-model="currentProduct.store_notes" /></p>
        <p>Status: <input type="text" v-model="currentProduct.status" /></p>
        
        <button v-on:click="updateProduct(currentProduct)">Update</button>

        <button v-on:click="destroyProduct(currentProduct)">Delete Product</button>

        <button>Close</button>


      </form>
    </dialog>


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
      newProductStoreName: "",
      newProductName: "",
      newProductQuantity: "",
      newProductPrice: "",
      newProductDeadline: "",
      newProductStoreNotes: "",
      newProductStatus: "",
      currentProduct: {},
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
      console.log("adding recipe...");
      console.log(this.newProductName);

      var params = {
        store_name: this.newProductStoreName,
        product_name: this.newProductName,
        quantity: this.newProductQuantity,
        price: this.newProductPrice,
        deadline: this.newProductDeadline,
        store_notes: this.newProductStoreNotes,
        status: this.newProductStatus,
      };

      axios.post("/api/products", params).then((response) => {
        console.log(response.data);
        this.products.push(response.data);
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
        status: product.status,
      };

      axios.patch("/api/products/" + product.id, params).then((response) => {
        console.log(response.data);
        this.currentProduct = {};
      });
    },
    destroyProduct: function (product) {
      console.log(product);
      // delete it in the backend (rails)
      axios.delete("/api/products/" + product.id).then((response) => {
        console.log(response.data);
        // delete in frontend
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);

        console.log(index);
      });
    },
  },
};

// new/create
// get user input
// keep track of it
// send that user input to rails
// get the response from rails
// take that response and show it to the user
</script>