<template>

  
  <div class="Home">
  
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

    

     

    <!-- Create Section -->
    <hr>
    <h1>Create New Shopping List Item:</h1>
    <hr>
    <div>
      <p>Store Name: <input v-model="newProductStoreName" type="text"></p>
      <p>Product Name: <input v-model="newProductName" type="text"></p>
      <p>Quantity: <input v-model="newProductQuantity" type="text"></p>
      <p>Price: <input v-model="newProductPrice" type="text"></p>
      <p>Deadline: <input v-model="newProductDeadline" type="text"></p>
      <p>Notes: <input v-model="newProductStoreNotes" type="text"></p>
      <p>Picture (URL): <input v-model="newProductPicture" type="text"></p>
      
      <button v-on:click="addProduct()">Add Product</button>
  
      
    </div>


   
   

  
  

    <!-- <h2>---------------------------------------------------------------------------------------------</h2>
    <h2>
    <button v-on:click="changeDesign()">Customize Your Shopping List's Display!</button>
    </h2> -->

    <!-- <h4> List Style #1:</h4>

    <img :src="image1" width="900" alt="Casual Jacket"> -->

    <!-- <h4> List Style #2:</h4>

    <img :src="image2" width="900" alt="Casual Jacket">

    <h4> List Style #3:</h4>
    <h4> [Figure out styles list]</h4> -->

    <!-- <img :src="BG1" width="900" alt="Casual Jacket"> -->

    

    <!-- <h2>---------------------------------------------------------------------------------------------</h2> -->

    <hr>
    <!-- <button>Customize Shopping List (2 Total Designs)</button>
    <hr> -->
    <h1>{{ message }}</h1>
    
    
    <!-- Smart Table Structure -->
    <div id="app">
      <div :style="{ backgroundImage: `url('${wallpaper1}' )`  }">
        <SortedTable :values="products">
          <thead>
            <tr>
              <th scope="col" style="button: left; width: 10rem;">
                <SortLink name="button">Complete/Edit</SortLink>

                


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
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="store_notes">Notes</SortLink>
              </th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="product in sort.values" :key="product.id">
              <td><button v-on:click="showInfo(product)">COMPLETE/EDIT</button></td>
              
              <td>{{ product.id }}</td>
              <td>{{ product.store_name }}</td>
              <td>{{ product.product_name }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.deadline }}</td>
              <td>{{ product.status = "Carted" }}</td>
              <td>{{ product.picture}}</td>
              <td>{{ product.store_notes}}</td>
            </tr>
          </tbody>
        </SortedTable>
      </div>
    </div>

    
    



  

     
        
     

    
    <!-- Show Product Editable Section -->
    <dialog id="product-details">
      <form method="dialog">
        <h1>Product info</h1>
        <p>Store Name: <input type="text" v-model="currentProduct.store_name" /></p>
        <p>Product Name: <input type="text" v-model="currentProduct.product_name" /></p>
        <p>Quantity: <input type="text" v-model="currentProduct.quantity" /></p>
        <p>Price: <input type="text" v-model="currentProduct.price" /></p>
        <p>Deadline: <input type="text" v-model="currentProduct.deadline" /></p>
        <p>Notes: <input type="text" v-model="currentProduct.store_notes" /></p>
        <p>Status: "Carted"</p>
        <p>Picture (URL): <input type="text" v-model="currentProduct.picture" /></p>

        <button v-on:click="completedProduct(currentProduct)">Complete Product</button>

        
        <button v-on:click="updateProduct(currentProduct)">Update</button>

        <button v-on:click="destroyProduct(currentProduct)">Delete Product</button>

        <button>Close</button>

      </form>
    </dialog>

   


  </div>



</template>

<style>
/* #app {
  background-image: url("img/post-bg.jpg");
} */
</style>

<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue2-filters/dist/vue2-filters.min.js"></script>

<script>
new Vue({
  el: "#app",
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    //here do your request to get data from your API
    //e.i with axios => https://www.npmjs.com/package/axios
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => (this.info = response));
  },
});
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
      product: [],
      newProductStoreName: "",
      newProductName: "",
      newProductQuantity: "",
      newProductPrice: "",
      newProductDeadline: "",
      newProductStoreNotes: "",
      newProductStatus: "",
      newProductPicture: "",
      currentProduct: {},
      completed: {},
      newCompletedStoreName: "",
      newCompletedProductName: "",
      newCompletedQuantity: "",
      newCompletedPrice: "",
      newCompletedDeadline: "",
      newCompletedStoreNotes: "",
      newCompletedTimestamp: "",
      newCompletedStoreNotesTimestamp: "",
      newCompletedStatus: "",
      currentCompleted: {},
      image1: require("@/assets/images/shopping_list_1.jpg"),
      image2: require("@/assets/images/shopping_list_2.jpeg"),
      wallpaper1: require("@/assets/images/Wallpaper1.jpg"),
      wallpaper2: require("@/assets/images/Wallpaper2.png"),
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
    completedProduct: function (product) {
      console.log("completing product...");
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
      axios.post("/api/completed/create", params).then((response) => {
        console.log(response.data);
        completed.push(response.data);
      });
      axios.delete("/api/products/" + product.id).then((response) => {
        console.log(response.data);
        // delete in frontend
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);

        console.log(index);
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
  },
};

// new/create
// get user input
// keep track of it
// send that user input to rails
// get the response from rails
// take that response and show it to the user
</script>