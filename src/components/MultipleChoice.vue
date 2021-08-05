<template>
<div class="flex flex-wrap w-full">
        <div class="w-full flex justify-center">{{ attribute }}</div>
        <div
          class="px-8 py-6 w-full border"
          :key="index"
          v-for="(question, index) in questions"
        >
          <a @click="select(question.attribute)">{{ question.sentence }}</a>
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "MultipleChoice",
  props: {
    questions: Array,
    attribute: String
  },
  methods: {
    select(index: number): void {
      //this.$emit('messageFromChild', this.attributes, index);
    }
  }
})
</script>
