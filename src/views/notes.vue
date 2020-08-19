// deleted from home.vue

addProduct: function() {
      console.log('adding product...');
      console.log(this.newProductName);

      var params = {
        store_name: this.newStoreName,
        product_name: this.newProductName,
        quantity: this.quantity,
        price: this.price,
        deadline: this.deadline,
        newStoreNotesTimestamp: this.newStoreNotesTimestamp,
        status: this.status
      }

      axios.post('/api/products', params).then(response => {
        console.log(response.data);
        this.products.push(response.data);
    })
  },
  showInfo: function(product) {
      console.log(product);
      this.currentProduct = product;
      document.querySelector('#recipe-details').showModal();
};
updateProduct: function(product) {
      console.log(product);

      var params = {
        store_name: product.store_name,
        product_name: product.product_name,
        quantity: product.quantity,
        price: product.price,
        deadline: product.deadline,
        store_notes_timestamp: product.store_notes_timestamp,
        status: product.status
      }

      axios.patch('api/products/' + product.id, params).then(response => {
        console.log(response.data);
        this.currentProduct = response.data;
      })
},
destroyProduct: function(product) {
      console.log(product);
      // delete it in the backend (rails)
      axios.delete('/api/product/' + product.id).then(response => {
        console.log(response.data);
        // delete in frontend 
        var index = this.products.indexOf(product);

        this.products.splice(index, 1);
        
        console.log(index);
      })

    }
  }
};
</script>
