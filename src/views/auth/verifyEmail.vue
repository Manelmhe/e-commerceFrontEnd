<template>
<div class="container">
    <!-- Instructions -->
    <div class="row">
        <div class="alert alert-success col-md-12" role="alert" id="notes">
            <h4>NOTES</h4>
            <ul>
                <li>You will recieve a verification code on your mail after you registered. Enter that code below.</li>
                <li>If somehow, you did not recieve the verification email then <a href="#">resend the verification email</a></li>
            </ul>
        </div>
    </div>
    <!-- Verification Entry Jumbotron -->
    <div class="row">
        <div class="col-md-12">
            <div class="jumbotron text-center">
                <h2>Enter the verification code</h2>
                <form  @submit.prevent="verify" >
                    <div class="col-md-9 col-sm-12">
                        <div class="form-group form-group-lg">
                            <input type="text" class="form-control col-md-6 col-sm-6 col-sm-offset-2" 
                            placeholder="Enter the code received"
                            name="verificationCode" id="verificationCode" 
                            required v-model="user.verificationCode">
                            <button class="btn btn-primary " type="submit"   >Verify</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                verificationCode: ''
            },
            errors: {},
        };
    },
    methods: {
        verify() {
          //  console.log(this.verificationCode);
            this.axios.post("http://localhost:8000/api/user/verifyEmail", this.user)
            .then((res) => {
         // console.log(res.data);
          window.location.href = "http://localhost:8080/login";
          this.$notify("email verified !")
        })
        .catch((err) => {
          this.errors = err.response.data;
          console.log(this.errors);
          this.$notify("check your email !")

        });
        },
    },
};
</script>

<style>
.jumbotron.text-center {
    height: 17em;
}

input.form-control.col-md-6 {
    width: 50%;
    margin-right: 1em;
    display: inline;
}

div#notes {
    margin-top: 2%;
    width: 98%;
    margin-left: 1%;
}

@media (min-width: 991px) {
    .col-md-9.col-sm-12 {
        margin-left: 12%;
    }
}
</style>
