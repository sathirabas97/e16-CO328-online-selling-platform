<template>
  <div class="main">
    <!-- Main logo -->
    <div class="text-content logo">
      <img src="/static/img/logos/inimal_logo.jpeg" alt="">
    </div>

    <!-- Who we are -->
    <div class="text-content">
      <h2>Who we are</h2>
      <img src="/static/img/icons/osso.png" alt="" class="img1">
      <p>iNimal is one of the largest sales networks for products and services
        Specially geared towards pet care.</p>
      <img src="/static/img/icons/osso.png" alt="" class="img2">
    </div>

    <!-- Our products -->
    <div class="text-content">
      <h2>Check out our products</h2>
      <img src="/static/img/icons/osso.png" alt="" class="img1">
      <p>Here at iNimal you can find various items for your pet,
        such as collars, feed, toys, among others. we count
        with a range of feed varieties, for any type of animal,
        of the best brands.</p>
      <img src="/static/img/icons/osso.png" alt="" class="img2">
    </div>

    <!-- Our services -->
    <div class="text-content">
      <h2>Check out our services</h2>
      <img src="/static/img/icons/osso.png" alt="" class="img1">
      <p>We are always concerned about your pet's well being, that's why we have
        a wide range of services that we can offer for your pet. Also
        We care about his well-being, that's why we offer you services
        bath and grooming.</p>
      <img src="/static/img/icons/osso.png" alt="" class="img2">
    </div>

    <!-- Social medias -->
    <div class="text-content">
      <h2>Our social networks</h2>
      <img src="/static/img/icons/osso.png" alt="" class="img1">

      <!-- Logos -->
      <div class="logos">
        <!-- FACEBOOK -->
        <a href="https://www.facebook.com" target="blank">
          <img src="/static/img/logos/fb_logo.png" alt="">
        </a>

        <!-- WHATS APP -->
        <a href="https://www.whatsapp.com/" target="blank">
          <img src="/static/img/logos/wpp_logo.png" alt="">
        </a>

        <!-- INSTAGRAN -->
        <a href="https://www.instagram.com/" target="blank">
          <img src="/static/img/logos/insta_logo.png" alt="">
        </a>

        <!-- MESSAGER -->
        <a href="https://www.messenger.com" target="blank">
          <img src="/static/img/logos/msg_logo.png" alt="">
        </a>
      </div>
      <img src="/static/img/icons/osso.png" alt="" class="img2">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
}
</script>

<style scoped>
  #main {
    text-align: center;
    display: grid;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .text-content {
    text-align: center;
    background-color: rgb(255, 255, 255);
    margin: 40px;
    /* width: 600px; */
    padding: 30px;
    border: 1px solid rgb(0, 0, 255);
    box-shadow: 0px 0px 5px black;
    border-radius: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
  }

  .text-content h2 {
    margin-bottom: 30px;
  }

  .text-content p {
    padding-left:30%;
    padding-right:30%;
  }

  .text-content img {
    width: 100px;
    height: 100px;
  }

  .img1 {
    float: left;
    position: relative;
    top: -80px;
  }

  .img2 {
    float: right;
    position: relative;
    top: -80px;
  }

  .logos {
    position: relative;
    left: -60px;
  }

  .logos  img{
    height: 50px;
    width: 50px;
  }

  .logo img {
    height: 200px;
    width: 300px
  }
</style>
