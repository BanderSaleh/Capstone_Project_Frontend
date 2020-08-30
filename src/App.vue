<template>
  <div id="app">
    <div id="nav">
      
      <span v-if="!isLoggedIn()"> <router-link to="/">Welcome</router-link> | </span>


      <span v-if="isLoggedIn()"> <router-link to="/home">My Shopping Lists</router-link> | </span>

      <!-- <span v-if="isLoggedIn()"> <router-link to="/newitem">New Shopping List Items</router-link> | </span> -->


      <span v-if="isLoggedIn()"> <router-link to="/statistics">My Statistics</router-link> | </span>

      <span v-if="isLoggedIn()"> <router-link to="/account">My Account</router-link> | </span>
      
      <span v-if="isLoggedIn()"> <router-link to="/logout">Logout</router-link> | </span>
      <span v-if="!isLoggedIn()"> <router-link to="/signup">Signup</router-link> | </span>
      <span v-if="!isLoggedIn()"> <router-link to="/login">Login</router-link> | </span>
      <router-link to="/BFAPortfolio">BFA Portfolio</router-link>
    </div>
    <router-view/>

    

    <router-link to="/about">[about]</router-link> |
    <router-link to="/contact">[contact]</router-link> |
    <router-link to="/faq">[faq]</router-link> |
    <router-link to="/terms">[terms]</router-link> |
    <router-link to="/privacy">[privacy]</router-link>

    <h4>a Bander Saleh production</h4>
    <h4>© 2020</h4>
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
export default {
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
  },
};
</script>