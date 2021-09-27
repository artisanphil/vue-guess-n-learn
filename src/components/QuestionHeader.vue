<template>
  <div class="w-full justify-center my-1">
    <img class="attributeImage inline" v-bind:src="image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "QuestionHeader",
    props: {
    image: String
  },

})
</script>