<template>
  <div id=gameover>
    <h1 class="text-center text-4xl mt-10 mb-2">
      Game Over!
    </h1>
    <h2 class="text-2xl" v-if="win === 'true'">&#127881; You win! &#129395;</h2>
    <h2 v-else class="text-2xl">You lost &#x1F61E;</h2>
    <button @click="playAgain()" class="swal2-confirm swal2-styled mt-10">Play again</button>
  </div>
</template>

<style>
  #gameover {
    max-width: 800px;
    margin: 2vh auto;
    background-color: rgb(230, 255, 255, 0.2);
    border-radius: 25px;
    border: 2px solid #000099;
    color: #000099;
    padding: 1vh;
    padding-bottom: 5vh;
  }

</style>

<script lang="ts">
import { defineComponent } from "vue";
import router from '../router';

export default defineComponent({
  data() {
      return {
        win: this.$route.params.win,
      }
  },
	name: "GameOver",
	methods: {
      playAgain(): void {
        router.push('/');
      }
  }
});
</script>
