<template>
<!--
<div class="content">
    <form @submit.prevent="Register" enctype="multipart/form-data">
        <div class="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <div class="input-group mb-3">
                <label for="userName"><b>UserName</b></label>
                <input type="text" placeholder="Enter your full name" name="userName" id="userName" required v-model="user.userName" />
            </div>
            <div class="input-group mb-3">
                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required v-model="user.email" />
                <span>{{ errors.email }} </span>
            </div>
            <div class="input-group mb-3">
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required v-model="user.password" />
            </div>
            <div class="input-group mb-3">
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required v-model="user.password_confirmation" />
            </div>
            <div class="input-group mb-3">
                <label for="role"><b>Your role</b></label>
                <div>
                    <select class="form-select form-select-sm" v-model="user.role" required>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>

            <button type="submit" class="registerbtn">Register</button>
        </div>

        <div class="container signin">
            <p>Already have an account? <a href="/login">Sign in</a>.</p>
        </div>
    </form>
</div>

-->
<div>
    <Header />
</div>
<section class="vh-200" style="background-color: #eee;">
    <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 ">
                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                            <form class="mx-1 mx-md-4" @submit.prevent="Register" enctype="multipart/form-data">

                                <div class="d-flex flex-row align-items-center mb-4">
                                    <div class="form-outline flex-fill mb-0" >
                                        <input type="text" class="form-control " placeholder="Enter your full name" name="userName" id="userName" required v-model="v$.user.userName.$model" />
                                        <div class="error-message " v-for="(error, index) of v$.user.userName.$errors" :key="index">
                                            {{ error.$message }}</div>
                                    </div>
                                </div>

                                <div class="d-flex flex-row align-items-center mb-4">
                                    <div class="form-outline flex-fill mb-0">
                                        <input type="email" class="form-control" placeholder="Enter Email" name="email" id="email" required v-model="v$.user.email.$model" />
                                        <div class="error-message "  v-for="(error, index) of v$.user.email.$errors" :key="index">
                                            <div class="error-msg">{{ error.$message }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-row align-items-center mb-4">
                                    <div class="form-outline flex-fill mb-0">
                                        <input type="password" class="form-control" placeholder="Enter Password" name="psw" id="psw" required v-model="v$.user.password.$model" />
                                        <div class="error-message "  v-for="(error, index) of v$.user.password.$errors" :key="index">
                                            <div class="error-msg">{{ error.$message }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-row align-items-center mb-4">
                                    <div class="form-outline flex-fill mb-0">
                                        <!--   <input @input="checkPassword()" type="confirm-password" class="form-control" placeholder="Repeat your password" name="psw" required v-model="user.password_confirmation" /> -->
                                        <input type="password" class="form-control" placeholder="Repeat your password" name="psw"  required v-model="v$.user.password_confirmation.$model" />
                                        <div class="error-message "  v-for="(error, index) of v$.user.password_confirmation.$errors" :key="index">
                                            {{ error.$message }}
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-row align-items-center mb-4">
                                    <div class="form-outline flex-fill mb-0">
                                        <input type="text" class="form-control" placeholder="Enter your number phone" name="phone" id="phone" v-model="user.phone" />

                                    </div>
                                </div>
                                <div class="mb-6">
                                    <select class="select" name="role" v-model="v$.user.role.$model" required @change="onChange($event)">
                                        <option value="customer">Customer</option>
                                        <option value="provider">Provider</option>
                                    </select>
                                    <div class="error-message "  v-for="(error, index) of v$.user.role.$errors" :key="index">
                                            <div class="error-msg">{{ error.$message }}</div>
                                        </div>
                                </div>
                                <br>

                                <!-- CustomerInput -->
                                <div id="customer_input" style="display: none;">

                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" class="form-control" placeholder="Enter your address" name="address" id="address" v-model="user.address" />
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" class="form-control" placeholder="Enter your cin" name="cin" id="cin" size="8" maxlength="8" v-model="user.cin" />
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <img ref="displayImageUser" class="imageUser">
                                    </div>
                                    <div class="form-outline flex-fill mb-0">
                                        <input type="file" class="form-control" name="picture" id="picture" v-on:change="createAttachImage()" ref="createImageUser" />
                                    </div>

                                </div>

                                <!-- EndCustomerInput-->

                                <!-- ProviderInput -->
                                <div id="provider_input" style="display: none;">

                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" class="form-control" placeholder="Enter your matricule" name="matricule" id="matricule" v-model="user.matricule" />
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" class="form-control" placeholder="Enter the name of your company" name="company" id="company" v-model="user.company" />
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" class="form-control" placeholder="service" name="service" id="service" v-model="user.service" />
                                        </div>
                                    </div>

                                </div>
                                <!-- EndProviderInput-->

                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <!--   <button :disabled="user.$invalid" type="submit" class="btn btn-primary btn-lg">Register</button>   -->
                                    <button type="submit"  class="btn btn-primary btn-lg">Register</button>

                                </div>

                            </form>

                        </div>
                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="Sample image">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<div>
    <Footer />
</div>
</template>

<script>
import {
    required,
    email,
    minLength,
    sameAs
} from '@vuelidate/validators';
import {
    useVuelidate
} from '@vuelidate/core';
import Footer from "@/components/Footer.vue"
import Header from "@/components/Header.vue"
export default {
    name: 'Registre',
    setup() {
        const v$ = useVuelidate();
        return {
            v$
        };
    },
    components: {
        Footer,
        Header
    },
    data() {
        return {
            user: {
                id: '',
                userName: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: '',
                phone: '',
                address: '',
                cin: '',
                matricule: '',
                company: '',
                service: '',
                picture: ''
            },
            errors: {},
            //invalidPasswords: false,
            //submitDisabled: false,

            //onchage Role without form 
            /* onChange(event) {
                  console.log(event.target.value)
              },*/
        };
    },
    validations() {
     
        return {
            user: {
                userName: {
                    required
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6)
                },
                password_confirmation: {
                    required,
                    sameAsPassword : sameAs(this.user.password)
                },
                role: {
                    required
                },
                phone: {},
                address: {},
                cin: {},
                matricule: {},
                company: {},
                service: {},
                picture: {}
            },
        };
    },
    methods: {
        onChange(event) {
            const customer_input = document.getElementById("customer_input");
            const provider_input = document.getElementById("provider_input");
            const e = event.target.value;

            if (e === "customer") {
                customer_input.style.display = "block";
                provider_input.style.display = "none";
            } else if (e === "provider") {
                provider_input.style.display = "block";
                customer_input.style.display = "none";
            }
        },
        createAttachImage() {
            this.user.picture = this.$refs.createImageUser.files[0];
            let reader = new FileReader();
            reader.addEventListener(
                "load",
                function () {
                    this.$refs.displayImageUser.src = reader.result;
                }.bind(this),
                false
            );
            reader.readAsDataURL(this.user.picture);
        },

        Register() {
            this.v$.$validate();
            if (!this.v$.$error) {
                if (this.user.role === "provider") {
                    this.axios.post("http://localhost:8000/api/user/registre", this.user)
                        .then(() => {
                            window.location.href = "http://localhost:8080/verifyEmail";
                           console.log(this.user)
                        })

                        .catch((err) => {
                            this.errors = err.response.data;
                        });
                } else {
                    const dataform = new FormData();
                    dataform.append("userName", this.user.userName);
                    dataform.append("email", this.user.email);
                    dataform.append("password", this.user.password);
                    dataform.append("password_confirmation", this.user.password_confirmation);
                    dataform.append("phone", this.user.phone);
                    dataform.append("role", this.user.role);
                    dataform.append("address", this.user.address);
                    dataform.append("cin", this.user.cin);
                    dataform.append("picture", this.user.picture);
                    this.axios.post("http://localhost:8000/api/user/registre", dataform)
                        .then(() => {
                            window.location.href = "http://localhost:8080/verifyEmail";
                            // console.log(this.user)
                        })
                        .catch((err) => {
                            this.errors = err.response.data;
                        });
                }

            }
        },

    }
    /*  confirmPassword() {
            if (this.password !== this.password_confirmation) {
                this.invalidPasswords = true
                this.submitDisabled = true
            } else {
                this.invalidPasswords = false
                this.submitDisabled = false
            }
        },
*/
}
</script>

<style>
.error-message {
    color: red;
}

.imageUser {
    height: 130px;
}
</style>
