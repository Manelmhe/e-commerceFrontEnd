<template>
<div class="container">
    <div class="row flex-lg-nowrap">

        <div class="col">
            <div class="row">
                <div class="col mb-3">
                    <div class="card h-100">
                        <div class="card-body">

                            <div class="tab-pane active">
                                <form class="form " enctype="multipart/form-data"  @submit.prevent="addCateg">
                                    <div class="row">
                                        <div class="col">
                                            <div class="row">

                                                <div class="row">
                                                    <div class="col-12 col-sm-auto mb-3">
                                                        <div class="mx-auto">

                                                            <img class="img-account-profile" ref="displayImageCateg" alt="">
                                                            <input type="file" class="form-control" name="picture" id="picture" v-on:change="createAttachImage()" ref="createImageCateg">
                                                            <div class="error-message " v-for="(error, index) of v$.categ.picture.$errors" :key="index">
                                                                <div class="error-msg">{{ error.$message }}</div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Category Name</label>
                                                        <input type="text" class="form-control " placeholder="Category name" name="name" id="name" v-model="v$.categ.name.$model">
                                                        <div class="error-message " v-for="(error, index) of v$.categ.name.$errors" :key="index">
                                                            <div class="error-msg">{{ error.$message }}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Category Description</label>
                                                        <input type="text" class="form-control" placeholder="Category description" name="description" id="description" v-model="v$.categ.description.$model">
                                                        <div class="error-message " v-for="(error, index) of v$.categ.description.$errors" :key="index">
                                                            <div class="error-msg">{{ error.$message }}</div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col d-flex justify-content-end">
                                                        <button class="btn btn-primary" type="submit" >Add Category</button>
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
            categ: {
                name: '',
                description: '',
                picture: ''
            },

        }
    },
    validations() {

        return {
            categ: {
                name: {
                    required
                },
                description: {
                    required
                },
                picture: {
                    required
                },

            }
        };
    },
    methods: {
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

        addCateg() {
            this.v$.$validate();
            if (!this.v$.$error) {
                const dataform = new FormData();
                dataform.append("name", this.categ.name);
                dataform.append("description", this.categ.description);
                dataform.append("picture", this.categ.picture);

                this.axios
                    .post(`http://localhost:8000/api/category`, dataform, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((response) => {
                      //  console.log(response.data)
                         this.handleCategAdded();
                         this.$notify("Category aded!");

                    })
                    .catch((err) => {
                        this.errors = err.response.data;
                        this.$notify("Not aded!");
                    });
            } else {
                this.$notify(this.v$.$error)
            }
        },
        handleCategAdded(){
            this.$emit('categ-added');
        }

    }
}
</script>

<style>
</style>
