<template>
<div>
    <Header/>
</div>

  <div class="container">
    <!-- Instructions -->
    <div class="row">
        <div class="alert alert-success col-md-12" role="alert" id="notes">
            <h4>NOTES</h4>
            <ul>
                <li> Forget your password ? No Problem.</li>
            </ul>
        </div>
    </div>
    <!-- Verification Entry Jumbotron -->
    <div class="row">
        <div class="col-md-12">
            <div class="jumbotron text-center">
                <h2> Enter your address email</h2>
                <form  @submit.prevent="sendEmail" >
                    <div class="col-md-9 col-sm-12">
                        <div class="form-group form-group-lg">
                            <input type="email" class="form-control col-md-6 col-sm-6 col-sm-offset-2" 
                            placeholder="Enter your email "
                            name="email" id="email" 
                            required  v-model="user.email">
                            <button class="btn btn-primary " type="submit"  >Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div>
    <Footer/>
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
    data(){
       return{
        user:{
            email:''
        }
       }
    },
    methods : {
        sendEmail(){
            this.axios
                .post("http://localhost:8000/api/user/forgetPassword", this.user)
                .then(() => {
                    //console.log(response.data);
                    this.$notify("email has been sended");
                    window.location.href = "/resetPassword";

                })
                .catch((err) => {
                    console.log(err);
                    this.$notify("no account for this email");

                });

        }
        }

    }


</script>

<style>

</style>