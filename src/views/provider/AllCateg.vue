<template>
<Header />
<div class="container">
    <div class="flex-w flex-sb-m p-b-52">
        <div class="flex-w flex-l-m filter-tope-group m-tb-10">
            <button class="button2" @click="handleAddCateg">
                Add Category
            </button>
        </div>
    </div>
</div>
<div>
    <addCateg v-if="showAddCateg" @categ-added="handleAddCateg" />
</div>
<div class="container" v-if="!showAddCateg">
    <div id="content" class="my-5">
        <div>
            <div class="row mx-0">
                <div class="col-lg-4 col-md-6" v-for="categ in categs" :key="categ.id">
                    <div class="card d-flex flex-column align-items-center h-100">
                        <div class="product-name">{{ categ.name }}</div>
                        <div class="card-img">
                            <img v-if="categ.picture" :src="'http://127.0.0.1:8000/category_photo/' + categ.picture" alt="img" class="card-img-top">
                        </div>
                        <div class="card-body pt-5">
                            <div class="d-flex align-items-center price">
                                <div class="font-weight-bold">{{ categ.description }} </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between total font-weight-bold mt-4 button-container">
                            <button class="button2" style="  margin-right: 10px;" @click="categDetails(categ.id)">
                                edit
                            </button>
                            <button class="button2 ml-4" style="  margin-right: 10px;" @click="deleteCateg(categ.id)">
                                remove
                            </button>
                        </div>
                        <!--    <div class="card-body pt-5">
                            <router-link :to="{ name: 'categDetails', params: { id: categ.id } }" >
                           <button >
                            Edit Category
                           </button>

                             </router-link>

                        </div>-->

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<Footer />
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from '@/components/Footer.vue'
import addCateg from '@/components/provider/addCateg.vue'
export default {
    components: {
        Header,
        Footer,
        addCateg
    },
    data() {
        return {
            categs: [],
            showAddCateg: false

        };
    },
    mounted() {
        this.getAllCateg();
    },
    methods: {
        getAllCateg() {
            try {

                this.axios.get("http://localhost:8000/api/category")
                    .then((response) => {
                        //console.log(response.data.categoris)
                        this.categs = response.data.categoris;
                    })
            } catch (error) {
                console.error(error);
            }

        },
        categDetails(id) {
            try {
                window.location.href = `http://localhost:8080/categDetails`;
                // this.$router.push({ name: 'categDetails', params:{id :id} }); 
                localStorage.setItem('categId', JSON.stringify(id));

            } catch (error) {
                console.error(error);
            }
        },
        handleAddCateg() {
            this.showAddCateg =!this.showAddCateg ;
        },
        deleteCateg(id) {
            this.axios.delete(`http://localhost:8000/api/category/${id}`)
                .then(() => {
                    this.$notify("category deleted")
                    window.location.reload()
                })

        }
    }

}
</script>

<stye>

</stye>
