<template>
<header>

    <div class="container-menu-desktop" style="background-color: #eee;">
        <!-- Topbar -->
        <div class="topbar">
            <div class="content-topbar flex-sb-m h-full container">
                <!-- topbar-->
                <!--    <div class="left-top-bar">
                    Free shopping
                </div>

                <div class="right-top-bar flex-w h-full">

                    <a href="#" class="flex-c-m trans-04 p-lr-25">
                        Help
                    </a>
                </div>-->

                <!-- Menu desktop -->
                <div>
                    <ul class="main-menu">
                        <li>
                            <a href="/">
                                <img src="../assets/logo3.png" class="h-8" alt="img">
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <button class="button2">Home</button>
                            </a>
                        </li>
                        <li v-if="this.currentUserRole==='provider'">
                            <a href="/AllProductsP">
                                <button class=" button2">Products</button>
                            </a>
                        </li>
                        <li v-if="this.currentUserRole==='provider'">
                            <a href="/AllCateg">
                                <button class="button2">Categoris</button>
                            </a>
                        </li>
                        <li v-if="this.currentUserRole==='customer'">
                            <a href="/AllProducts">
                                <button class=" button2">Products</button>
                            </a>
                        </li>

                        <li v-if="this.currentUserRole==='customer'">
                           <a href="/panier">
                            <button class="icon-header-item cl2  icon-header-noti js-show-cart button2" :data-notify='this.number' >
                                <i class="zmdi zmdi-shopping-cart"></i>
                            </button>
                           </a>
                        </li>
                    </ul>
                </div>

                <!-- Icon header -->
                <div class="wrap-icon-header flex-w flex-r-m h-full">
                    <div class="flex-c-m h-full p-r-25 bor6" v-if="!currentUser">
                        <button class="button2" v-on:click="window1"> Login </button>
                    </div>

                    <div class="flex-c-m h-full p-lr-19" v-if="!currentUser">
                        <button class="button2" v-on:click="window2">Sign Up </button>

                    </div>

                    <div class="flex-c-m h-full p-r-25 bor6" v-if="currentUser">
                        <a href="/profile">
                            <button class="button2">Profile </button>
                        </a>
                    </div>

                    <div class="flex-c-m h-full p-r-25 bor6" v-if="currentUser">
                        <a>
                            <button class="button2" v-on:click="logout">Logout </button>
                        </a>
                    </div>

                </div>

            </div>
        </div>

    </div>

    <!-- Modal Search -->
    <div class="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <button class="flex-c-m btn-hide-modal-search trans-04">
            <i class="zmdi zmdi-close"></i>
        </button>

        <form class="container-search-header">
            <div class="wrap-search-header">
                <input class="plh0" type="text" name="search" placeholder="Search...">

                <button class="flex-c-m trans-04">
                    <i class="zmdi zmdi-search"></i>
                </button>
            </div>
        </form>
    </div>
</header>
</template>

<script>
import {
    mapGetters,
} from "vuex"
export default {
    data() {
        return {
            role: null,
            currentUserRole: null,
            number: null
        }
    },
    computed: {
        currentUser() {
            return JSON.parse(localStorage.getItem("user"));
        },
        ...mapGetters(["get_sub_number"]),
    },
    created() {
        this.currentUserRole = JSON.parse(localStorage.getItem("role"));
        //console.log(this.currentUserRole)
        this.showNumber();

    },
    methods: {

        showNumber() {
            this.number = this.get_sub_number; // Access the number value
        },
        window1() {
            window.location.href = "http://localhost:8080/login";
        },
        window2() {
            window.location.href = "http://localhost:8080/registre";
        },
        logout() {
            this.axios
                .post("http://localhost:8000/api/user/logout", this.user)
                .then(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    localStorage.clear();
                    window.location.href = "/";
                    $this.notify("You are loged out !");

                })
                .catch((err) => {
                        if (err.response && err.response.data) {
                            this.errors = err.response.data;
                            console.log(this.errors);
                        }
                    }

                )
        }
    }
}
</script>

<style>
.topborder {
    position: absolute;
    top: 25px;
    right: 30px;
    background-attachment: fixed;
    background-color: bisque;
}

.inlineList {
    display: flex;
    flex-direction: row;
    /* Below sets up your display method: flex-start|flex-end|space-between|space-around */
    justify-content: flex-start;
    /* Below removes bullets and cleans white-space */
    list-style: none;
    padding: 0;
    /* Bonus: forces no word-wrap */
    white-space: nowrap;
}

ul {
    display: grid;
    gap: 50px;
}

.button1 {
    font-size: 50px;
    border: 2px solid #e7e7e7;
    color: black;
    ;
}

.button2:hover {
    font-size: 15px;
    border: 2px solid #e7e7e7;
    border-radius: 8px;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    color: #050404;

}

.h-8 {
    height: 4rem !important;
    background: transparent;
    display: block;
    width: 150%;

}

.logo {
    padding-right: 2%;
}
</style>
