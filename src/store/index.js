import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    carts: [],
    sub_total: 0,
    number:0,
  },

  getters: {
    get_carts: (state) => state.carts,
    get_sub_total: (state) => state.sub_total,
    get_sub_number: (state) => state.number, 
  },

  mutations: {

    set_carts: function (state, cart) {
      let temp_cart = state.carts.filter(
        (item) => item.prodCart.id != cart.prodCart.id
      );
      state.carts = temp_cart;
      state.carts.push(cart);
      this.commit("calculate_cart_total");
     this.commit("calculate_number");

    },
    calculate_cart_mid_total: function (state, cart) {

      cart.priceProd = cart.priceProd + cart.prodCart.price;
    },

    calculate_cart_total: function (state, cart) {
      state.sub_total = state.carts.reduce(
        (total, item) => (total += item.prodCart.price * item.qty),
        0
      );
    },

    calculate_number: function (state) {
      state.number = state.carts.length; // Set the number to the length of the carts array
    },

    calculate_number_add: function (state, cart) {
      state.number += 1;
    },

    calculate_number_remove: function (state, cart) {
      state.number -= 1;
    },
    remove_from_carts: function (state, cart) {
      let temp_cart = state.carts.filter(
        (item) => item.prodCart.id != cart.prodCart.id
      );
      state.carts = temp_cart;
      this.commit("calculate_cart_total");
     this.commit("calculate_number_remove");


    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
