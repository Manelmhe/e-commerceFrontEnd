<template>
<Header />
<div class="container-md titre-panier">
    <h4>My Shopping Basket</h4>
</div>
<div>
    <h5>Total : {{ get_sub_total }}</h5>
</div>
<div class="container-md">
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Produit</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(cart, index) in get_carts" :key="cart.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                        <img v-if="cart.prodCart.picture" :src="'http://127.0.0.1:8000/product_pictures/' + cart.prodCart.picture" alt="img" class="img-prod">
                    </td>
                    <td>{{ cart.prodCart.ref }}</td>
                    <td>{{ cart.priceProd }} DTN</td>
                    <td>
                        <input type="number" v-model="cart.qty" @change="calculate_totalPriceProd(cart)" />
                    </td>

                    <td>
                        {{ cart.priceProd }}
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" @click="remove_product_from_carts(cart)">
                            Remove
                        </button>
                    </td>
                  

                </tr>
            </tbody>
        </table>
    </div>
</div>
<div>
    <Footer />
</div>
</template>

  
<script>
import Header from "@/components/Header.vue"
import Footer from '@/components/Footer.vue'

import {
    mapGetters,
    mapMutations
} from "vuex"
export default {
    data() {
        return {
            totalPriceProd: "",
        };
    },
    computed: {
        ...mapGetters(["get_carts", "get_sub_total"]),
    },
 
    methods: {
        ...mapMutations(["remove_from_carts", "calculate_cart_mid_total"]),
        remove_product_from_carts: function (cart) {
            this.remove_from_carts(cart);
        },
        calculate_totalPriceProd: function (cart) {
            this.calculate_cart_mid_total(cart);
        },
     
    },
    components: {
        Header,
        Footer
    },
};
</script>
  
<style>
.titre-panier {
    margin-top: 2%;
    margin-bottom: 3%;
}

.img-prod {
    width: 50px;
}
</style>
