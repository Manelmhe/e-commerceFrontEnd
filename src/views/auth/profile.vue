<template>
<div>
    <Header />
</div>
<!-- <div class="container mt-4" >
    <div class="row">
        <div class="col-lg-3 my-lg-0 my-md-1">
            <div id="sidebar" class="bg-purple">
                <ul>
                    <li class="active">
                        <a href="#" class="text-decoration-none d-flex align-items-start">
                            <div class="fas fa-box-open pt-2 me-3"></div>
                            <div class="d-flex flex-column">
                                <div class="link">My Profile</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="http://localhost:8080/account" class="text-decoration-none d-flex align-items-start">
                            <div class="fas fa-box pt-2 me-3"></div>
                            <div class="d-flex flex-column">
                                <div class="link">My Account</div>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
        <div class="col-lg-9 my-lg-0 my-1">
            <div id="main-content" class="bg-white border">
                <section >
                    <div class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #eee;">

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="card mb-4">
                                    <div class="card-body text-center">
                                        <img v-if="profile.picture" :src="'http://127.0.0.1:8000/user_photo/' + profile.picture" alt="avatar" class="rounded-circle img-fluid" style="width: 150px" />
                                        <h5 class="my-3">{{ profile.userName }}</h5>

                                             <div class="d-flex justify-content-center mb-2">
                                            <button type="button" class="btn btn-primary">Modify</button>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div class="col-lg-8">
                                <div class="card mb-4 ">
                                    <div class="card-body">
                                        <div class="row" >
                                            <div class="col-sm-3 ">
                                                <p class="text-muted mb-0">Role</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{{ profile.role}}</p>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="text-muted mb-0">Email</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{{ profile.email }}</p>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="text-muted mb-0">CIN</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{{ profile.cin }}</p>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="text-muted mb-0">Phone</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{{ profile.phone }}</p>
                                            </div>
                                        </div>
                                        <hr>

                                        <div class="row">
                                            <div class="col-sm-3 ">
                                                <p class="text-muted mb-0">Address</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-9">{{ profile.address}}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

</div>-->

<section style="background-color: #eee;">
    <div class="container py-5">

        <div class="row">
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <img v-if="profile.picture" :src="'http://127.0.0.1:8000/user_photo/' + profile.picture" alt="avatar" class="rounded-circle img-fluid" style="width: 150px" />

                        <h5 class="my-3">{{ profile.userName }}</h5>
                        <p class="text-muted mb-1">{{ profile.role }}</p>
                        <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
                        <div class="d-flex justify-content-center mb-2">
                            <a href="/editProfile"> 
                                <button type="button" class="btn btn-outline-primary ms-1">Edit Profie</button>
                            </a> 
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Email</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ profile.email }}</p>
                            </div>
                        </div>
                        <hr v-if="profile.phone">
                        <div class="row" v-if="profile.phone">
                            <div class="col-sm-3">
                                <p class="mb-0">Phone</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">(+216){{ profile.phone }}</p>
                            </div>
                        </div>
                        <hr v-if="profile.martricule">
                        <div class="row" v-if="profile.martricule">
                            <div class="col-sm-3">
                                <p class="mb-0">Matricule</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ profile.matricule }}</p>
                            </div>
                        </div>
                        <hr v-if="profile.company">
                        <div class="row" v-if="profile.company">
                            <div class="col-sm-3">
                                <p class="mb-0">Company</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ profile.company }}</p>
                            </div>
                        </div>
                        <hr v-if="profile.service">
                        <div class="row" v-if="profile.service">
                            <div class="col-sm-3">
                                <p class="mb-0">Service</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ profile.service }}</p>
                            </div>
                        </div>
                        <hr v-if="profile.cin">
                        <div class="row" v-if="profile.cin">
                            <div class="col-sm-3">
                                <p class="mb-0">CIN</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ profile.cin }}</p>
                            </div>
                        </div>
                        <hr v-if="profile.address">
                        <div class="row" v-if="profile.address">
                            <div class="col-sm-3">
                                <p class="mb-0">Address</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ profile.address }}</p>
                            </div>
                        </div>
                        <hr>

                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
<div>
    <Footer/>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            profile: {
                picture: '',
                userName: '',
                email: '',
                address: '',
                cin: '',
                martricule: '',
                service: '',
                company: '',
                phone: ''
            },
        };
    },

    created() {
        const token = JSON.parse(localStorage.getItem("token"));
        const accessToken = token.access_token;
        // console.log(accessToken)
        this.axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

        this.profile = JSON.parse(localStorage.getItem("user"));
        console.log(this.profile);
    },
    methods: {
        logout() {
            this.axios
                .post("http://localhost:8000/api/user/logout", this.user)
                .then((response) => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    localStorage.clear();
                    window.location.href = "/";
                })
                .catch((err) => {
                        this.errors = err.response.data;
                        console.log(this.errors);
                    }

                )
        }
    }
}
</script>

<style>
.button2:hover {
    font-size: 20px;
    border: 2px solid #e7e7e7;
    color: black;
    border-radius: 8px;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

/* Backgrounds */
.bg-purple {
    background-color: #c9ca9f;
}

.bg-light {
    background-color: #f0ecec !important;
}

/* Media Queries */
</style>
