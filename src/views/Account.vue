<template>
  <div class="about">

    <!-- Page Header -->
    <header class="masthead" style="background-image: url('img/post-bg.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="post-heading">
              <h1>My Account</h1>
              <span class="meta">
                <a href="#">Shopping List App,</a>
                Save Paper!</span>
            </div>
          </div>
        </div>
      </div>
  </header>

    <hr>
    <h1>My Name: {{ current_username }}</h1>
    <h1>My Email: {{ current_email }}</h1>
    <hr>
    <h2>My Password: <a class="nav-link" href="/forgotpassword">Reset password</a></h2>
    <hr>
    


   

  </div>



</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
      current_username: "Insert Name",
      current_email: "somename@email.com",
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .get("/api/sessions/1", params)
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
