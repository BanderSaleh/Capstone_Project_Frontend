<template>
  <div class="products-new">
    <form v-on:submit.prevent="submit()">
      <h1>Make a new item</h1>
      <ul>
        
      </ul>
      <div class="form-group">
        <label>Store Name:</label> 
        <input type="text" class="form-control" v-model="store_name">
      </div>
      <div class="form-group">
        <label>Product Name:</label> 
        <input type="text" class="form-control" v-model="product_name">
      </div>
      <div class="form-group">
        <label>Quantity:</label>
        <input type="text" class="form-control" v-model="quantity">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="text" class="form-control" v-model="price">
      </div>
      <div class="form-group">
        <label>Deadline:</label>
        <input type="text" class="form-control" v-model="deadline">
      </div>
      <div class="form-group">
        <label>Store Notes:</label>
        <input type="text" class="form-control" v-model="store_notes">
      </div>
      <div class="form-group">
        <label>Status:</label>
        <input type="text" class="form-control" v-model="status">
      </div>

      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      store_name: "",
      product_name: "",
      quantity: "",
      price: "",
      deadline: "",
      store_notes: "",
      status: "",
    };
  },
  methods: {
    submit: function () {
      var params = {
        store_name: this.store_name,
        product_name: this.product_name,
        quantity: this.quantity,
        price: this.price,
        deadline: this.deadline,
        store_notes: this.store_notes,
        status: this.status,
      };

      console.log(params);

      axios
        .post("/api/products/create", params)
        .then((response) => {
          this.$router.push("/products");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>