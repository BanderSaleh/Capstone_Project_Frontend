<template>




  <div class="home">
    
    
    
    <h1>My Statistics!</h1>
    
    <h2>{{ message }}</h2>
   
    

    
    <div v-for="complete in completed">
      <h2>UserID: {{ complete.UserID }}</h2>
      <h2><button>EDIT</button><button>Delete</button>Store Name: {{ complete.store_name }}</h2>
      <h2><button>Complete</button><button>EDIT</button><button>Delete</button>Product Name: {{ complete.product_name }}</h2> 
      <h2><button>Complete</button><button>EDIT</button>Quantity: {{ complete.quantity }}</h2>
      <h2>Store Notes: {{ complete.store_notes }}</h2>
      <h2>Timestamp: {{ complete.timestamp }}</h2>
      <h2>Store Notes Timestamp: {{ complete.store_notes_timestamp }}</h2>
      <h2>Price: {{ complete.price }}</h2>
      <h2>Deadline: {{ complete.deadline }}</h2>
      <h2>Status: {{ complete.status }}</h2>
      <h2> ---------------------------------------------------------------------------------------------</h2>
     
    </div>


    <h2>(Customizable Smart Graph Goes Here!)</h2>


  </div>



</template>

<style>
</style>

<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue2-filters/dist/vue2-filters.min.js"></script>



<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "My Completed Shopping List History:",
      completed: [],
    };
  },
  created: function () {
    this.indexCompleted();
  },
  methods: {
    indexCompleted: function () {
      console.log("completed index...");

      axios.get("/api/completed").then((response) => {
        console.log(response);
        this.completed = response.data;
      });
    },
    // addCompleted: function () {
    //   console.log("adding product...");
    //   console.log(this.newProductName);

    //   var params = {
    //     store_name: this.newStoreName,
    //     product_name: this.newProductName,
    //     quantity: this.quantity,
    //     price: this.price,
    //     deadline: this.deadline,
    //     newStoreNotesTimestamp: this.newStoreNotesTimestamp,
    //     status: this.status,
    //   };

    //   axios.post("/api/completed", params).then((response) => {
    //     console.log(response.data);
    //     this.completed.push(response.data);
    //   });
    // },
  },
};
</script>

