<template>
  <div class="login">

    <!-- Page Header -->
    <header class="masthead" style="background-image: url('img/post-bg.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="post-heading">
              <h1>Login</h1>
              <span class="meta">To your
                <a href="#">"Shopping List App, Save Paper!"</a>
                Account</span>
            </div>
          </div>
        </div>
      </div>
    </header>

  
    <form v-on:submit.prevent="submit()">
      <div class="col-lg-8 col-md-10 mx-auto">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </div>
    </form>
    <hr>
    <p><a class="nav-link" href="/forgotpassword">Forgot password?</a></p>
    <hr>
  </div>
  

  
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: response.data.jwt.email,
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
