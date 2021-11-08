<template>
  <h1 class="text-center text-2xl mt-10 mb-2">
    Game Over!
  </h1>
  <h2 class="text-xl" v-if="win">You win!</h2>
  <h2 v-else class="text-xl">You lost &#x1F61E;</h2>
  <button @click="playAgain()" class="swal2-confirm swal2-styled mt-10">Play again</button>
</template>

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
  created: void {
  },
	methods: {
      playAgain(): void {
        router.push('/');
      }
  }
});
</script>
