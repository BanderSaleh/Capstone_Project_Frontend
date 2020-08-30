<template>

  
  <div class="Home">

    
    <h1>Shopping List App, save paper!</h1>

    <h4>Create New Shopping List Item:</h4>
    <div>
      <p>Store Name: <input v-model="newProductStoreName" type="text"></p>
      <p>Product Name: <input v-model="newProductName" type="text"></p>
      <p>Quantity: <input v-model="newProductQuantity" type="text"></p>
      <p>Price: <input v-model="newProductPrice" type="text"></p>
      <p>Deadline: <input v-model="newProductDeadline" type="text"></p>
      <p>Store Notes: <input v-model="newProductStoreNotes" type="text"></p>
      <p>Picture (URL): <input v-model="newProductPicture" type="text"></p>
      

  

      <h1> </h1>

      <!-- <p>Status: <input v-model="newProductStatus" type="text"></p> -->
    
      <button v-on:click="addProduct()">Add Product</button>

      
    </div>

    


   
  
  

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

    
    <div id="app">
      <SortedTable :values="products">
        <thead>
          <tr>
            <th scope="col" style="button: left; width: 10rem;">
              <SortLink name="button">Complete/Edit/Delete/Close</SortLink>
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
              <SortLink name="status">Status</SortLink>
            </th>
            <th scope="col" style="text-align: left; width: 10rem;">
              <SortLink name="picture">Picture</SortLink>
            </th>
          </tr>
        </thead>
        <tbody slot="body" slot-scope="sort">
          <tr v-for="product in sort.values" :key="product.id">
            <td><button v-on:click="showInfo(product)">COMPLETE/EDIT/DELETE/CLOSE</button></td>
            <td>{{ product.id }}</td>
            <td>{{ product.store_name }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.deadline }}</td>
            <td>{{ product.status = "Carted" }}</td>
            <td>{{ product.picture}}</td>
          </tr>
        </tbody>
      </SortedTable>
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
        <p>Status: "Carted"</p>
        <p>Picture (URL): <input type="text" v-model="currentProduct.picture" /></p>

        <button v-on:click="completedProduct()">Complete Product</button>

        
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
// import FileUpload from "./components/FileUpload.vue";

export default {
  name: "Home",
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
      newProductPicture: "",
      currentProduct: {},
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
      image1: require("@/assets/images/shopping_list_1.jpg"),
      image2: require("@/assets/images/shopping_list_2.jpeg"),
    };
  },
  created: function () {
    this.indexProducts();
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.newProductNametarget.files[0];
    },
    onUpload() {
      const fd = new FormData();
      fd.append("picture", this.selectedFile, this.selectedFile.name);
      axios.post("/api/products", params).then((response) => {
        console.log(response.data);
        this.products.push(response);
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
        store_name: this.newProductStoreName,
        product_name: this.newProductName,
        quantity: this.newProductQuantity,
        price: this.newProductPrice,
        deadline: this.newProductDeadline,
        store_notes: this.newProductStoreNotes,
        picture: this.newProductPicture,
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
        picture: product.picture,
        status: "Carted",
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
    completedProduct: function (product) {
      console.log(product);
      var params = {
        store_name: completed.store_name,
        product_name: completed.product_name,
        quantity: completed.quantity,
        price: completed.price,
        deadline: completed.deadline,
        store_notes: completed.store_notes,
        picture: completed.picture,
        status: "Completed",
      };

      axios.patch("/api/completed/" + completed.id, params).then((response) => {
        console.log(response.data);
        this.currentCompleted = {};
      });
      //
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