<template>
<!-- Product -->
<div class="container">

    <div class="flex-w flex-sb-m p-b-52">
        <div class="flex-w flex-l-m filter-tope-group m-tb-10">
            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" @click="handleAllProductsClick">
                All Products
            </button>

        </div>

        <div class="flex-w flex-l-m filter-tope-group m-tb-10 " v-for="category in categs " :key="category.id">
            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" @click="getProductsByCategory(category.id)">
                {{ category.name }}
            </button>
        </div>

        <div class="flex-w flex-c-m m-tb-10">
            <!--   <div class="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                    <i class="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                    <i class="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                    Filter
                </div>-->

            <div class="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
                <i class="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                <i class="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                Search
            </div>
        </div>

        <div class="dis-none panel-search w-full p-t-10 p-b-15">
            <div class="bor8 dis-flex p-l-15">
                <button class="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                    <i class="zmdi zmdi-search"></i>
                </button>

                <input class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Search">
            </div>
        </div>

    </div>

</div>

<div class="container" v-if="showAllProducts ">
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

<div class="container" v-else>
    <div id="content" class="my-5">
        <div id="productByCategory">
            <div class="row mx-0">
                <div class="col-lg-4 col-md-6" v-for="product in productsByCategory" :key="product.id">
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
</div>
</template>

    
<script>
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
            categs: [],
            productsByCategory: [],
            showAllProducts: true,
            nextPage: null,
            numberOfProducts: 0,
            URL:"http://localhost:8000/api/productWithPaginate"
        };
    },
    computed: {
        currentUser() {
            return JSON.parse(localStorage.getItem("user"));
        },
    },
    mounted() {
        this.findNextProducts("http://localhost:8000/api/productWithPaginate");
        //    this.getAllproduct();
        this.getAllCateg();
        // this.getProductsByCategory(1);

    },
    created() {
        this.currentUserRole = JSON.parse(localStorage.getItem("role"));

    },

    methods: {

        /*  getAllproduct() {
                  try {
                         this.showAllProducts=true,
                      this.axios.get("http://localhost:8000/api/product")
                          .then((response) => {
                              //console.log(response.data)
                              //console.log(response.data.products);
                              this.products = response.data.products
                              //console.log(this.product)
                          })
                  } catch (error) {
                      console.error(error);
                  }

              },*/

        getAllCateg() {
            try {

                this.axios.get("http://localhost:8000/api/category")
                    .then((response) => {
                        // console.log(response.data)
                        //console.log(response.data.categoris);
                        this.categs = response.data.categoris;
                    })
            } catch (error) {
                console.error(error);
            }

        },

        getProductsByCategory(categoryId) {

            try {
                this.showAllProducts = false,

                    this.axios.get(`http://localhost:8000/api/category/productsByCategory/${categoryId}`)
                    .then((response) => {
                        //console.log(response.data)
                        console.log(response.data.product);
                        this.productsByCategory = response.data.product;

                        this.productsByCategory.forEach((product) => {
                            // console.log(product.promo)
                            const productId = product.id;
                            // Find matching promo for the current product
                            const matchingPromo = this.productsByCategory.find(
                                (p) => p.id === productId && p.promo && p.promo.length > 0
                            );
                            if (matchingPromo) {
                                //console.log(matchingPromo.promo)
                                //   console.dir(matchingPromo.promo[0].discount)
                                // Update product object with promo information
                                product.promo = matchingPromo.promo;
                            }
                        });
                    })
            } catch (error) {
                console.error(error);
            }

        },

        findNextProducts(next_page_url) {
            this.showAllProducts = true,
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
            // if (this.currentUser && (this.currentUserRole="customer")) {
            if (this.currentUserRole == "customer") {
                window.location.href = "http://localhost:8080/panier";
            } else {
                this.$notify("You need to login first !")
            }

        },
       handleAllProductsClick() {
            this.showAllProducts=!this.showAllProducts;
        },
    }
}
</script>

    
<style>
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

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif
}

