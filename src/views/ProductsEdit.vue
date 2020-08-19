<template>
  <div class="products-new">
    <form v-on:submit.prevent="submit()">
      <h1>Edit a currently existing product</h1>
      {{product}}
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Store Name:</label> 
        <input type="text" class="form-control" v-model="product.store_name">
      </div>
      <div class="form-group">
        <label>Product Name:</label> 
        <input type="text" class="form-control" v-model="product.product_name">
      </div>
      <div class="form-group">
        <label>Quantity:</label>
        <input type="text" class="form-control" v-model="product.quantity">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="text" class="form-control" v-model="product.price">
      </div>
      <div class="form-group">
        <label>Deadline:</label>
        <input type="text" class="form-control" v-model="product.deadline">
      </div>
      <div class="form-group">
        <label>Store Notes:</label>
        <input type="text" class="form-control" v-model="product.store_notes">
      </div>
      <div class="form-group">
        <label>Status:</label>
        <input type="text" class="form-control" v-model="product.status">
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
      product: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        store_name: this.product.store_name,
        product_name: this.product.product_name,
        quantity: this.product.quantity,
        price: this.product.price,
        deadline: this.product.deadline,
        store_notes: this.product.store_notes,
        status: this.product.status,
      };

      console.log(params);

      axios
        .patch(`/api/products/${this.$route.params.id}`, params)
        .then((response) => {
          this.$router.push("/products");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showProduct: function () {
      console.log("showing the product...");
      console.log(this.$route);
      // params[:id]
      axios.get(`/api/products/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.product = response.data;
      });
    },
  },
  created: function () {
    this.showProduct();
  },
};
</script>