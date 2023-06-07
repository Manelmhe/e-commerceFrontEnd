<template>
<div class="container">
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
                        <div class="d-flex justify-content-between total font-weight-bold mt-4 button-container">
                            <button class="button2" style="  margin-right: 10px;" @click.prevent="update(product.id)">
                                edit
                            </button>
                            <button class="button2 ml-4" style="  margin-right: 10px;" @click.prevent="deleteProduct(product.id)">
                                remove
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
export default {
    data() {
        return {
            productsByCategory: [],
            categoryId: null
        }
    },
    created() {
        this.categoryId = JSON.parse(localStorage.getItem("categId"))
        this.getProductsByCategory(this.categoryId)

    },
    methods: {
        getProductsByCategory(id) {

            try {

                this.axios.get(`http://localhost:8000/api/category/productsByCategory/${id}`)
                    .then((response) => {
                        // console.log(response.data.product);
                        this.productsByCategory = response.data.product;
                        this.productsByCategory.forEach((product) => {
                            const productId = product.id;
                            const matchingPromo = this.productsByCategory.find(
                                (p) => p.id === productId && p.promo && p.promo.length > 0
                            );
                            if (matchingPromo) {

                                product.promo = matchingPromo.promo;
                            }
                        });
                    })
            } catch (error) {
                console.error(error);
            }

        },

        deleteProduct(id) {
            this.axios.delete(`http://localhost:8000/api/product/${id}`)
                .then(() => {
                    this.$notify("Product deleted")
                    window.location.reload()
                })

        },

        update(id) {
            try {
                //  window.location.href = `http://localhost:8080/editProduct`;
                this.$router.push({
                    path: '/editProduct',
                    query: {
                        id: id
                    }
                });

            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style>

</style>
