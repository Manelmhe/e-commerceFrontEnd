import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Registre from '../views/auth/Registre.vue'
import verifyEmail from "../views/auth/verifyEmail.vue";
import Login from "../views/auth/Login.vue"
import profile from "../views/auth/profile.vue"
import forgetPassword from "../views/auth/forgetPassword.vue"
import resetPassword from "../views/auth/resetPassword.vue"
import editProfile from "../views/auth/editProfile.vue"
import panier from "../views/auth/panier.vue"
import AllProducts from "../views/client/AllProducts.vue"
import AllCateg from "../views/provider/AllCateg.vue"
import categDetails from "../views/provider/categDetails.vue"
import editProduct from "../views/provider/editProduct.vue"
import AllProductsP from "../views/provider/AllProductsP"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registre',
    name: 'Registre',
    component: Registre
  },
  {
    path: "/verifyEmail",
    name: "verifyEmail",
    component: verifyEmail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: forgetPassword,
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: resetPassword,
  },
  {
    path: "/editProfile",
    name: "editProfile",
    component: editProfile,
  },
  {
    path: "/panier",
    name: "panier",
    component: panier,
  },
  {
    path: "/AllProducts",
    name: "AllProducts",
    component: AllProducts,
  }, {
    path: "/AllCateg",
    name: "AllCateg",
    component: AllCateg,
  },  
  {
    path: "/categDetails",
    name: "categDetails",
    component: categDetails,
  },
  {
    path: "/editProduct",
    name: "editProduct",
    component: editProduct,
    props:true
  },
  {
    path: "/AllProductsP",
    name: "AllProductsP",
    component: AllProductsP,
  },


 
  
  
 
 
 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
