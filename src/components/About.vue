<template>
  <div id="about">
    <h1 class="text-center text-4xl mt-2 mb-2">{{ $t("AboutAskLingua") }}</h1>
    
    <div id="content">
      <p>{{ $t("CreatedBy") }}</p>
      <br><br>
      {{ $t("Feedback") }}: 
        <a class="underline"
      href="javascript:void(
        window.open(
          'https://form.jotform.com/213145745724355',
          'blank',
          'scrollbars=yes,
          toolbar=no,
          width=700,
          height=500'
        )
      )
    ">
      {{ $t("ContactUs") }}
    </a> 
    <br>
    <div id=stayinformed>
      <hr>
      <br />
      <h3>{{ $t("StayInformed") }}</h3>
      <p class=signup><a href="https://twitter.com/AskLingua" target="_blank">{{ $t("Twitter") }}</a> {{ $t("or" )}}
      <a href="https://asklingua.us20.list-manage.com/subscribe?u=33a92fb170de7e1d490b68911&id=39ff1526de" target="_blank">{{ $t("Newsletter") }}.</a></p>
    </div>

    </div>
  </div>  

</template>

<style>
a {
  text-decoration: underline;
}

 #about {
    max-width: 800px;
    margin: 2vh auto;
    border-radius: 25px;
    color: #A52A2A;
    padding-bottom: 5vh;
  }

  .modal #content {
    text-align: left;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
});
</script>
