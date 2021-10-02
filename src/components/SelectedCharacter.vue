<template>
  <div id="objectselection">
    <h3 class="text-lg">Your character</h3>
    <div id="selectionflex" class="flex">
      <div id="your-selection">
        <img v-bind:src="yourSelection" />
      </div>
      <div id="ask" class="my-2" v-show="displayAskButton">
        <button @click="guess()" class="m-0 text-sm swal2-confirm swal2-styled">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@media (orientation: landscape) {
  #selectionflex {
    flex-direction: column;
    align-items: center;
  }
}

@media (orientation: portrait) {
  #objectselection {
    height: 15vh;
    align-items: center;
  }

  #your-selection {
      width: 50%;
  }

  #your-selection img {
    height: 10vh;
    margin-right: 5vw;
    float: right;
  }
}
</style>

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
      this.$emit("messageFromChild");
    },
  },
});
</script>