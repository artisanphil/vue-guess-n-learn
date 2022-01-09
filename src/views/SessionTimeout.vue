<template>
  <div>
    <h1 class="text-center text-4xl mt-10 mb-2">
      Sorry, you were inactive too long. The session timed out. 
    </h1>
    <button @click="playAgain()" class="swal2-confirm swal2-styled mt-10">Play again</button>
  </div>
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
	name: "SessionTimeout",
	methods: {
      playAgain(): void {
        router.push('/');
      }
  }
});
</script>
