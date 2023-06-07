<template>
    <Header/>
<div class="container">
    <div class="row flex-lg-nowrap">
        <div class="col">
            <div class="row">
                <div class="col mb-3">
                    <div class="card h-100">
                        <div class="card-body">

                            <div class="tab-pane active">
                                <form class="form " enctype="multipart/form-data" @submit.prevent="editProduct">
                                    <div class="row">
                                        <div class="col">
                                            <div class="row">

                                                <div class="row">
                                                    <div class="col-12 col-sm-auto mb-3">
                                                        <div class="mx-auto">

                                                            <img class="img-account-profile" ref="displayImageProduct" alt="">
                                                            <input type="file" class="form-control" name="picture" id="picture" v-on:change="createAttachImageP()" ref="createImageProduct">

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Product Ref</label>
                                                        <input type="text" class="form-control " placeholder="Product ref" name="ref" id="ref" v-model="product.ref">

                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Product price</label>
                                                        <input type="text" class="form-control" placeholder="Product price" name="price" id="price" v-model="product.price">

                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col d-flex justify-content-end">
                                                        <button class="btn btn-primary" type="submit">Edit Product</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
<Footer/>
</template>

    
<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
export default {
    data() {
        return {
            product: {
                ref: '',
                price: '',
                picture: '',
                category_id: ''
            },
            productId: null,
            categoryId: null

        }
    },
    components:{
       Header,
       Footer
    },
    created() {
        this.productId = this.$route.query.id
       // console.log(this.productId);
        this.getById(this.productId);
      this.categoryId = JSON.parse(localStorage.getItem("categId"));

    },
    methods: {

        getById(id) {
            try {
                this.axios.get(`http://localhost:8000/api/product/getById/${id}`)
                    .then((response) => {
                       // console.log("product:", response.data)
                       this.product = response.data.product
                    })

            } catch (error) {
                console.error(error);
            }
        },

        createAttachImageP() {

            this.product.picture = this.$refs.createImageProduct.files[0];
            let reader = new FileReader();
            reader.addEventListener(
                "load",
                function () {
                    this.$refs.displayImageProduct.src = reader.result;
                }.bind(this),
                false
            );
            reader.readAsDataURL(this.product.picture);
        },
        editProduct() {
           const id = this.productId;
            try {
                this.product.category_id = this.categoryId
                const dataform = new FormData();
                dataform.append("ref", this.product.ref);
                dataform.append("price", this.product.price);
                dataform.append("picture", this.product.picture);
                dataform.append("category_id", this.product.category_id);
                this.axios.post(`http://localhost:8000/api/product/update/${id}`, dataform)
                    .then((response) => {
                        //console.log(response.data)
                        this.$notify("product updated ")
                        this.$router.push("/categDetails");
                    localStorage.removeItem("productId");

                    })

            } catch (error) {
                console.error(error);
            }

        },
    }

}
</script>

    
<style>

    </style>
