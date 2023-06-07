<template>
<div>
    <Header />
</div>

<body class="animsition" style="animation-duration: 1500ms; opacity: 1;">

    <div>
        <carousel />
    </div>

    <div>
        <CategProd />
    </div>

    <div>
        <contact />
    </div>

</body>
<Footer />
</template>

<script>
import Footer from "@/components/Footer.vue"
import Header from "@/components/Header.vue"
import contact from "@/components/contact.vue"
/*
import {
    VueperSlides,
    VueperSlide
} from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
*/
import carousel from "@/components/carousel.vue"
import products from "@/components/client/products.vue"
import CategProd from "@/components/CategProd.vue"

export default {
    name: 'Master',
    components: {
        Footer,
        Header,
        carousel,
        CategProd,
        contact,
        //  VueperSlides,
        //VueperSlide
    },

}
</script>

<style>
 
 </style>
