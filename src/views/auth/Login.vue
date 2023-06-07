<template>
<div>
    <Header />
</div>
<section class="vh-100" style="background-color: #eee;">
    <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">

            <div class="col-md-9 col-lg-6 col-xl-5">
                <img src="../../../public/frontend/images/about-01.jpg" class="img" alt="Sample image">
            </div>
            <div class="col-md-6 col-lg-6 col-xl-4 offset-xl-1">
                <form @submit.prevent="Login">

                    <div class="form-outline mb-4">
                        <input type="email" id="email" class="form-control form-control-lg" placeholder="Enter your email" required v-model="user.email " />
                    </div>

                    <div class="form-outline mb-3">
                        <input type="password" id="password" class="form-control form-control-lg" placeholder="Enter password" required v-model="user.password" />
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="form-check mb-0">
                            <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                            <label class="form-check-label" for="form2Example3">
                                Remember me
                            </label>
                        </div>
                        <a href="/forgetPassword" class="text-body">Forgot password?</a>
                    </div>

                    <div class="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" class="button1">Login</button>
                        <br>

                        <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account ? <a href="http://localhost:8080/registre" class="link-danger"> Register </a></p>
                    </div>

                </form>
            </div>

        </div>
    </div>

</section>
<div>
    <Footer />
</div>
</template>

<script>
import Footer from "@/components/Footer.vue"
import Header from "@/components/Header.vue"
export default {
    components: {
        Footer,
        Header
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            },

        };
    },
    methods: {
        Login() {
            this.axios
                .post("http://localhost:8000/api/user/login", this.user)
                .then((response) => {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    localStorage.setItem("role", JSON.stringify(response.data.role));
                    window.localStorage.setItem("token", JSON.stringify(response.data.token));


                    if (response.data.role == "admin") {
                       // window.location.href = "";
                    this.$notify("You have been logged in!")

                    } else {
                    this.$notify("You have been logged in!")
                        window.location.href = "/profile";

                    }

                    /*console.log(response.data.token);
                    console.log(this.user);*/
                })
                .catch((err) => {
                        this.$notify("Invalid mail or password !")
                        this.errors = err.response.data;
                        console.log(this.errors);
                    }

                )
        }

    }

}
</script>

<style>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}

.img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    box-shadow: 0 0 2px 1px rgba(197, 201, 202, 0.5);

}

.button1 {
    font-size: 25px;
    /*border: 2px solid  #e7e7e7; color: black; ;*/
    background-color: #e7e7e7;
    color: black;
}
</style>
