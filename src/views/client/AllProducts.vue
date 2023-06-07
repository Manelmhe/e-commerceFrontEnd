<template>
<div>
    <Header />
</div>
<!-- 
<div class="container">

    <div class="flex-w flex-sb-m p-b-52">

        <div class="flex-w flex-c-m m-tb-10">
            <div class="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                <i class="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                <i class="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                Filter
            </div>
           <select v-model="idP" @change="applyFilter">
                <option value="">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">2</option>
            </select>

        </div>
    </div>

</div>
-->

<div class="container">
    <div id="content" class="my-5">
        <div id="products">
            <div class="row mx-0">
                <div class="col-lg-4 col-md-6" v-for="product in products" :key="product.id">
                    <div class="card d-flex flex-column align-items-center h-100">
                        <div class="product-name">{{ product.ref }}</div>
                        <div class="card-img">
                            <img v-if="product.picture" :src="'http://127.0.0.1:8000/product_pictures/' + product.picture" alt="img" class="card-img-top">
                        </div>
                        <div class="card-body pt-5">
                            <div class="d-flex align-items-center price">
                                <div class="font-weight-bold">{{ product.price }} DTN</div>
                            </div>
                            <div class="d-flex align-items-center price" v-if="product.promo[0]">
                                <div class="font-weight-bold">Discount of {{ product.promo[0].discount }} %</div>
                            </div>
                            <div class="d-flex align-items-center price" v-if="product.promo[0]">
                                <div class="font-weight-bold">From: {{ product.promo[0].dateBegin }} to: {{ product.promo[0].dateEnd }} </div>
                            </div>
                            <div class="d-flex align-items-center price" v-if="product.promo[0]">
                                <div class="font-weight-bold">Price with Discount: {{ product.promo[0].pricePromo }} DTN </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between total font-weight-bold mt-4">

                            <button class="button2" @click.prevent="add_to_cart(product)">
                                <img src="@/assets/panier.png" class="button-icon" alt="panier" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="nextPage" class="flex justify-center">
        <button class="btn btn-secondary" @click="findNextProducts(nextPage)">
            See The Next [ {{ numberOfProducts - products.length }}
            ] Product(s)
        </button>
    </div>
</div>
<div>
    <Footer/>
</div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import {
    mapMutations
} from "vuex";
export default {
    data() {
        return {
            product: {
                picture: '',
                ref: '',
                price: ''

            },

            products: [],
            nextPage: null,
            numberOfProducts: 0,
        };

    },
    components: {
        Header,
        Footer
    },
    computed: {
        currentUser() {
            return JSON.parse(localStorage.getItem("user"));
        },
    },
    created() {
        this.findNextProducts("http://localhost:8000/api/productWithPaginate");
    },

    methods: {
     
        findNextProducts(next_page_url) {
            this.axios.get(next_page_url).then((response) => {
                //   console.log(response.data.data)
                this.products = this.products.concat(response.data.data);
                this.nextPage = response.data.next_page_url;
                this.numberOfProducts = response.data.total;

                /* response.data.data.forEach((product) => {
                     console.log(product.promo);
                 }); */

                this.products.forEach((product) => {
                    const productId = product.id;
                    // Find matching promo for the current product
                    const matchingPromo = response.data.data.find(
                        (p) => p.id === productId && p.promo && p.promo.length > 0
                    );
                    if (matchingPromo) {
                        //console.log(matchingPromo.promo)
                        //   console.dir(matchingPromo.promo[0].discount)
                        // Update product object with promo information
                        product.promo = matchingPromo.promo;
                    }
                });

            });
        },
        ...mapMutations(["set_carts"]),
        add_to_cart: function (product) {
            let cart = {
                prodCart: product,
                qty: 1,
                priceProd: product.price,
                //  refProd: product.ref,
                // imageProd: product.picture
            };
            // console.log(cart)
            this.set_carts(cart);
            if (this.currentUser) {
                window.location.href = "http://localhost:8080/panier";
            }else{
                this.$notify("You need to login first !")
            }
            
        },
    }
}
</script>

<style>
.button2:hover {
    font-size: 24px;
    border: 2px solid #e7e7e7;
    border-radius: 8px;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    color: #050404;

}

.button-icon {
    width: 40;
    height: 40;
    margin-right: 5px;
}

.filter-tope-group {
    display: flex;
    gap: 10px;
    /* Adjust the gap value as needed */
}

.card-img-top {
    width: 150px;
    height: 150px;
    margin: auto;
}

</style>
