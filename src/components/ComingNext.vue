<template>
  <div id="comingnext">
    <h1 class="text-center text-4xl mt-2 mb-2">{{ $t("StayInformed") }}</h1>
    
    <div id="content" style="text-align: center;">    
      <br>  
      <p class=signup><a href="https://twitter.com/AskLingua" target="_blank">{{ $t("Twitter") }}</a> {{ $t("or" )}}
      <a href="https://asklingua.us20.list-manage.com/subscribe?u=33a92fb170de7e1d490b68911&id=39ff1526de" target="_blank">{{ $t("Newsletter") }}.</a></p>

    </div>
  </div>
</template>

<style>
 #about img {
   border-color: #EEEEEE;
   border-width: 1px;
   border-style: solid;
 }

 #comingnext {
    max-width: 800px;
    margin: 2vh auto;
    border-radius: 25px;
    color: #A52A2A;
    padding-bottom: 1vh;
    max-height: 300px;
  }

  .modal #content {
    text-align: left;
    line-height: 1.2rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "ComingNext",
});
</script>
