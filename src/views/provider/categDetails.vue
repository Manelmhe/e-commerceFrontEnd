<template>
<div>
    <Header />
</div>

<div class="container">
    <div class="row flex-lg-nowrap">

        <div class="col">
            <div class="row">
                <div class="col mb-3">
                    <div class="card h-100">
                        <div class="card-body">

                            <div class="tab-pane active">
                                <form class="form " enctype="multipart/form-data" v-if="categ">
                                    <div class="row">
                                        <div class="col">
                                            <div class="row">

                                                <div class="row">
                                                    <div class="col-12 col-sm-auto mb-3">
                                                        <div class="mx-auto">

                                                            <img class="img-account-profile" ref="displayImageCateg" alt="">
                                                            <input type="file" class="form-control" name="picture" id="picture" v-on:change="createAttachImage()" ref="createImageCateg">

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Category Name</label>
                                                        <input type="text" class="form-control " placeholder="Category name" name="name" id="name" v-model="categ.name">
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Category Description</label>
                                                        <input type="text" class="form-control" placeholder="Category description" name="description" id="description" v-model="categ.description">
                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col d-flex justify-content-end">
                                                        <button class="btn btn-primary" type="submit" @click="editCateg">Save Changes</button>
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


<div class="container">
    <div class="flex-w flex-sb-m p-b-52">
        <div class="flex-w flex-l-m filter-tope-group m-tb-10">
    
                <button class="button2"  @click="handleProductAdded">
                Add Product
            </button>
        
          
        </div>
    </div>
</div>

<!-- Add product-->
<addProduct v-if="showAddProduct"  @product-added="handleProductAdded"/>

<!-- getProduct By Categ-->
<div  v-if="!showAddProduct">
    <getPByCateg/>
</div>


<div>
    <Footer />
</div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from '@/components/Footer.vue'
import addProduct from '@/components/provider/addProduct.vue'
import getPByCateg from '@/components/provider/getPByCateg.vue'

export default {
    name: 'categDetails',
    components: {
        Header,
        Footer,
        addProduct,
        getPByCateg

    },
    data() {
        return {
            categ: {
                name: '',
                description: '',
                picture: ''
            },
           
            categoryId: null,
            showAddProduct : false

        }
    },
    mounted() {

        this.categoryId = JSON.parse(localStorage.getItem("categId"))
        //  console.log(this.categoryId)
        this.getCategById(this.categoryId);
    },
    methods: {
        getCategById(id) {
            try {
                this.axios.get(`http://localhost:8000/api/category/getById/${id}`)
                    .then((response) => {
                        //console.log("category:", response.data.category)
                        this.categ = response.data.category
                    })

            } catch (error) {
                console.error(error);
            }
        },
        createAttachImage() {

            this.categ.picture = this.$refs.createImageCateg.files[0];
            let reader = new FileReader();
            reader.addEventListener(
                "load",
                function () {
                    this.$refs.displayImageCateg.src = reader.result;
                }.bind(this),
                false
            );
            reader.readAsDataURL(this.categ.picture);
        },
      

        editCateg() {
            const id = this.categoryId;
            const dataform = new FormData();
            dataform.append("name", this.categ.name);
            dataform.append("description", this.categ.description);
            dataform.append("picture", this.categ.picture);

            this.axios
                .post(`http://localhost:8000/api/category/update/${id}`, dataform, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    // console.log(response.data)
                    this.$notify("Category updated!");
                })
                .catch((err) => {
                    this.errors = err.response.data;
                    this.$notify("Not updated!");
                });
        },

      

    handleProductAdded() {
      this.showAddProduct = !this.showAddProduct;
    },
     
    },

}
</script>

<style>


/*body{margin-top:20px;
    background-color:#f2f6fc;
    color:#69707a; 
    } */
.img-account-profile {
    height: 10rem;
}

.rounded-circle {
    border-radius: 50% !important;
}

.card {
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}

.card .card-header {
    font-weight: 500;
}

.card-header:first-child {
    border-radius: 0.35rem 0.35rem 0 0;
}

.card-header {
    padding: 1rem 1.35rem;
    margin-bottom: 0;
    background-color: rgba(33, 40, 50, 0.03);
    border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}

.form-control,
.dataTable-input {
    display: block;
    width: 100%;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1;
    color: #69707a;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #c5ccd6;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.35rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
