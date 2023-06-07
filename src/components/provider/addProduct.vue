<template>
<div class="container">
    <div class="row flex-lg-nowrap">

        <div class="col">
            <div class="row">
                <div class="col mb-3">
                    <div class="card h-100">
                        <div class="card-body">

                            <div class="tab-pane active">
                                <form class="form " enctype="multipart/form-data" @submit.prevent="addProduct">
                                    <div class="row">
                                        <div class="col">
                                            <div class="row">

                                                <div class="row">
                                                    <div class="col-12 col-sm-auto mb-3">
                                                        <div class="mx-auto">

                                                            <img class="img-account-profile" ref="displayImageProduct" alt="">
                                                            <input type="file" class="form-control" name="picture" id="picture" v-on:change="createAttachImageP()" ref="createImageProduct">
                                                            <div class="error-message " v-for="(error, index) of v$.product.picture.$errors" :key="index">
                                                            <div class="error-msg">{{ error.$message }}</div>
                                                         </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Product Ref</label>
                                                        <input type="text" class="form-control " placeholder="Product ref" name="ref" id="ref" v-model="v$.product.ref.$model" >
                                                        <div class="error-message " v-for="(error, index) of v$.product.ref.$errors" :key="index">
                                                            <div class="error-msg">{{ error.$message }}</div>
                                                         </div>

                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Product price</label>
                                                        <input type="text" class="form-control" placeholder="Product price" name="price" id="price" v-model="v$.product.price.$model" >
                                                        <div class="error-message " v-for="(error, index) of v$.product.price.$errors" :key="index">
                                                            <div class="error-msg">{{ error.$message }}</div>
                                                         </div>
                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col d-flex justify-content-end">
                                                        <button class="btn btn-primary" type="submit">Add Product</button>
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
</template>

<script>
import {
    required,
} from '@vuelidate/validators';
import {
    useVuelidate
} from '@vuelidate/core';
export default {
    name: 'addProduct',
    setup() {
        const v$ = useVuelidate();
        return {
            v$
        };
    },
    data() {
        return {
            product: {
                ref: '',
                price: '',
                picture: '',
                category_id: ''
            },
            categoryId: null,
            errors: {},


        }
    },
    mounted() {

        this.categoryId = JSON.parse(localStorage.getItem("categId"))

    },
    validations() {

        return {
            product: {
                ref: {
                    required
                },
                price: {
                    required
                },
                picture: {
                    required
                },
                category_id: {
                    
                },

            }
        };
    },
    methods: {
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

        addProduct() {
            this.v$.$validate();
           if (!this.v$.$error) {
            try {
                this.product.category_id = this.categoryId;
                const dataform = new FormData();
                dataform.append("ref", this.product.ref);
                dataform.append("price", this.product.price);
                dataform.append("picture", this.product.picture);
                dataform.append("category_id", this.product.category_id);
                this.axios.post("http://localhost:8000/api/product", dataform)
                    .then((response) => {
                        console.log(response.data)
                        this.$notify("product added ")
                         //handle event
                        this.handleProductAdded();
                    })

            } catch (error) {
                console.error(error);
            }

        }else{
            this.$notify(this.v$.$error)
        }
    },
    handleProductAdded() {
      this.$emit('product-added'); // Emit the event 'product-added'
    },
}
}
</script>
<script>
</script>
