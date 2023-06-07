<template>
<div>
    <Header />
</div>
<div class="container">
    <!-- Instructions 
      <div class="row">
          <div class="alert alert-success col-md-12" role="alert" id="notes">
              <h4>NOTES</h4>
              <ul>
                  <li> Forget your password ? No Problem.</li>
              </ul>
          </div>
      </div> -->
    <!-- Verification Entry Jumbotron -->
    <div class="row">
        <div class="col-md-12 ">
            <div class=" text-center " style="background-color: #eee;">
                <h2> Reset Password </h2>
                <form @submit.prevent="Reset">
                    <div class="col-md-9 col-sm-12">
                        <div class="form-group form-group-lg">
                            <input type="password" class="form-control col-md-6 col-sm-6 col-sm-offset-2" placeholder="Enter the coce " name="code" id="code"  v-model="v$.user.code.$model">
                            <div class="error-message " v-for="(error, index) of v$.user.code.$errors" :key="index">
                                {{ error.$message }}</div>
                        </div>
                        <div class="form-group form-group-lg">
                            <input type="password" class="form-control col-md-6 col-sm-6 col-sm-offset-2" placeholder="Enter your new password " name="newPassword" id="newPassword"  v-model="v$.user.newPassword.$model">
                            <div class="error-message " v-for="(error, index) of v$.user.newPassword.$errors" :key="index">
                                {{ error.$message }}</div>
                        </div>
                        <div class="form-group form-group-lg">
                            <input type="password" class="form-control col-md-6 col-sm-6 col-sm-offset-2" placeholder="Repeat your password " name="confirPassword" id="confirPassword"  v-model="v$.user.confirPassword.$model">
                            <div class="error-message " v-for="(error, index) of v$.user.confirPassword.$errors" :key="index">
                                {{ error.$message }}</div>
                        </div>
                        <button class="btn btn-primary " type="submit">Send</button>

                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
<div>
    <Footer />
</div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import {
    required,
    minLength,
    sameAs
} from '@vuelidate/validators';
import {
    useVuelidate
} from '@vuelidate/core';
export default {
    name: 'resetPassword',
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
                code: '',
                newPassword: '',
                confirPassword: ''
            },
            errors: {}
        }
    },
    validations() {

        return {
            user: {
                code: {
                    required
                },
                newPassword: {
                    required,
                    minLength: minLength(6)
                },
                confirPassword: {
                    required,
                    sameAsPassword: sameAs(this.user.newPassword)
                },
            },
        };
    },
    methods: {
        Reset() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.axios
                    .post("http://localhost:8000/api/user/resetPassword", this.user)
                    .then(() => {
                        //console.log(response.data);
                        this.$notify("password has been changed")
                        window.location.href = "/login";
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$notify("failed,  please verify your entered  code")

                    });

            }  else {
            this.$notify(this.v$.$error)

        }
        }

    }
}
</script>

<style>
.error-message {
    color: red;
}
</style>
