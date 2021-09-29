<template>
  <div class="w-6/12">
    <h3 class="text-lg">Your character</h3>
    <div id="your-selection" class="w-50 mx-auto">
      <img v-bind:src="yourSelection" />
    </div>
    <div id="ask" class="my-2" v-show="displayAskButton">
      <button @click="guess()" class="swal2-confirm swal2-styled">
        Continue
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SelectedCharacter",
  props: {
    yourSelection: String,
    displayAskButton: Boolean,
  },
   methods: {
    guess(): void {
        this.$emit('messageFromChild');
    }
   }
});
</script>