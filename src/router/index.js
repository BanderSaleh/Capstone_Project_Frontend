import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue';
import Welcome from "../views/Welcome.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  // {
  //   path: '/newitem',
  //   name: 'NewItem',
  //   component: () => import(/* webpackChunkName: "home" */ '../views/ProductsNew.vue')
  // },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/forgotpassword.vue"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "statistics" */ "../views/Statistics.vue"),
  },

  {
    path: "/account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "statistics" */ "../views/Account.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "statistics" */ "../views/Contact.vue"),
  },
  {
    path: "/faq",
    name: "Faq",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "statistics" */ "../views/Faq.vue"),
  },
  {
    path: "/terms",
    name: "Terms",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "statistics" */ "../views/terms.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "statistics" */ "../views/Privacy.vue"),
  },

  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  {
    path: "/portfolio",
    name: "BFAPortfolio",
    component: () =>
      import(
        /* webpackChunkName: "BFA Portfolio" */ "../views/BFAPortfolio.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
