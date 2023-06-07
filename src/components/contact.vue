<template>
<div class="content">

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">

                <div class="row justify-content-center">
                    <div class="col-md-6">

                        <h3 class="heading mb-4">Contact Us!</h3>

                        <p><img src="../../public/contactBootst/images/undraw-contact.svg" alt="Image" class="img-fluid"></p>

                    </div>
                    <div class="col-md-6">

                        <form class="mb-5" method="post" id="contactForm" name="contactForm" @submit.prevent="sendMessage">
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" id="userName" placeholder="Your Full name" required v-model="contact.userName">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <input type="email" class="form-control" name="email" id="email" placeholder="Email" required v-model="contact.email">
                                    <span>{{ errors.email}}</span>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required v-model="contact.subject">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <textarea class="form-control" name="message" id="message" cols="30" rows="7" placeholder="Write your message" required v-model="contact.message"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 ">
                                    <input type="submit" value="Send Message" class="btn btn-primary rounded-0 py-2 px-4">
                                </div>
                            </div>
                        </form>

                        <div id="form-message-warning mt-4"></div>
                        <div id="form-message-success">
                            Your message was sent, thank you!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            contact: {
                userName: '',
                email: '',
                subject: '',
                message: ''
            },
            errors:{}
        }
    },

    methods: {
        sendMessage() {
            this.axios
                .post("http://localhost:8000/api/contact", this.contact)
                .then((response) => {
                    console.log(response.data);
                    this.$notify("message sended")
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }

}
</script>

<style scoped>

</style>
