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
                                <form class="form" @submit.prevent="editProfile" enctype="multipart/form-data">
                                    <div class="row">
                                        <div class="col">
                                            <div class="row">

                                                <div class="row" v-if="this.currentUserRole === 'customer'">
                                                    <div class="col-12 col-sm-auto mb-3">
                                                        <div class="mx-auto">

                                                            <img class="img-account-profile" ref="displayImageUser" alt="">
                                                            <input type="file" class="form-control" name="picture" id="picture" v-on:change="createAttachImage()" ref="createImageUser">

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>user Name</label>
                                                        <input type="text" class="form-control " placeholder="Enter your full name" name="userName" id="userName" v-model="user.userName">
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Email</label>
                                                        <input class="form-control" id="email" type="email" placeholder="Enter your email address" name="email" v-model="v$.user.email.$model">
                                                        <div class="error-message " v-for="(error, index) of v$.user.email.$errors" :key="index">
                                                            <div class="error-msg">{{ error.$message }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Phone</label>
                                                        <input type="text" class="form-control" id="phone" placeholder="Enter your email phone" name="phone" v-model="user.phone">
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="row" v-if="this.currentUserRole ==='customer'">

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>CIN</label>
                                                        <input type="text" class="form-control " placeholder="Enter your cin" name="cin" id="cin" v-model="v$.user.cin.$model">
                                                        <div class="error-message " v-for="(error, index) of v$.user.cin.$errors" :key="index">
                                                            <div class="error-msg">{{ error.$message }}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Address</label>
                                                        <input type="text" class="form-control " placeholder="Enter your address" name="address" id="address" v-model="user.address">
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="row" v-if="this.currentUserRole ==='provider'">
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Company</label>
                                                        <input type="text" class="form-control " placeholder="Enter your Company" name="company" id="company" v-model="user.company">
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Service</label>
                                                        <input type="text" class="form-control " placeholder="Enter your service" name="service" id="service" v-model="user.service">
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Matricule</label>
                                                        <input type="text" class="form-control " placeholder="Enter your matircule" name="matircule" id="matricule" v-model="user.matricule">
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="row">
                                                <div class="col d-flex justify-content-end">
                                                    <button class="btn btn-primary" type="submit">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                                <div class="tab-content pt-3">
                                    <div class="tab-pane active">

                                        <!-- Change Password -->
                                        <form class="form" @submit.prevent="changePassword">
                                            <div class="row">
                                                <div class="col-12 col-sm-6 mb-3">
                                                    <div class="mb-2"><b>Change Password</b></div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="form-group">
                                                                <label>Current Password</label>
                                                                <input class="form-control" type="password" placeholder="Enter your current password" id="oldPassword" name="oldPassword"  v-model="v$.password.oldPassword.$model">
                                                                <div class="error-message " v-for="(error, index) of v$.password.oldPassword.$errors" :key="index">
                                                                    <div class="error-msg">{{ error.$message }}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="form-group">
                                                                <label>New Password</label>
                                                                <input class="form-control" type="password" placeholder="Enter your new password" id="newPassword" name="newPassword"  v-model="v$.password.newPassword.$model">
                                                                <div class="error-message " v-for="(error, index) of v$.password.newPassword.$errors" :key="index">
                                                                    <div class="error-msg">{{ error.$message }}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="form-group">
                                                                <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                                                                <input class="form-control" type="password" placeholder="confirm your new password" id="newPassword_confirmation" name="newPassword_confirmation"  v-model="v$.password.newPassword_confirmation.$model">
                                                                <div class="error-message " v-for="(error, index) of v$.password.newPassword_confirmation.$errors" :key="index">
                                                                    <div class="error-msg">{{ error.$message }}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col d-flex justify-content-end">
                                                        <button class="btn btn-primary" type="submit">Change Password</button>
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
    </div>
</div>
<div>
    <Footer />
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import {
    required,
    email,
    minLength,
    sameAs,
    maxLength
} from '@vuelidate/validators';
import {
    useVuelidate
} from '@vuelidate/core';
export default {
    name: 'editProfile',
    setup() {
        const v$ = useVuelidate();
        return {
            v$
        };
    },
    data() {
        return {
            user: {
                userName: '',
                email: '',
                phone: '',
                address: '',
                cin: '',
                matricule: '',
                company: '',
                service: '',
                picture: ''
            },
            password: {
                oldPassword: '',
                newPassword: '',
                newPassword_confirmation: ''
            },
           
            currentUserRole: null
        }
    },

    components: {
        Header,
        Footer
    },
    mounted() {
        /*  const userString = localStorage.getItem("user");
          console.log(userString) 
         if (userString) {
              const user = JSON.parse(userString);
              this.getUserData(user.id);
               console.log(user.id)
          }*/
 },
    created() {
        const token = JSON.parse(localStorage.getItem("token"));
        const accessToken = token.access_token;
        // console.log(accessToken)
        this.axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        
        this.currentUserRole = JSON.parse(localStorage.getItem("role"));
        //console.log(this.currentUserRole)

        this.getUser();
    },
    validations() {

        return {
            user: {
                userName: {},
                email: {
                    email
                },
                phone: {},
                address: {},
                cin: {
                    minLength: minLength(8),
                    maxLength: maxLength(8)
                },

                matricule: {},
                company: {},
                service: {},
                picture: {}
            },
            password: {
                oldPassword: {
                    required
                },
                newPassword: {
                    required,
                    minLength: minLength(6)
                },
                newPassword_confirmation: {
                    required,
                    sameAsPassword: sameAs(this.password.newPassword)
                }
            }
        };
    },
    methods: {

        /*  getUserData(id) {
              this.axios.get(`http://localhost:8000/api/user/getById/${id}`)
                  .then(response => {
                      console.log(response.data);
                      this.user = response.data.User;
                      //   console.log(this.user)
                  })
                  .catch(error => {
                      console.log(error);
                  });
          },*/

        getUser() {
            this.axios.get("http://localhost:8000/api/user/getUser")
                .then(response => {
                    console.log(response.data);
                    this.user = response.data.user;
                    //console.log(this.user)
                }).catch(error => {
                    console.log(error);
                });
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

        editProfile() {

            this.v$.user.$validate();
            // console.log(this.v$.$error); 
            if (!this.v$.user.$error) {
                console.log(localStorage.getItem("role"));
                if (this.currentUserRole = "provider") {
                    this.axios.post("http://localhost:8000/api/user/editProfile", this.user, )
                        .then(() => {
                            window.location.reload();
                            this.$notify("updated succefflly")
                            //console.log(this.user)
                        })
                        .catch((err) => {
                            this.errors = err.response.data;
                            this.$notify("Not updated !")

                        });
                } else {
                    const dataform = new FormData();
                    dataform.append("userName", this.user.userName);
                    dataform.append("email", this.user.email);
                    dataform.append("phone", this.user.phone);
                    dataform.append("address", this.user.address);
                    dataform.append("cin", this.user.cin);
                    dataform.append("picture", this.user.picture);
                    //  console.log("Before axios post inside else block");
                    this.axios.post("http://localhost:8000/api/user/editProfile", dataform, {
                            headers: {
                                'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                            }
                        })
                        .then((response) => {
                            window.location.reload();
                            this.$notify("updated succefflly");
                            localStorage.setItem("user", JSON.stringify(response.data.data));
                            // console.log("inside .then block");
                            // console.log(response.data.data)
                        })
                        .catch((err) => {
                            //   console.log("inside .catch block");

                            this.errors = err.response.data;
                            this.$notify("Not updated !")
                        });
                }
                // }
            } else {
                this.$notify(this.v$.$error)
            }
        },

        changePassword() {
        this.v$.password.$validate();
        console.log(this.v$.password.$error)
        if (!this.v$.password.$error) {
            this.axios.post("http://localhost:8000/api/user/changePassword", this.password)
                .then(() => {
                    console.log("inside .then block")
                    window.location.reload();
                    this.$notify("Your password has been successfully changed!")
                })
                .catch((err) => {
                     console.log("inside .catch block");
                    this.errors = err.response.data;
                    this.$notify("Check your current password !")

                });
        } else {
            this.$notify(this.v$.$error)

        }
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
