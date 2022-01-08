<template>
  <div id="objectselection">
    <h3 class="text-lg">Your character</h3>
    <div id="selectionflex" class="flex">
      <div id="your-selection" :class="displayAskButton ? 'your-selection-continue' : 'your-selection-centered'">
        <img v-bind:src="yourSelection" />
      </div>
        <div v-show="displayAskButton">
          <div v-if="matchingObjectsCount > 1" id="ask" class="my-2">
            <button @click="computerGuess()" class="m-0 text-sm swal2-confirm swal2-styled">
              Continue
            </button>
          </div>
          <div v-else>
            Click the remaining character in order to win!
          </div>  
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

  #your-selection img {
      max-width: 200px;
  }

}

@media (orientation: portrait) {
  #objectselection {
    align-items: center;
  }

  #ask {
    display: flex;
    align-items: center;
  }

  .your-selection-centered {
    width: 100%;
  }

  .your-selection-centered img {
    height: 10vh;
    margin: auto;
  }

  .your-selection-continue {
      width: 50%;
  }

  .your-selection-continue img {
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
    matchingObjectsCount: Number,
  },
  data() {
    return {
      confirmButtonDisabled: false,
      spanish: localStorage.getItem('learn-language') === 'es_es',
      remainingObjectsCount: 24
    };
  },
  methods: {
    computerGuess(): void {
      if (this.confirmButtonDisabled) return;

      this.confirmButtonDisabled = true;
      this.$emit("messageFromChild");
    },
  },
});
</script>