#header {
    width: 100%;
    height: 60px;
    box-shadow: 5px 5px 15px #e8e8e8
}

.col-lg-4,
.col-md-6 {
    padding-right: 0
}

button.btn.btn-hide {
    height: inherit;
    background-color: #ddd2cc;
    color: #fff;
    font-size: 0.82rem;
    padding-left: 40px;
    padding-right: 40px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px
}

.btn:focus {
    box-shadow: none
}

.box-label .btn {
    background-color: #fff;
    padding: 0;
    font-size: 0.8rem
}

.navbar {
    display: inline-flex
}

.pagination .page-item .page-link {
    color: #333;
    border: none;
    width: 40px;
    text-align: center
}

.pagination .page-item.active .page-link {
    background-color: #fff;
    border: 1px solid #333
}

#select2 {
    border: 1px solid #777;
    color: #999
}

#pro {
    border: none;
    color: #333;
    font-weight: 700;
    padding-left: 0px;
    width: initial
}

#filterbar {
    width: 30%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;
    float: left
}

#filterbar input[type="radio"] {
    visibility: hidden
}

#filterbar input[type='radio']:checked {
    background-color: #16c79a;
    border: none
}

#filterbar .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 115px
}

#filterbar .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#filterbar .btn-success:not(:disabled):not(.disabled).active,
#filterbar .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

label {
    cursor: pointer
}

.tick {
    display: block;
    position: relative;
    padding-left: 23px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0
}

.tick input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0
}

.check {
    position: absolute;
    top: 1px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px
}

.tick:hover input~.check {
    background-color: #f3f3f3
}

.tick input:checked~.check {
    background-color: #ffffff
}

.check:after {
    content: "";
    position: absolute;
    display: none
}

.tick input:checked~.check:after {
    display: block;
    transform: rotate(45deg) scale(1)
}

.tick .check:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid rgb(0, 0, 0);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) scale(2)
}

.box {
    padding: 10px
}

.box-label {
    color: #11698e;
    font-size: 0.9rem;
    font-weight: 800
}

#inner-box,
#inner-box2 {
    height: 150px;
    overflow-y: scroll
}

#inner-box2 {
    height: 132px
}

#inner-box::-webkit-scrollbar,
#inner-box2::-webkit-scrollbar {
    width: 6px
}

#inner-box::-webkit-scrollbar-track,
#inner-box2::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 2px
}

#inner-box::-webkit-scrollbar-thumb,
#inner-box2::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 2px
}

#price {
    height: 45px
}

#size input[type="checkbox"] {
    visibility: hidden
}

#size input[type='checkbox']:checked {
    background-color: #16c79a;
    border: none
}

#size .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 40px;
    font-size: 0.8rem;
    border-radius: 0
}

#size .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#size .btn-success:not(:disabled):not(.disabled).active,
#size .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

#size label {
    margin: 10px;
    margin-left: 0px
}

.card {
    padding: 10px;
    cursor: pointer;
    transition: .3s all ease-in-out;
    height: 350px
}

.card:hover {
    transform: scale(1.02)
}

.card .product-name {
    font-weight: 600
}

.card-body {
    padding-bottom: 0
}

.card .text-muted {
    font-size: 0.82rem
}

.card-img img {
    padding-top: 10px;
    width: inherit;
    height: 180px;
    object-fit: contain;
    display: block
}

.card-body .btn-group .btn {
    padding: 0;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 50%;
    position: relative
}

.card-body .btn-group>.btn-group:not(:last-child)>.btn,
.card-body .btn-group>.btn:not(:last-child):not(.dropdown-toggle) {
    border-radius: 50%;
    transition: ease-in all .4s
}

.card-body input[type="radio"] {
    visibility: hidden
}

.card-body .btn:not(:disabled):not(.disabled).active::after,
.card-body .btn:not(:disabled):not(.disabled):active::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 4px;
    left: 4.2px;
    background-color: #fff;
    position: absolute;
    transition: ease-in all .4s
}
</style>
