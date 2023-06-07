<template>
<div>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../public/frontend/images/slide-01.jpg" class="d-block w-100" alt="desktop" />
            </div>
            <div class="carousel-item">
                <img src="../../public/frontend/images/slide-02.jpg" class="d-block w-100" alt="laptop" />
            </div>
            <div class="carousel-item">
                <img src="../../public/frontend/images/slide-03.jpg" class="d-block w-100" alt="smartphone" />
            </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>
  






</template>

  
<style>
.carousel {

    
}

.carousel-item {
    height: 500px;
}

.carousel-item img {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
