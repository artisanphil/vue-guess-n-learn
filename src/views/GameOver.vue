<template>
  <h1 class="text-center text-xl my-10">
    Game Over!
  </h1>
  <button @click="playAgain()" class="swal2-confirm swal2-styled">Play again</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from '../router';


export default defineComponent({
	name: "GameOver",
	methods: {
      playAgain(): void {
        router.push('/');
      }
  }
});
</script>
